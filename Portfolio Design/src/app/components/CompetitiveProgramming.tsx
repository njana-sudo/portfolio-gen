import { motion } from 'motion/react';
import { Trophy, Target, TrendingUp, Award } from 'lucide-react';

const stats = [
  {
    icon: Trophy,
    label: 'Contest Rating',
    value: '2156',
    change: '+127',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Target,
    label: 'Problems Solved',
    value: '847',
    change: '+23',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    label: 'Global Rank',
    value: '#1,234',
    change: '+456',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Award,
    label: 'Achievements',
    value: '42',
    change: '+3',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export function CompetitiveProgramming() {
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
            Competitive Programming
          </h2>
          <p className="text-slate-600 text-lg">
            Sharpening problem-solving skills through algorithmic challenges
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Content */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>

                  <div className="mb-2">
                    <div className="text-4xl text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>

                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change} this month</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}