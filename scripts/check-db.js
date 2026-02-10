// Simple script to check if migration worked
require('dotenv').config({ path: '.env.local' });

const path = require('path');
const projectRoot = __dirname;

// We'll use a simpler approach - just check the database directly
const { neon } = require('@neondatabase/serverless');

async function checkDatabase() {
    const sql = neon(process.env.DATABASE_URL);

    console.log('🔍 Checking database for migrated users...\n');

    try {
        const users = await sql`SELECT username, email, public_repos, followers FROM users ORDER BY username`;

        console.log(`✅ Found ${users.length} users in database:\n`);

        for (const user of users) {
            console.log(`  👤 ${user.username}`);
            console.log(`     📧 Email: ${user.email || 'N/A'}`);
            console.log(`     📦 Repos: ${user.public_repos || 0}`);
            console.log(`     👥 Followers: ${user.followers || 0}\n`);
        }

        const projects = await sql`SELECT COUNT(*) as count FROM projects`;
        const contributions = await sql`SELECT COUNT(*) as count FROM github_contributions`;

        console.log(`\n📊 Database Summary:`);
        console.log(`  👥 Users: ${users.length}`);
        console.log(`  📦 Projects: ${projects[0].count}`);
        console.log(`  📈 Contribution Records: ${contributions[0].count}`);

    } catch (error) {
        console.error('❌ Error checking database:', error.message);
    }
}

checkDatabase();
