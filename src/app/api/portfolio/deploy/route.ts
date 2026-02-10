import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, resumeData } = body;

        if (!username || !resumeData) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const dataDir = path.join(process.cwd(), "data");
        await fs.mkdir(dataDir, { recursive: true });

        const filePath = path.join(dataDir, `${username}.json`);

        // Read existing data to preserve fields like 'resumeText' that might not be in the passed object
        let finalData = resumeData;
        try {
            const existingFile = await fs.readFile(filePath, "utf-8");
            const existingData = JSON.parse(existingFile);
            finalData = { ...existingData, ...resumeData };
        } catch (e) {
            // No existing file, just use what passed
        }

        await fs.writeFile(filePath, JSON.stringify(finalData, null, 2));

        return NextResponse.json({ success: true, username });
    } catch (error) {
        console.error("Deploy error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
