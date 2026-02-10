"use client";
import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
    id?: string;
    title: string; // role
    company: string;
    location?: string;
    period: string; // date
    current?: boolean;
    description: string | string[];
    achievements?: string[]; // mapped from description if array
    technologies?: string[];
}

interface ExperienceProps {
    experiences: ExperienceItem[];
}

export function Experience({ experiences }: ExperienceProps) {
    // If no experiences, don't render section? Or render empty state?
    // We'll render, assuming the parent handles hiding if empty.

    return (
        <section id="experience" className="relative px-6 py-24 bg-white dark:bg-neutral-900">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl mb-4 text-neutral-900 font-bold dark:text-white">
                        Work Experience
                    </h2>
                    <p className="text-neutral-600 text-lg dark:text-neutral-400">
                        My professional journey in software development
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => {
                            // Handle description being string or array
                            const descriptionText = Array.isArray(exp.description) ? exp.description[0] : exp.description;
                            const achievements = exp.achievements || (Array.isArray(exp.description) ? exp.description.slice(1) : []);

                            return (
                                <motion.div
                                    key={`${exp.company}-${index}`}
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="relative pl-20"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-blue-600 ring-4 ring-white border-2 border-neutral-200 dark:ring-neutral-900 dark:border-neutral-700" />

                                    {/* Current indicator */}
                                    {exp.current && (
                                        <motion.div
                                            className="absolute left-5 top-1 w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30"
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.5, 0.2, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    )}

                                    {/* Content */}
                                    <div className="bg-white border border-neutral-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
                                        {/* Header */}
                                        <div className="mb-6">
                                            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                                                <div>
                                                    <h3 className="text-2xl text-neutral-900 mb-2 font-bold dark:text-white">
                                                        {exp.title}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2 text-neutral-600 dark:text-neutral-400">
                                                        <Briefcase className="w-4 h-4" />
                                                        <span className="text-lg font-medium">{exp.company}</span>
                                                        {exp.location && (
                                                            <>
                                                                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                                                                <span>{exp.location}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                {exp.current && (
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full whitespace-nowrap font-medium dark:bg-green-900/30 dark:text-green-400">
                                                        Current
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 text-neutral-500 mb-4 dark:text-neutral-400">
                                                <Calendar className="w-4 h-4" />
                                                <span>{exp.period}</span>
                                            </div>

                                            <p className="text-neutral-600 leading-relaxed dark:text-neutral-300">{descriptionText}</p>
                                        </div>

                                        {/* Achievements */}
                                        {achievements.length > 0 && (
                                            <div className="mb-6">
                                                <h4 className="text-neutral-900 mb-3 font-medium dark:text-white">Key Achievements:</h4>
                                                <ul className="space-y-2">
                                                    {achievements.map((achievement, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-neutral-600 dark:text-neutral-300">
                                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5 flex-shrink-0" />
                                                            <span>{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Technologies */}
                                        {exp.technologies && exp.technologies.length > 0 && (
                                            <div>
                                                <h4 className="text-neutral-900 mb-3 font-medium dark:text-white">Technologies Used:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.technologies.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-3 py-1 bg-neutral-50 text-neutral-700 text-sm rounded-full border border-neutral-200 hover:border-neutral-300 transition-colors duration-300 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-600"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
