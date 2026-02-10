export interface LeetCodeStats {
    totalSolved: number;
    ranking: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    contestRating?: number;
    contestGlobalRanking?: number;
    totalContest?: number;
}

export async function getLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
    try {
        // Primary API
        const fetchPrimary = async () => {
            console.log(`[LeetCode] Fetching from primary API for: ${username}`);
            const [profileRes, contestRes] = await Promise.all([
                fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
                    signal: AbortSignal.timeout(5000),
                    next: { revalidate: 3600 }
                }),
                fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, {
                    signal: AbortSignal.timeout(5000),
                    next: { revalidate: 3600 }
                })
            ]);

            if (!profileRes.ok) throw new Error("Primary API Profile Failed");
            const profileData = await profileRes.json();
            const contestData = contestRes.ok ? await contestRes.json() : {};

            return {
                totalSolved: profileData.solvedProblem || 0,
                ranking: contestData.contestGlobalRanking || 0,
                easySolved: profileData.easySolved || 0,
                mediumSolved: profileData.mediumSolved || 0,
                hardSolved: profileData.hardSolved || 0,
                contestRating: contestData.contestRating || 0,
                contestGlobalRanking: contestData.contestGlobalRanking || 0,
                totalContest: contestData.totalContest || 0
            };
        };

        // Fallback API
        const fetchFallback = async () => {
            console.log(`[LeetCode] Attempting fallback API for: ${username}`);
            const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
                signal: AbortSignal.timeout(5000),
                next: { revalidate: 3600 }
            });
            if (!res.ok) throw new Error("Fallback API Failed");
            const data = await res.json();
            if (data.status === "error") throw new Error("Fallback API Error: " + data.message);

            return {
                totalSolved: data.totalSolved || 0,
                ranking: data.ranking || 0,
                easySolved: data.easySolved || 0,
                mediumSolved: data.mediumSolved || 0,
                hardSolved: data.hardSolved || 0,
                contestRating: 0,
                contestGlobalRanking: data.ranking || 0,
                totalContest: 0
            };
        };

        // Try primary first, then fallback
        try {
            return await fetchPrimary();
        } catch (primaryError) {
            console.warn(`[LeetCode] Primary API failed for ${username}:`, primaryError);
            try {
                return await fetchFallback();
            } catch (fallbackError) {
                console.error(`[LeetCode] Both APIs failed for ${username}:`, fallbackError);
                return null; // Return null instead of throwing
            }
        }

    } catch (error) {
        console.error(`[LeetCode] CRITICAL ERROR for ${username}:`, error);
        return null; // Gracefully handle any unexpected errors
    }
}

export interface CodeforcesStats {
    rating: number;
    rank: string;
    maxRating: number;
    maxRank: string;
}

export async function getCodeforcesStats(username: string): Promise<CodeforcesStats | null> {
    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`, {
            signal: AbortSignal.timeout(5000),
            next: { revalidate: 3600 }
        });
        if (!response.ok) return null;

        const data = await response.json();
        if (data.status !== 'OK' || !data.result || data.result.length === 0) {
            return null;
        }

        const user = data.result[0];
        return {
            rating: user.rating || 0,
            rank: user.rank || 'unrated',
            maxRating: user.maxRating || 0,
            maxRank: user.maxRank || 'unrated',
        };
    } catch (error) {
        console.error(`[Codeforces] Error fetching stats for ${username}:`, error);
        return null;
    }
}
