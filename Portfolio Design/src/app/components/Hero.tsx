import { motion } from 'motion/react';
import { Code2, Github, Linkedin, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-slate-600">Available for opportunities</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl mb-6 text-slate-900"
        >
          Building{' '}
          <span className="text-blue-600">
            digital experiences
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Full-stack developer crafting elegant solutions to complex problems.
          Passionate about clean code, scalable architecture, and exceptional user experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Get in touch
          </a>
          <a
            href="#work"
            className="px-8 py-4 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300"
          >
            View my work
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: Github, href: '#github', label: 'GitHub' },
            { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
            { icon: Mail, href: '#email', label: 'Email' },
            { icon: Code2, href: '#portfolio', label: 'Portfolio' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-sm transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}