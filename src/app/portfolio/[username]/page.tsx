import { getGitHubProfile, getGitHubRepos, getGitHubContributions } from "@/lib/github";
import { getLeetCodeStats, getCodeforcesStats } from "@/lib/coding-platforms";
import { generateProfessionalSummary } from "@/lib/gemini";
import { extractInterestsWithAI, enhanceBio } from "@/lib/groq";
import { getPortfolioData } from "@/lib/db-queries";
import fs from "fs/promises";
import path from "path";

// Import new portfolio components
import "../portfolio-theme.css";
import { Navigation } from "@/components/portfolio-layout/Navigation";
import { Hero } from "@/components/portfolio-layout/Hero";
import { About } from "@/components/portfolio-layout/About";
import { TechnicalArsenal } from "@/components/portfolio-layout/TechnicalArsenal";
import { Experience } from "@/components/portfolio-layout/Experience";
import { CompetitiveProgramming } from "@/components/portfolio-layout/CompetitiveProgramming";
import { ContributionActivity } from "@/components/portfolio-layout/ContributionActivity";
import { FeaturedWork } from "@/components/portfolio-layout/FeaturedWork";
import { Contact } from "@/components/portfolio-layout/Contact";
import { Footer } from "@/components/portfolio-layout/Footer";

// Helper to get resume data - tries database first, then falls back to JSON
async function getResumeData(username: string) {
    try {
        // Try database first
        console.log(`[Portfolio] Fetching data for ${username} from database...`);
        const dbData = await getPortfolioData(username);

        if (dbData && dbData.resumeData) {
            console.log(`[Portfolio] ✅ Found data in database for ${username}`);
            // Transform database format to match expected format
            return {
                username: dbData.user.username,
                leetCodeUser: dbData.codingStats?.leetcodeUsername || null,
                codeforcesUser: dbData.codingStats?.codeforcesUsername || null,
                resumeText: dbData.resumeData.resumeText || "",
                structuredData: {
                    professionalSummary: dbData.resumeData.professionalSummary || "",
                    skills: dbData.resumeData.skills || [],
                    experience: dbData.resumeData.experience || [],
                    education: dbData.resumeData.education || [],
                    certifications: dbData.resumeData.certifications || [],
                },
                aboutMe: dbData.resumeData.aboutMe || "",
                personalInfo: {
                    customAboutMe: dbData.resumeData.aboutMe || "",
                    contact: dbData.resumeData.contactInfo || "",
                },
            };
        }

        console.log(`[Portfolio] ⚠️  No data in database for ${username}, trying JSON fallback...`);
    } catch (error) {
        console.error(`[Portfolio] ❌ Database error for ${username}:`, error);
        console.log(`[Portfolio] Falling back to JSON file...`);
    }

    // Fallback to JSON file
    try {
        const dataDir = path.join(process.cwd(), "data");
        const filePath = path.join(dataDir, `${username}.json`);
        const fileContent = await fs.readFile(filePath, "utf-8");
        console.log(`[Portfolio] ✅ Found data in JSON file for ${username}`);
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`[Portfolio] ❌ JSON file not found for ${username}`);
        return null;
    }
}

