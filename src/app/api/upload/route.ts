import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseResume } from "@/lib/resume";
import { upsertUser, upsertResumeData, upsertCodingStats } from "@/lib/db-queries";

export async function POST(req: NextRequest) {
    try {
        console.log("[UPLOAD] Starting upload process");
        const formData = await req.formData();
        const file = formData.get("resume") as File;
        const username = formData.get("username") as string;
        const leetCodeUser = formData.get("leetCodeUser") as string;
        const codeforcesUser = formData.get("codeforcesUser") as string;
        const aboutMe = formData.get("aboutMe") as string;

        console.log("[UPLOAD] Username:", username);
        console.log("[UPLOAD] File:", file ? `${file.name} (${file.size} bytes)` : "No file");

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        // 1. Parsing the PDF (Fast)
        let resumeText = "";
        if (file) {
            try {
                const buffer = Buffer.from(await file.arrayBuffer());
                resumeText = await parseResume(buffer);
                console.log("[UPLOAD] Resume parsed, text length:", resumeText.length);
            } catch (parseError) {
                console.error("[UPLOAD] PDF Parse Error:", parseError);
                resumeText = "PDF Parsing Failed.";
            }
        }

        // 2. Database Operations

        // Debug: Check if DB URL is available (don't log the full secret)
        if (!process.env.DATABASE_URL) {
            console.error("[UPLOAD] DATABASE_URL is missing in environment variables");
            return NextResponse.json({
                error: "Configuration Error",
                details: "Database connection string is missing"
            }, { status: 500 });
        }

        let user;
        try {
            console.log(`[UPLOAD] Attempting to upsert user: ${username}`);
            // Ensure user exists
            user = await upsertUser({
                username,
            });
            console.log(`[UPLOAD] User upserted successfully. User ID: ${user?.id}`);
        } catch (dbError) {
            console.error("[UPLOAD] Database Error (User Upsert):", dbError);
            return NextResponse.json({
                error: "Database Error",
                details: dbError instanceof Error ? dbError.message : "Failed to create/update user"
            }, { status: 500 });
        }

        if (!user) {
            console.error("[UPLOAD] User upsert returned null/undefined");
            return NextResponse.json({ error: "Database Error: Failed to create user record" }, { status: 500 });
        }

        try {
            // Update Resume Data
            console.log("[UPLOAD] Updating resume data...");
            await upsertResumeData(user.id, {
                resumeText,
                professionalSummary: undefined,
                aboutMe: aboutMe || undefined,
                skills: [], // Explicitly provide to avoid DB default
                experience: [], // Explicitly provide to avoid DB default
                education: [], // Explicitly provide to avoid DB default
                certifications: [], // Explicitly provide to avoid DB default
                interests: [], // Explicitly provide to avoid DB default
                contactInfo: undefined,
            });
            console.log("[UPLOAD] Resume data saved");

            // Update Coding Stats
            if (leetCodeUser || codeforcesUser) {
                console.log("[UPLOAD] Updating coding stats...");
                await upsertCodingStats(user.id, {
                    leetcodeUsername: leetCodeUser || null,
                    codeforcesUsername: codeforcesUser || null,
                });
                console.log("[UPLOAD] Coding stats saved");
            }
        } catch (dbError) {
            console.error("[UPLOAD] Database Error (Secondary Data):", dbError);
            // Verify if we should fail here or just log. For now, let's fail to catch issues.
            return NextResponse.json({
                error: "Database Error",
                details: "Failed to save profile details: " + (dbError instanceof Error ? dbError.message : String(dbError))
            }, { status: 500 });
        }

        console.log(`[UPLOAD] Database transaction complete for ${username}`);

        revalidatePath(`/portfolio/${username}`);
        revalidatePath("/");

        return NextResponse.json({ success: true, username });
    } catch (error) {
        console.error("[UPLOAD] Error processing request:", error);
        console.error("[UPLOAD] Error stack:", error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
