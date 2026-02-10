import { motion } from 'motion/react';
import { Coffee, Headphones, Palette, Rocket } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const interests = [
  {
    icon: Coffee,
    title: 'Coffee Enthusiast',
    description: 'Fuel for late-night coding sessions',
  },
  {
    icon: Headphones,
    title: 'Music Lover',
    description: 'Lo-fi beats while debugging',
  },
  {
    icon: Palette,
    title: 'Design Aficionado',
    description: 'Pixel-perfect interfaces',
  },
  {
    icon: Rocket,
    title: 'Tech Explorer',
    description: 'Always learning new tools',
  },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 text-slate-900">
            About Me
          </h2>
          <p className="text-slate-600 text-lg">
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
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzA0NzY4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
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
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                Hi there! I'm a passionate full-stack developer with <span className="text-slate-900">5+ years</span> of experience 
                building scalable web applications and mobile solutions. I thrive on turning complex problems 
                into elegant, user-friendly solutions.
              </p>
              <p>
                My journey in tech started with a curiosity about how things work under the hood. Today, 
                I specialize in modern web technologies like <span className="text-blue-600">React</span>, <span className="text-blue-600">TypeScript</span>, and <span className="text-blue-600">Node.js</span>, 
                creating experiences that users love and businesses depend on.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the latest tech trends, contributing to 
                open-source projects, or mentoring aspiring developers. I believe in continuous learning 
                and sharing knowledge with the community.
              </p>
            </div>

            {/* Interests */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {interests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <motion.div
                    key={interest.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-blue-600 mb-2" />
                    <h4 className="text-slate-900 mb-1">{interest.title}</h4>
                    <p className="text-sm text-slate-600">{interest.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '50+', label: 'Projects Completed' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}