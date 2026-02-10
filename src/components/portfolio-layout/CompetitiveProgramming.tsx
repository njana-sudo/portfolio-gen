"use client";
import { motion } from 'motion/react';
import { Trophy, Target, TrendingUp, Award } from 'lucide-react';

interface CompetitiveProgrammingProps {
    leetCodeStats?: {
        totalSolved: number;
        easySolved: number;
        mediumSolved: number;
        hardSolved: number;
        ranking: number;
        contestRating?: number;
    } | null;
    codeforcesStats?: {
        rating: number;
        maxRating: number;
        rank: string;
    } | null;
}

export function CompetitiveProgramming({ leetCodeStats, codeforcesStats }: CompetitiveProgrammingProps) {
    if (!leetCodeStats && !codeforcesStats) return null;

    const stats = [];

    if (leetCodeStats) {
        stats.push({
            icon: Target,
            label: 'LeetCode Solved',
            value: leetCodeStats.totalSolved.toString(),
            change: 'Total Problems',
            gradient: 'from-blue-500 to-cyan-500',
        });
        if (leetCodeStats.ranking) {
            stats.push({
                icon: Trophy,
                label: 'LeetCode Rank',
                value: `#${leetCodeStats.ranking.toLocaleString()}`,
                change: 'Global Ranking',
                gradient: 'from-yellow-500 to-orange-500',
            });
        }
    }

    if (codeforcesStats) {
        stats.push({
            icon: TrendingUp,
            label: 'Codeforces Rating',
            value: codeforcesStats.rating.toString(),
            change: `Max: ${codeforcesStats.maxRating}`,
            gradient: 'from-green-500 to-emerald-500',
        });
        stats.push({
            icon: Award,
            label: 'Codeforces Rank',
            value: codeforcesStats.rank,
            change: 'Current Rank',
            gradient: 'from-purple-500 to-pink-500',
        });
    }

    return (
        <section className="relative px-6 py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl mb-4 text-slate-900 font-bold">
                        Competitive Programming
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Sharpening problem-solving skills through algorithmic challenges
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative group"
                            >
                                {/* Content */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 h-full">
                                    <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                                        <Icon className="w-7 h-7 text-blue-600" />
                                    </div>

                                    <div className="mb-2">
                                        <div className="text-3xl text-slate-900 mb-1 font-bold">{stat.value}</div>
                                        <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                                    </div>

                                    {/* Using change field for extra info since we don't have month-over-month data */}
                                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                                        <span>{stat.change}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
