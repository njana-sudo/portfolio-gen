import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export const dynamic = 'force-dynamic';

export async function GET() {
    const results = {
        test: "Debug API",
        dbStatus: "Checking...",
        pdfStatus: "Checking...",
        envStatus: {
            DATABASE_URL: !!process.env.DATABASE_URL,
            GITHUB_TOKEN: !!process.env.GITHUB_TOKEN,
            NEXT_PUBLIC_GEMINI_API_KEY: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY,
            GROQ_API_KEY: !!process.env.GROQ_API_KEY,
        },
        errors: [] as string[],
    };

    try {
        // 1. Check DB Read
        if (!process.env.DATABASE_URL) {
            results.errors.push("DATABASE_URL is missing");
        } else {
            const userList = await db.select().from(users).limit(1);
            results.dbStatus = `Read OK (${userList.length} users).`;

            // 1b. Check DB Write
            try {
                const testUser = {
                    username: 'debug_test_user',
                    email: 'debug@test.com',
                };

                await db.insert(users).values(testUser)
                    .onConflictDoUpdate({
                        target: users.username,
                        set: { updatedAt: new Date() }
                    });

                results.dbStatus += " Write OK.";
            } catch (writeErr: any) {
                console.error("DB Write Error:", writeErr);
                results.dbStatus += " Write FAILED.";
                results.errors.push(`DB Write Error: ${writeErr.message}`);
            }
        }
    } catch (e: any) {
        results.dbStatus = "Error";
        results.errors.push(`DB Error: ${e.message}`);
    }

    try {
        // 2. Check PDF Library
        const PDFParser = require("pdf2json");
        const parser = new PDFParser();
        results.pdfStatus = "Loaded successfully";
    } catch (e: any) {
        results.pdfStatus = "Error";
        results.errors.push(`PDF Library Error: ${e.message}`);
    }

    return NextResponse.json(results);
}
