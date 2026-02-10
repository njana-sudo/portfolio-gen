"use client";
import { motion } from 'motion/react';
import { Coffee, Headphones, Palette, Rocket, Code, Laptop, Heart, Star, Book, Camera, Dumbbell, Plane, Gamepad2, Film, Music, LucideIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Interest {
    icon: string; // Icon name as string
    title: string;
    description: string;
}

interface AboutProps {
    summary: string;
    experienceYears: number | string;
    projectsCount: number | string;
    avatarUrl?: string;
    interests?: Interest[];
}

const defaultInterests = [
    {
        icon: 'Coffee',
        title: 'Coffee Enthusiast',
        description: 'Fuel for late-night coding sessions',
    },
    {
        icon: 'Headphones',
        title: 'Music Lover',
        description: 'Lo-fi beats while debugging',
    },
    {
        icon: 'Palette',
        title: 'Design Aficionado',
        description: 'Pixel-perfect interfaces',
    },
    {
        icon: 'Rocket',
        title: 'Tech Explorer',
        description: 'Always learning new tools',
    },
];

export function About({ summary, experienceYears, projectsCount, avatarUrl, interests = defaultInterests }: AboutProps) {
    // Validate if summary is meaningful enough to display
    const isMeaningfulContent = (text: string): boolean => {
        if (!text || text.trim().length < 20) return false; // Minimum 20 characters

        // Filter out common test/placeholder phrases
        const testPhrases = ['test', 'hello', 'hi', 'sample', 'placeholder', 'lorem ipsum'];
        const lowerText = text.toLowerCase().trim();

        // If the text is ONLY test phrases (very short), don't show
        if (lowerText.length < 50 && testPhrases.some(phrase => lowerText === phrase || lowerText.startsWith(phrase + ' ') || lowerText.endsWith(' ' + phrase))) {
            return false;
        }

        return true;
    };

    // Don't render if no summary or if summary is not meaningful
    if (!summary || !isMeaningfulContent(summary)) return null;

    // Use a default avatar if none provided, or the one from the design as fallback
    const finalAvatarUrl = avatarUrl || "https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzA0NzY4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080";


    // Icon mapping for AI-generated icon names
    const iconMap: Record<string, LucideIcon> = {
        Coffee,
        Headphones,
        Palette,
        Rocket,
        Code,
        Laptop,
        Heart,
        Star,
        Book,
        Camera,
        Dumbbell,
        Plane,
        Gamepad2,
        Film,
        Music
    };

    // Map icon names to actual icon components
    const displayInterests = interests.map(i => ({
        ...i,
        icon: iconMap[i.icon] || Star // Map string name to component, fallback to Star
    }));

    return (
        <section id="about" className="relative px-6 py-24 bg-white border-t border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl mb-4 text-neutral-900 font-bold dark:text-white">
                        About Me
                    </h2>
                    <p className="text-neutral-600 text-lg dark:text-neutral-400">
                        The person behind the code
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 shadow-lg aspect-[3/4] max-h-[600px] w-full dark:border-neutral-800">
                            <ImageWithFallback
                                src={finalAvatarUrl}
                                alt="Developer portrait"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Format the summary text into proper paragraphs */}
                        <div className="space-y-4 text-neutral-600 text-lg leading-relaxed dark:text-neutral-300">
                            {summary.split('\n').filter(line => line.trim()).map((paragraph, index) => (
                                <p key={index}>
                                    {paragraph.trim()}
                                </p>
                            ))}
                        </div>

                        {/* Interests - only show if we have custom interests */}
                        {interests && interests.length > 0 && interests !== defaultInterests && (
                            <div className="grid grid-cols-2 gap-4 pt-6">
                                {displayInterests.map((interest, index) => {
                                    const Icon = interest.icon;
                                    return (
                                        <motion.div
                                            key={interest.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 hover:shadow-sm transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700"
                                        >
                                            <Icon className="w-6 h-6 text-blue-600 mb-2 dark:text-blue-400" />
                                            <h4 className="text-neutral-900 mb-1 font-medium dark:text-white">{interest.title}</h4>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{interest.description}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}


                        {/* Stats - only show if we have real data */}
                        {(() => {
                            const validStats = [
                                { value: `${experienceYears}+`, label: 'Years Experience', show: experienceYears && experienceYears !== '0' && experienceYears !== '1' },
                                { value: `${projectsCount}+`, label: 'Projects Completed', show: projectsCount && Number(projectsCount) > 0 },
                            ].filter(stat => stat.show);

                            // Only show stats section if we have at least one valid stat
                            if (validStats.length === 0) return null;

                            return (
                                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
                                    {validStats.map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                            className="text-center"
                                        >
                                            <div className="text-3xl text-neutral-900 mb-1 font-bold dark:text-white">{stat.value}</div>
                                            <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            );
                        })()}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
