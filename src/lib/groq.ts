import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export interface Interest {
    icon: string;
    title: string;
    description: string;
}

export async function extractInterestsWithAI(aboutMeText: string): Promise<Interest[]> {
    if (!aboutMeText || aboutMeText.trim().length < 20) {
        return [];
    }

    const prompt = `Extract up to 4 personal interests or hobbies from the following "About Me" text. 
Return ONLY a valid JSON array with this exact structure, no markdown formatting:
[
  {
    "icon": "icon_name",
    "title": "Interest Title",
    "description": "Short 2-4 word description"
  }
]

Available icon names (use EXACTLY these): Coffee, Headphones, Palette, Rocket, Code, Laptop, Heart, Star, Book, Camera, Dumbbell, Plane, Gamepad2, Film, Music

About Me Text:
"${aboutMeText}"

Rules:
- Extract real interests mentioned in the text
- Use appropriate icons from the list
- Keep descriptions very short (2-4 words)
- Return empty array [] if no clear interests found
- Maximum 4 interests
- Return ONLY the JSON array, no other text`;

    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 500,
        });

        const responseText = completion.choices[0]?.message?.content?.trim() || "[]";

        // Clean up any potential markdown formatting
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        const interests = JSON.parse(cleanedText) as Interest[];

        // Validate and limit to 4 interests
        return interests.slice(0, 4);
    } catch (error) {
        console.error("Error extracting interests with Groq:", error);
        return []; // Return empty array on error
    }
}

export async function enhanceBio(aboutMeText: string): Promise<string> {
    if (!aboutMeText || aboutMeText.trim().length < 10) {
        return aboutMeText;
    }

    const prompt = `Rewrite the following "About Me" text for a professional developer portfolio.
    
    Goals:
    - Fix grammar and spelling
    - Structure disjointed sentences into cohesive paragraphs
    - Make it sound professional yet authentic
    - Keep the original meaning and facts (do not invent new facts)
    - Use "I" statements
    - Limit to 2-3 short paragraphs
    
    Original Text:
    "${aboutMeText}"
    
    Return ONLY the rewritten text, no other comments.`;

    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 500,
        });

        return completion.choices[0]?.message?.content?.trim() || aboutMeText;
    } catch (error) {
        console.error("Error enhancing bio with Groq:", error);
        return aboutMeText; // Return original text on error
    }
}
