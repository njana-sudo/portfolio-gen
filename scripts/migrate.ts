import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../src/db/schema';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in .env.local');
    process.exit(1);
}

// Create database connection
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

interface JsonData {
    username: string;
    leetCodeUser?: string | null;
    codeforcesUser?: string | null;
    resumeText?: string;
    structuredData?: {
        professionalSummary?: string;
        skills?: string[];
        experience?: Array<{
            role: string;
            company: string;
            date: string;
            description: string;
            location?: string;
        }>;
        education?: Array<{
            degree: string;
            institution: string;
            date: string;
            description?: string;
        }>;
        certifications?: string[];
    };
    aboutMe?: string;
    customAboutMe?: string;
    personalInfo?: {
        contact?: string;
        customAboutMe?: string;
    };
    lastUpdated?: string;
}

async function migrateData() {
    console.log('🚀 Starting data migration from JSON files to Neon database...\n');

    const dataDir = path.join(process.cwd(), 'data');
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'gemini-cache.json');

    console.log(`📁 Found ${files.length} JSON files to migrate\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        console.log(`📄 Processing: ${file}`);

        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const data: JsonData = JSON.parse(fileContent);

            // Skip if no meaningful data
            if (!data.username) {
                console.log(`   ⚠️  Skipped: No username found\n`);
                continue;
            }

            // 1. Insert or update user
            const [user] = await db
                .insert(schema.users)
                .values({
                    username: data.username,
                    // We'll fetch GitHub data separately or update later
                })
                .onConflictDoUpdate({
                    target: schema.users.username,
                    set: {
                        updatedAt: new Date(),
                    },
                })
                .returning();

            console.log(`   ✅ User created/updated: ${user.username}`);

            // 2. Insert resume data if available
            if (data.structuredData || data.resumeText || data.aboutMe) {
                await db
                    .insert(schema.resumeData)
                    .values({
                        userId: user.id,
                        resumeText: data.resumeText || '',
                        professionalSummary: data.structuredData?.professionalSummary || '',
                        skills: data.structuredData?.skills || [],
                        experience: data.structuredData?.experience || [],
                        education: data.structuredData?.education || [],
                        certifications: data.structuredData?.certifications || [],
                        aboutMe: data.aboutMe || data.personalInfo?.customAboutMe || '',
                    })
                    .onConflictDoNothing();

                console.log(`   ✅ Resume data inserted`);
            }

            // 3. Insert coding stats if available
            if (data.leetCodeUser || data.codeforcesUser) {
                await db
                    .insert(schema.codingStats)
                    .values({
                        userId: user.id,
                        leetcodeUsername: data.leetCodeUser || null,
                        codeforcesUsername: data.codeforcesUser || null,
                    })
                    .onConflictDoNothing();

                console.log(`   ✅ Coding stats inserted`);
            }

            successCount++;
            console.log(`   ✨ Successfully migrated ${file}\n`);
        } catch (error) {
            errorCount++;
            console.error(`   ❌ Error migrating ${file}:`, error);
            console.log('');
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 Migration Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    console.log(`   📁 Total files: ${files.length}`);
    console.log('='.repeat(50) + '\n');

    if (successCount > 0) {
        console.log('🎉 Migration completed successfully!');
        console.log('💡 Next steps:');
        console.log('   1. Verify data in Drizzle Studio: npm run db:studio');
        console.log('   2. Update your application to fetch from database');
    }

    process.exit(errorCount > 0 ? 1 : 0);
}

// Run migration
migrateData().catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
});
