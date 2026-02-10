import { motion } from 'motion/react';
import { useState } from 'react';

// Generate contribution data for the past year
const generateContributions = () => {
  const contributions = [];
  const weeks = 52;
  const daysPerWeek = 7;

  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < daysPerWeek; day++) {
      const count = Math.floor(Math.random() * 15);
      contributions.push({
        week,
        day,
        count,
        date: new Date(2025, 0, 1 + week * 7 + day).toLocaleDateString(),
      });
    }
  }
  return contributions;
};

const getIntensity = (count: number) => {
  if (count === 0) return 'bg-slate-100';
  if (count <= 3) return 'bg-green-100';
  if (count <= 6) return 'bg-green-300';
  if (count <= 9) return 'bg-green-500';
  return 'bg-green-600';
};

export function ContributionActivity() {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number } | null>(null);
  const contributions = generateContributions();
  const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0);

  return (
    <section className="relative px-6 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 text-slate-900">
            Contribution Activity
          </h2>
          <p className="text-slate-600 text-lg mb-2">
            {totalContributions} contributions in the last year
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-slate-200 rounded-2xl p-8 overflow-x-auto shadow-sm"
        >
          <div className="min-w-max">
            {/* Day labels */}
            <div className="flex mb-2">
              <div className="w-12" />
              <div className="flex gap-1 text-xs text-slate-500">
                {['Mon', 'Wed', 'Fri'].map((day, i) => (
                  <div key={day} className="w-3 h-3" style={{ marginLeft: i === 0 ? 0 : 'calc(2 * 14px)' }}>
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Contribution grid */}
            <div className="flex gap-1">
              {/* Month labels */}
              <div className="flex flex-col justify-between text-xs text-slate-500 pr-2">
                {['Jan', 'Apr', 'Jul', 'Oct'].map((month) => (
                  <div key={month}>{month}</div>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-flow-col auto-cols-max gap-1">
                {Array.from({ length: 52 }).map((_, week) => (
                  <div key={week} className="grid grid-rows-7 gap-1">
                    {Array.from({ length: 7 }).map((_, day) => {
                      const contribution = contributions[week * 7 + day];
                      return (
                        <motion.div
                          key={`${week}-${day}`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: (week + day) * 0.002 }}
                          whileHover={{ scale: 1.5 }}
                          className={`w-3 h-3 rounded-sm ${getIntensity(contribution.count)} border border-slate-200 cursor-pointer transition-all duration-200`}
                          onMouseEnter={() => setHoveredCell(contribution)}
                          onMouseLeave={() => setHoveredCell(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-6 text-xs text-slate-500">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 3, 6, 9, 12].map((count) => (
                  <div
                    key={count}
                    className={`w-3 h-3 rounded-sm ${getIntensity(count)} border border-slate-200`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>

            {/* Tooltip */}
            {hoveredCell && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 inline-block px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white"
              >
                <div className="">{hoveredCell.count} contributions</div>
                <div className="text-slate-400 text-xs">{hoveredCell.date}</div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          {[
            { label: 'Current Streak', value: '47 days' },
            { label: 'Longest Streak', value: '128 days' },
            { label: 'Total Commits', value: '2,847' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm"
            >
              <div className="text-3xl text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}