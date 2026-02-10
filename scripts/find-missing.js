require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function findMissingUser() {
    const sql = neon(process.env.DATABASE_URL);

    // Get all usernames from JSON files
    const dataDir = path.join(__dirname, '../data');
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'gemini-cache.json');

    const jsonUsernames = [];
    for (const file of files) {
        const content = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));
        if (content.username) {
            jsonUsernames.push(content.username);
        }
    }

    // Get all usernames from database
    const dbUsers = await sql`SELECT username FROM users ORDER BY username`;
    const dbUsernames = dbUsers.map(u => u.username);

    console.log('📁 JSON Files:', files.length);
    console.log('👤 JSON Usernames:', jsonUsernames.length);
    console.log('💾 Database Users:', dbUsernames.length);
    console.log('\n🔍 Checking for missing users...\n');

    const missing = jsonUsernames.filter(u => !dbUsernames.includes(u));

    if (missing.length > 0) {
        console.log('❌ Missing from database:');
        missing.forEach(u => console.log(`  - ${u}`));
    } else {
        console.log('✅ All users migrated successfully!');
    }

    console.log('\n📋 All JSON usernames:');
    jsonUsernames.sort().forEach(u => {
        const inDb = dbUsernames.includes(u);
        console.log(`  ${inDb ? '✅' : '❌'} ${u}`);
    });
}

findMissingUser().catch(console.error);
