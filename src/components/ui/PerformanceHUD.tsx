import React, { useState, useEffect } from 'react';
import { SPECIFICATIONS } from '../../data/specificationsData';
import { Gauge, Zap, Cog, Scale } from 'lucide-react';

interface PerformanceHUDProps {
  active: boolean;
}

export const PerformanceHUD: React.FC<PerformanceHUDProps> = ({ active }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'powertrain' | 'drivetrain' | 'chassis' | 'dimensions'>('all');
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    if (active) {
      setAnimProgress(0);
      let step = 0;
      const interval = setInterval(() => {
        step += 0.05;
        if (step >= 1) {
          setAnimProgress(1);
          clearInterval(interval);
        } else {
          setAnimProgress(step);
        }
      }, 25);
      return () => clearInterval(interval);
    } else {
      setAnimProgress(0);
    }
  }, [active]);

  if (!active) return null;

  const filteredSpecs = activeCategory === 'all'
    ? SPECIFICATIONS
    : SPECIFICATIONS.filter((s) => s.category === activeCategory);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-end p-6 md:p-12 pb-20 select-none">
      <div className="max-w-5xl w-full mx-auto pointer-events-auto bg-[#0b0c0f]/85 backdrop-blur-xl border border-white/10 p-6 md:p-8 animate-in fade-in duration-500">
        {/* Top Telemetry Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.35em] text-red-500 uppercase">
              <Gauge size={13} />
              <span>LIVE TELEMETRY & CERTIFIED SPECIFICATIONS</span>
            </div>
            <h3 className="text-xl md:text-3xl font-editorial font-bold tracking-wider text-white mt-1">
              428 COBRA JET BENCHMARK
            </h3>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-2 mt-4 md:mt-0 overflow-x-auto">
            {(['all', 'powertrain', 'drivetrain', 'chassis', 'dimensions'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase transition-all border ${
                  activeCategory === cat
                    ? 'bg-red-950/60 border-red-500/70 text-white'
                    : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Telemetry Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSpecs.map((spec) => {
            let displayedValue = spec.value;
            if (spec.numericTarget && animProgress > 0) {
              const currentNum = Math.round(spec.numericTarget * animProgress);
              if (spec.unit === 'SEC') {
                displayedValue = `${(spec.numericTarget * animProgress).toFixed(1)} SEC`;
              } else if (spec.unit) {
                displayedValue = `${currentNum} ${spec.unit}`;
              }
            }

            return (
              <div
                key={spec.key}
                className="bg-white/[0.02] border border-white/5 p-4 hover:border-red-500/40 transition-colors group"
              >
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center justify-between">
                  <span>{spec.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-red-500 transition-colors" />
                </div>
                <div className="text-lg md:text-xl font-mono font-bold text-white tracking-wider my-1.5">
                  {displayedValue}
                </div>
                <div className="text-[11px] text-zinc-400 font-light leading-snug line-clamp-2">
                  {spec.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dyno Footer Note */}
        <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500">
          <span>SOURCE: FORD MOTOR COMPANY 1969 TECHNICAL SERVICE BULLETIN</span>
          <span>FE BIG-BLOCK ARCHITECTURE</span>
        </div>
      </div>
    </div>
  );
};
