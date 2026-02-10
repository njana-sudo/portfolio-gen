import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: 'Analytics Dashboard',
    description: 'Real-time analytics platform with interactive visualizations and AI-powered insights',
    image: 'https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzA0NzQwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    gradient: 'from-blue-500 to-cyan-500',
    featured: true,
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure and intuitive mobile banking experience with biometric authentication',
    image: 'https://images.unsplash.com/photo-1760597371674-c5a412f2ae01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzA1NzI2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React Native', 'Firebase', 'Stripe', 'Redux'],
    gradient: 'from-purple-500 to-pink-500',
    featured: true,
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-featured e-commerce solution with AI recommendations and seamless checkout',
    image: 'https://images.unsplash.com/photo-1687524690542-2659f268cde8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MDQ5Mzk3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'AWS'],
    gradient: 'from-orange-500 to-red-500',
    featured: false,
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative px-6 py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 text-slate-900">
            Featured Work
          </h2>
          <p className="text-slate-600 text-lg">
            Showcasing recent projects that solve real-world problems
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
                project.featured ? 'md:h-[500px]' : 'md:h-[400px]'
              }`}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/60" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                {project.featured && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full w-fit mb-4 text-sm">
                    Featured Project
                  </div>
                )}

                <h3 className="text-3xl md:text-4xl text-slate-900 mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-600 text-lg mb-6 max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full border border-slate-200 hover:border-slate-300 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}