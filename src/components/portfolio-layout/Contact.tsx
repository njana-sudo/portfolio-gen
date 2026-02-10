"use client";
import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';

interface ContactProps {
    email: string;
    phone?: string;
    location?: string;
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

export function Contact({ email, phone, location, socialLinks }: ContactProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Form submitted:', formData);
        setIsSubmitting(false);

        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
        // In a real app, we would send this data to an API or use mailto
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section id="contact" className="relative px-6 py-24 bg-white dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl mb-4 text-neutral-900 font-bold dark:text-white">
                        Get In Touch
                    </h2>
                    <p className="text-neutral-600 text-lg dark:text-neutral-400">
                        Have a project in mind? Let's create something amazing together
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-3xl text-neutral-900 mb-6 font-bold dark:text-white">Let's talk about your project</h3>
                            <p className="text-neutral-600 text-lg leading-relaxed dark:text-neutral-400">
                                I'm always interested in hearing about new projects and opportunities.
                                Whether you have a question or just want to say hi, feel free to reach out!
                            </p>
                        </div>

                        {/* Contact details */}
                        <div className="space-y-4">
                            {[
                                {
                                    icon: Mail,
                                    label: 'Email',
                                    value: email,
                                    href: `mailto:${email}`,
                                    show: !!email,
                                },
                                {
                                    icon: Phone,
                                    label: 'Phone',
                                    value: phone,
                                    href: `tel:${phone}`,
                                    show: !!phone,
                                },
                                {
                                    icon: MapPin,
                                    label: 'Location',
                                    value: location,
                                    href: '#',
                                    show: !!location,
                                },
                            ].filter(item => item.show).map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-200 rounded-xl hover:shadow-sm transition-all duration-300 group dark:bg-neutral-800 dark:border-neutral-700"
                                    >
                                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300 dark:bg-blue-900/30 dark:group-hover:bg-blue-800/50">
                                            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-neutral-500 text-sm font-medium dark:text-neutral-400">{item.label}</div>
                                            <div className="text-neutral-900 font-medium dark:text-white">{item.value}</div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Social links */}
                        <div>
                            <h4 className="text-neutral-900 mb-4 font-bold dark:text-white">Follow me on</h4>
                            <div className="flex gap-4">
                                {socialLinks.github && (
                                    <a
                                        href={socialLinks.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-sm transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-400 dark:hover:border-blue-400"
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
                                        className="w-12 h-12 flex items-center justify-center bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-sm transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-400 dark:hover:border-blue-400"
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
                                        className="w-12 h-12 flex items-center justify-center bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-sm transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-400 dark:hover:border-blue-400"
                                        aria-label="Twitter"
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                )}
                                {socialLinks.email && (
                                    <a
                                        href={`mailto:${socialLinks.email}`}
                                        className="w-12 h-12 flex items-center justify-center bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-sm transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-400 dark:hover:border-blue-400"
                                        aria-label="Email"
                                    >
                                        <Mail className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-neutral-900 mb-2 font-medium dark:text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500"
                                    placeholder="Your name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-neutral-900 mb-2 font-medium dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-neutral-900 mb-2 font-medium dark:text-white">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500"
                                    placeholder="How can I help?"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-neutral-900 mb-2 font-medium dark:text-white">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all duration-300 resize-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