export default async function PortfolioPage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    // 1. Fetch Data (Parallel for performance)
    const [profile, repos, resumeData] = await Promise.all([
        getGitHubProfile(username),
        getGitHubRepos(username),
        getResumeData(username)
    ]);

    // Fetch Coding Stats if usernames are available
    const leetCodeUser = resumeData?.leetCodeUser;
    const codeforcesUser = resumeData?.codeforcesUser;

    // Parallel fetch for speed
    const [leetCodeStats, codeforcesStats, contributionData] = await Promise.all([
        leetCodeUser ? getLeetCodeStats(leetCodeUser) : Promise.resolve(null),
        codeforcesUser ? getCodeforcesStats(codeforcesUser) : Promise.resolve(null),
        getGitHubContributions(username)
    ]);

    if (!profile) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
                <h1>User not found or API rate limited.</h1>
            </div>
        );
    }

    // 2. Data Processing & Mapping
    const topRepos = repos.slice(0, 4);

    // Extract top languages from GitHub
    const githubLanguages = Array.from(new Set(repos.map(r => r.language).filter(l => l !== "Unknown")));

    // Combine with resume skills if available
    const resumeSkills = resumeData?.structuredData?.skills || [];
    const allSkills = Array.from(new Set([...githubLanguages, ...resumeSkills]));

    const professionalSummary = resumeData?.structuredData?.professionalSummary
        ? resumeData.structuredData.professionalSummary
        : await generateProfessionalSummary(profile.bio, allSkills);

    const experience = resumeData?.structuredData?.experience || [];

    // Calculate Years of Experience (Naive)
    let experienceYears = "1";
    if (experience.length > 0) {
        // Try to parse dates. Format could be "Jan 2020 - Present" or "2020-2022"
        // We'll just take the number of items * 1.5 as a rough guess if we can't parse, or specific logic.
        // For now, let's look for the earliest year in the strings.
        const years = experience.map((e: any) => {
            const match = e.date?.match(/(\d{4})/);
            return match ? parseInt(match[1]) : new Date().getFullYear();
        });
        if (years.length > 0) {
            const minYear = Math.min(...years);
            const diff = new Date().getFullYear() - minYear;
            experienceYears = diff > 0 ? diff.toString() : "1";
        }
    }

    // Social Links
    const socialLinks = {
        github: profile.html_url,
        email: profile.email || undefined,
        // Try to find LinkedIn in resume contact info if available
        linkedin: resumeData?.personalInfo?.contact?.split('|').find((s: string) => s.toLowerCase().includes('linkedin'))?.trim() || undefined,
        twitter: profile.twitter_username ? `https://twitter.com/${profile.twitter_username}` : undefined
    };

    // Map Projects
    const projects = topRepos.map(repo => ({
        title: repo.name,
        description: repo.description || "No description available.",
        tags: [repo.language, ...repo.topics].filter(Boolean),
        links: {
            repo: repo.html_url,
            demo: repo.homepage || undefined
        },
        featured: repo.stargazers_count > 5 // Simple feature logic
    }));



    // --- Dynamic About Me Logic with AI-Powered Interest Extraction ---
    const rawAboutText = resumeData?.aboutMe || resumeData?.personalInfo?.customAboutMe || null;

    let dynamicInterests = undefined;
    let enhancedAboutText = rawAboutText;

    if (rawAboutText) {
        try {
            // Run AI tasks in parallel: Extract interests AND enhance bio text
            const [extractedInterests, refinedText] = await Promise.all([
                extractInterestsWithAI(rawAboutText),
                enhanceBio(rawAboutText)
            ]);

            if (extractedInterests && extractedInterests.length > 0) {
                dynamicInterests = extractedInterests;
            }

            if (refinedText) {
                enhancedAboutText = refinedText;
            }
        } catch (error) {
            console.error("Error with AI processing (interests/bio):", error);
            // Fallback: no interests, original text
        }
    }



    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <div id="home">
                <Hero
                    name={profile.name}
                    headline={profile.bio || `Building navigation for digital experiences.`}
                    summary={professionalSummary}
                    socialLinks={socialLinks}
                />
            </div>

            {/* Only render About if we have explicit about me text OR a summary from resume */}
            {(enhancedAboutText || professionalSummary) && (
                <About
                    summary={enhancedAboutText || professionalSummary}
                    experienceYears={experienceYears}
                    projectsCount={profile.public_repos}
                    avatarUrl={profile.avatar_url}
                    interests={dynamicInterests}
                />
            )}

            {/* Only show Technical Arsenal if we have skills */}
            {allSkills && allSkills.length > 0 && (
                <TechnicalArsenal skills={allSkills} />
            )}

            {experience.length > 0 && (
                <Experience
                    experiences={experience.map((exp: any) => ({
                        title: exp.role,
                        company: exp.company,
                        period: exp.date,
                        description: exp.description,
                        current: exp.date.toLowerCase().includes('present')
                        // location is not always in common resume data structure, but we can try
                    }))}
                />
            )}

            {/* Only show Competitive Programming if we have stats */}
            {(leetCodeStats || codeforcesStats) && (
                <CompetitiveProgramming
                    leetCodeStats={leetCodeStats}
                    codeforcesStats={codeforcesStats}
                />
            )}

            {contributionData && (
                <ContributionActivity weeks={contributionData} />
            )}

            {/* Only show Featured Work if we have projects */}
            {projects && projects.length > 0 && (
                <FeaturedWork
                    projects={projects}
                    username={username}
                />
            )}

            <Contact
                email={profile.email || "hello@example.com"}
                location={profile.location || undefined}
                socialLinks={socialLinks}
            />

            <Footer socialLinks={socialLinks} />
        </div>
    );
}
