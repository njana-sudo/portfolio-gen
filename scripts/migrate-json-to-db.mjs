import { db } from '../src/db/index';
import { upsertUser, upsertProjects, upsertGithubContributions } from '../src/lib/db-queries';
import { getGitHubProfile, getGitHubRepos, getGitHubContributions } from '../src/lib/github';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateUser(username, aboutMe) {
    console.log(`\n📦 Migrating user: ${username}`);

    try {
        // Fetch GitHub profile
        console.log(`  ⬇️  Fetching GitHub profile...`);
        const profile = await getGitHubProfile(username);

        if (!profile) {
            console.log(`  ❌ Failed to fetch profile for ${username}`);
            return false;
        }

        // Insert/Update user
        console.log(`  💾 Saving user to database...`);
        const user = await upsertUser({
            username: profile.username,
            email: profile.email || undefined,
            githubUrl: profile.html_url,
            avatarUrl: profile.avatar_url,
            bio: aboutMe || profile.bio || undefined,
            location: profile.location || undefined,
            company: profile.company || undefined,
            twitterUsername: profile.twitter_username || undefined,
            websiteUrl: profile.blog || undefined,
            publicRepos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
        });

        console.log(`  ✅ User saved with ID: ${user.id}`);

        // Fetch and save repositories
        console.log(`  ⬇️  Fetching repositories...`);
        const repos = await getGitHubRepos(username);

        if (repos.length > 0) {
            console.log(`  💾 Saving ${repos.length} repositories...`);
            await upsertProjects(
                user.id,
                repos.map(repo => ({
                    name: repo.name,
                    description: repo.description || undefined,
                    htmlUrl: repo.html_url,
                    homepageUrl: repo.homepage || undefined,
                    language: repo.language,
                    topics: repo.topics,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                }))
            );
            console.log(`  ✅ Repositories saved`);
        } else {
            console.log(`  ⚠️  No repositories found`);
        }

        // Fetch and save contributions
        console.log(`  ⬇️  Fetching contribution data...`);
        const contributions = await getGitHubContributions(username);

        if (contributions) {
            // Calculate total contributions and streaks
            let totalContributions = 0;
            let currentStreak = 0;
            let longestStreak = 0;
            let tempStreak = 0;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Flatten all days and sort by date descending
            const allDays = contributions.flatMap(week => week.days).sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            for (const day of allDays) {
                totalContributions += day.count;

                if (day.count > 0) {
                    tempStreak++;
                    longestStreak = Math.max(longestStreak, tempStreak);
                } else {
                    tempStreak = 0;
                }
            }

            // Calculate current streak (from today backwards)
            for (const day of allDays) {
                const dayDate = new Date(day.date);
                dayDate.setHours(0, 0, 0, 0);

                if (day.count > 0) {
                    currentStreak++;
                } else if (dayDate < today) {
                    break;
                }
            }

            console.log(`  💾 Saving contribution data...`);
            await upsertGithubContributions(user.id, {
                contributionData: contributions,
                totalContributions,
                currentStreak,
                longestStreak,
            });
            console.log(`  ✅ Contributions saved (Total: ${totalContributions}, Current Streak: ${currentStreak})`);
        } else {
            console.log(`  ⚠️  No contribution data available`);
        }

        console.log(`  ✨ Migration completed for ${username}`);
        return true;

    } catch (error) {
        console.error(`  ❌ Error migrating ${username}:`, error.message);
        return false;
    }
}

async function main() {
    console.log('🚀 Starting JSON to Database Migration\n');
    console.log('='.repeat(50));

    const dataDir = path.join(__dirname, '../data');
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'gemini-cache.json');

    console.log(`\n📁 Found ${files.length} JSON files to process\n`);

    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        try {
            const data = JSON.parse(content);

            if (data.username) {
                const success = await migrateUser(data.username, data.aboutMe);
                if (success) {
                    successCount++;
                } else {
                    failCount++;
                }

                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                console.log(`⚠️  Skipping ${file}: No username found`);
            }
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error.message);
            failCount++;
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('\n📊 Migration Summary:');
    console.log(`  ✅ Successful: ${successCount}`);
    console.log(`  ❌ Failed: ${failCount}`);
    console.log(`  📝 Total: ${files.length}`);
    console.log('\n✨ Migration complete!\n');
}

main().catch(console.error);
