"use client";
import { motion } from 'motion/react';
import { Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface FooterProps {
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

export function Footer({ socialLinks }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative px-6 py-12 border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="text-2xl text-slate-900 mb-4 font-bold">
                            &lt;/Dev&gt;
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Building exceptional digital experiences with clean code and creative solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-slate-900 mb-4 font-bold">Quick Links</h3>
                        <ul className="space-y-2">
                            {['About', 'Skills', 'Experience', 'Work', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-slate-600 hover:text-slate-900 transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-slate-900 mb-4 font-bold">Connect</h3>
                        <div className="flex gap-4">
                            {socialLinks.github && (
                                <a
                                    href={socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks.linkedin && (
                                <a
                                    href={socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a
                                    href={socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks.email && (
                                <a
                                    href={`mailto:${socialLinks.email}`}
                                    className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
                                    aria-label="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 text-sm">
                    <div className="flex items-center gap-2">
                        <span>© {currentYear} Developer Portfolio. Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                        <span>and lots of coffee</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-900 transition-colors duration-300">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-slate-900 transition-colors duration-300">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
