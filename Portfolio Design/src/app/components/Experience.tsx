import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    current: true,
    description: 'Leading development of cloud-native applications and mentoring junior developers.',
    achievements: [
      'Architected and deployed microservices handling 10M+ daily requests',
      'Reduced application load time by 60% through performance optimization',
      'Led team of 5 developers in building customer-facing dashboard',
      'Implemented CI/CD pipeline reducing deployment time by 75%',
    ],
    technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes'],
  },
  {
    title: 'Full-Stack Developer',
    company: 'Digital Solutions LLC',
    location: 'Austin, TX',
    period: '2020 - 2022',
    current: false,
    description: 'Developed scalable web applications and mobile solutions for enterprise clients.',
    achievements: [
      'Built responsive e-commerce platform serving 500K+ monthly users',
      'Integrated payment gateways processing $2M+ in transactions',
      'Developed RESTful APIs consumed by web and mobile applications',
      'Collaborated with UX team to improve user engagement by 40%',
    ],
    technologies: ['Vue.js', 'Python', 'MongoDB', 'Firebase', 'React Native'],
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Studios',
    location: 'Remote',
    period: '2019 - 2020',
    current: false,
    description: 'Contributed to various client projects and learned modern web development practices.',
    achievements: [
      'Developed features for SaaS applications used by 10K+ users',
      'Maintained and improved legacy codebases',
      'Participated in code reviews and agile development practices',
      'Created technical documentation for development team',
    ],
    technologies: ['JavaScript', 'React', 'Express.js', 'MySQL', 'Git'],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 text-slate-900">
            Work Experience
          </h2>
          <p className="text-slate-600 text-lg">
            My professional journey in software development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-blue-600 ring-4 ring-white border-2 border-slate-200" />

                {/* Current indicator */}
                {exp.current && (
                  <motion.div
                    className="absolute left-5 top-1 w-7 h-7 rounded-full bg-blue-100"
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
                <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-2xl text-slate-900 mb-2">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-lg">{exp.company}</span>
                          <span className="text-slate-400">•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      {exp.current && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full whitespace-nowrap">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>

                    <p className="text-slate-600">{exp.description}</p>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-slate-900 mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-slate-900 mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-50 text-slate-700 text-sm rounded-full border border-slate-200 hover:border-slate-300 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Full Resume</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}