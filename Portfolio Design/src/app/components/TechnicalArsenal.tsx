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

const skills = [
  {
    category: 'Frontend',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-500',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
  },
  {
    category: 'Backend',
    icon: Server,
    gradient: 'from-purple-500 to-pink-500',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL'],
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    gradient: 'from-green-500 to-emerald-500',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo'],
  },
  {
    category: 'DevOps',
    icon: Cloud,
    gradient: 'from-orange-500 to-red-500',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
  },
  {
    category: 'Database',
    icon: Database,
    gradient: 'from-yellow-500 to-amber-500',
    skills: ['PostgreSQL', 'Redis', 'MongoDB', 'MySQL', 'Supabase'],
  },
  {
    category: 'Design',
    icon: Palette,
    gradient: 'from-pink-500 to-rose-500',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems', 'Adobe XD'],
  },
  {
    category: 'Version Control',
    icon: GitBranch,
    gradient: 'from-indigo-500 to-blue-500',
    skills: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'Git Flow'],
  },
  {
    category: 'Architecture',
    icon: Layers,
    gradient: 'from-violet-500 to-purple-500',
    skills: ['Microservices', 'REST API', 'WebSockets', 'Event-Driven', 'Serverless'],
  },
];

export function TechnicalArsenal() {
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
          <h2 className="text-5xl mb-4 text-slate-900">
            Technical Arsenal
          </h2>
          <p className="text-slate-600 text-lg">
            A comprehensive toolkit for building modern applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-4">{skill.category}</h3>
                <div className="space-y-2">
                  {skill.skills.map((item) => (
                    <div
                      key={item}
                      className="text-slate-600 text-sm py-1"
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