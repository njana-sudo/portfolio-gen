"use client";
import { motion } from 'motion/react';
import {
    Code2,
    Database,
    Palette,
    Server,
    Smartphone,
    Cloud,
    GitBranch,
    Layers,
} from 'lucide-react';

interface TechnicalArsenalProps {
    skills: string[];
}

const CATEGORY_DEFINITIONS = {
    Frontend: ['react', 'vue', 'angular', 'html', 'css', 'tailwind', 'next.js', 'typescript', 'javascript', 'redux', 'bootstrap', 'sass', 'jquery'],
    Backend: ['node', 'express', 'python', 'django', 'flask', 'java', 'spring', 'go', 'golang', 'ruby', 'rails', 'php', 'c#', '.net'],
    Database: ['sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'mongo', 'redis', 'firebase', 'supabase', 'oracle', 'sqlite'],
    DevOps: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'ci/cd', 'linux', 'bash', 'terraform', 'nginx'],
    Mobile: ['react native', 'flutter', 'ios', 'android', 'swift', 'kotlin', 'dart', 'expo'],
    Design: ['figma', 'adobe', 'photoshop', 'illustrator', 'ui/ux', 'sketch', 'invision'],
    Tools: ['git', 'github', 'gitlab', 'vscode', 'jira', 'confluence', 'trello', 'postman'],
};

const CATEGORY_META = {
    Frontend: { icon: Code2, gradient: 'from-blue-500 to-cyan-500' },
    Backend: { icon: Server, gradient: 'from-purple-500 to-pink-500' },
    Database: { icon: Database, gradient: 'from-yellow-500 to-amber-500' },
    DevOps: { icon: Cloud, gradient: 'from-orange-500 to-red-500' },
    Mobile: { icon: Smartphone, gradient: 'from-green-500 to-emerald-500' },
    Design: { icon: Palette, gradient: 'from-pink-500 to-rose-500' },
    Tools: { icon: GitBranch, gradient: 'from-indigo-500 to-blue-500' },
    Other: { icon: Layers, gradient: 'from-violet-500 to-purple-500' },
};

export function TechnicalArsenal({ skills }: TechnicalArsenalProps) {
    // Don't render if no skills
    if (!skills || skills.length === 0) return null;

    // Categorize skills
    const categorizedSkills: Record<string, string[]> = {};
    const usedSkills = new Set<string>();

    // Normalize skills for matching
    const normalizedSkills = skills.map(s => ({ original: s, lower: s.toLowerCase() }));

    Object.entries(CATEGORY_DEFINITIONS).forEach(([category, keywords]) => {
        normalizedSkills.forEach(({ original, lower }) => {
            if (keywords.some(k => lower.includes(k)) && !usedSkills.has(original)) {
                if (!categorizedSkills[category]) categorizedSkills[category] = [];
                categorizedSkills[category].push(original);
                usedSkills.add(original);
            }
        });
    });

    // Add remaining skills to "Other"
    const remaining = normalizedSkills.filter(s => !usedSkills.has(s.original));
    if (remaining.length > 0) {
        categorizedSkills['Other'] = remaining.map(s => s.original);
    }

    const categoriesToDisplay = Object.entries(categorizedSkills).map(([category, items]) => ({
        category,
        skills: items,
        ...CATEGORY_META[category as keyof typeof CATEGORY_META] || CATEGORY_META.Other
    }));

    return (
        <section id="skills" className="relative px-6 py-24 bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl mb-4 text-neutral-900 font-bold dark:text-white">
                        Technical Arsenal
                    </h2>
                    <p className="text-neutral-600 text-lg dark:text-neutral-400">
                        A comprehensive toolkit for building modern applications
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoriesToDisplay.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group dark:bg-neutral-800 dark:border-neutral-700"
                            >
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300 dark:bg-blue-900/30 dark:group-hover:bg-blue-800/50">
                                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl text-neutral-900 mb-4 font-bold dark:text-white">{skill.category}</h3>
                                <div className="space-y-2">
                                    {skill.skills.map((item) => (
                                        <div
                                            key={item}
                                            className="text-neutral-600 text-sm py-1 font-medium dark:text-neutral-400"
                                        >
                                            • {item}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
