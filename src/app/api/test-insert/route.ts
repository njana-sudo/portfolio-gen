import { NextResponse } from 'next/server';
import { db } from '@/db';
import { resumeData } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';

export async function GET() {
    try {
        const testData = {
            id: createId(),
            userId: 'test-user-id-' + Date.now(),
            resumeText: 'test resume',
            professionalSummary: null,
            aboutMe: 'test about me',
            skills: [],
            experience: [],
            education: [],
            certifications: [],
            interests: [],
            contactInfo: null,
        };

        console.log('[TEST] Inserting with data:', JSON.stringify(testData, null, 2));

        const [result] = await db
            .insert(resumeData)
            .values(testData)
            .returning();

        return NextResponse.json({
            success: true,
            message: 'Test insert successful',
            data: result
        });
    } catch (error) {
        console.error('[TEST] Error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}
