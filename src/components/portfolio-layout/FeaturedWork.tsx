"use client";
import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
    title: string;
    description: string;
    image?: string;
    tags: string[];
    links: {
        demo?: string;
        repo?: string;
    };
    featured?: boolean;
}

interface FeaturedWorkProps {
    projects: Project[];
    username: string; // for image placeholder generation
}

export function FeaturedWork({ projects, username }: FeaturedWorkProps) {
    // Don't render if no projects
    if (!projects || projects.length === 0) return null;

    const displayProjects = projects;

    return (
        <section id="work" className="relative px-6 py-24 bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl mb-4 text-neutral-900 font-bold dark:text-white">
                        Featured Work
                    </h2>
                    <p className="text-neutral-600 text-lg dark:text-neutral-400">
                        Showcasing recent projects that solve real-world problems
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {displayProjects.map((project, index) => {
                        // Generate a placeholder image if none provided
                        const imageUrl = project.image || `https://placehold.co/1200x800/EEE/31343C?text=${encodeURIComponent(project.title)}&font=montserrat`;

                        return (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700 ${project.featured ? 'md:h-[500px]' : 'md:h-[400px]'
                                    }`}
                            >
                                {/* Background image */}
                                <div className="absolute inset-0">
                                    <ImageWithFallback
                                        src={imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/60" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                                    {project.featured && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full w-fit mb-4 text-sm font-medium">
                                            Featured Project
                                        </div>
                                    )}

                                    <h3 className="text-3xl md:text-4xl text-neutral-900 mb-3 font-bold dark:text-white">
                                        {project.title}
                                    </h3>

                                    <p className="text-neutral-600 text-lg mb-6 max-w-2xl line-clamp-3 dark:text-neutral-300">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-2 bg-neutral-100/80 backdrop-blur-sm text-neutral-700 rounded-full border border-neutral-200 hover:border-neutral-300 transition-colors duration-300 text-sm font-medium dark:bg-neutral-700/80 dark:text-neutral-300 dark:border-neutral-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        {project.links.demo && (
                                            <a
                                                href={project.links.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium"
                                            >
                                                <span>View Project</span>
                                                <ArrowRight className="w-4 h-4 group-hover:tranneutral-x-1 transition-transform duration-300" />
                                            </a>
                                        )}
                                        {project.links.repo && (
                                            <a
                                                href={project.links.repo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-neutral-900 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all duration-300 font-medium dark:bg-neutral-800/80 dark:text-white dark:border-neutral-700"
                                            >
                                                <Github className="w-4 h-4" />
                                                <span>View Code</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
