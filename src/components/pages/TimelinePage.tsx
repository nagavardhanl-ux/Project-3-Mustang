import React, { useState } from 'react';
import { useArchiveRouter } from '../../hooks/useArchiveRouter';
import { TIMELINE_MILESTONES } from '../../data/timelineData';
import { ArrowRight, Compass, Sparkles, Flag, Calendar, Car } from 'lucide-react';

export function TimelinePage() {
  const { navigate } = useArchiveRouter();
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [hoveredMilestoneId, setHoveredMilestoneId] = useState<string | null>(null);

  const eras = ['All', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];

  const filteredMilestones = TIMELINE_MILESTONES.filter((m) => {
    if (selectedEra !== 'All' && m.era !== selectedEra) return false;
    return true;
  });

  return (
    <div className="bg-[#080808] text-white pt-24 pb-32 min-h-screen">
      {/* Timeline Journey Header */}
      <section className="relative py-16 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#c02424] tracking-widest uppercase mb-3">
            <Compass size={14} />
            <span>The Open Road of Heritage</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-editorial font-bold text-white tracking-wide uppercase">
            60 Years on the Tarmac
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed">
            A curated journey through the definitive automotive milestones that shaped the Mustang into America’s sports coupe icon.
          </p>

          {/* Era Filter Selector */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {eras.map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                  selectedEra === era
                    ? 'bg-[#c02424] text-white font-semibold shadow-lg shadow-red-900/30'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/10 hover:bg-neutral-800'
                }`}
              >
                {era}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Roadway Canvas */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative">
        {/* Central Highway Track Spine */}
        <div className="absolute left-4 sm:left-1/2 top-16 bottom-16 -translate-x-1/2 w-8 hidden sm:flex flex-col items-center pointer-events-none z-0">
          {/* Asphalt Track */}
          <div className="w-16 h-full bg-[#111113] border-x border-white/10 relative shadow-2xl">
            {/* Center Dashed Road Markings */}
            <div 
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 border-r-2 border-dashed border-amber-400/40"
              style={{ backgroundSize: '20px 40px' }}
            />
          </div>
        </div>

        {/* Milestone Nodes */}
        <div className="relative z-10 space-y-16 sm:space-y-24">
          {filteredMilestones.map((m, index) => {
            const isEven = index % 2 === 0;
            const isHovered = hoveredMilestoneId === m.id;

            return (
              <div
                key={m.id}
                className={`flex flex-col sm:flex-row items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12 relative`}
                onMouseEnter={() => setHoveredMilestoneId(m.id)}
                onMouseLeave={() => setHoveredMilestoneId(null)}
              >
                {/* Year Marker on Central Spine (Desktop) */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#080808] border-2 border-amber-400 items-center justify-center text-xs font-mono font-bold text-white shadow-xl z-20">
                  {m.year.toString().slice(2)}
                </div>

                {/* Content Card Side (Half Width) */}
                <div className="w-full sm:w-1/2">
                  <div
                    onClick={() => m.carId && navigate(`/cars/${m.carId}`)}
                    className={`p-6 rounded-xl bg-neutral-900/80 border transition-all duration-300 cursor-pointer ${
                      isHovered
                        ? 'border-amber-400/80 bg-neutral-800/90 shadow-2xl -translate-y-1'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Badge & Year Header */}
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold font-mono text-white tracking-tight">
                          {m.year}
                        </span>
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                          {m.badge}
                        </span>
                      </div>
                      <span className="text-amber-400 font-semibold">{m.generation}</span>
                    </div>

                    <h3 className="text-xl font-editorial font-bold text-white tracking-wide">
                      {m.model}
                    </h3>
                    <div className="text-xs font-mono text-[#c02424] mt-1 font-medium">
                      {m.tagline}
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
                      {m.description}
                    </p>

                    {/* Key Stat Capsule */}
                    <div className="mt-4 p-2.5 rounded bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-400 text-[10px] uppercase">Telemetry / Legacy:</span>
                      <span className="text-amber-400 font-bold">{m.keyStat}</span>
                    </div>

                    {/* Action CTA */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-400 group-hover:text-white">
                        {m.carId ? 'View Exhibit Specifications' : 'Archival Milestone'}
                      </span>
                      <button className="text-amber-400 hover:text-white flex items-center space-x-1">
                        <span>EXPLORE</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Photographic Preview Side (Half Width) */}
                <div className="w-full sm:w-1/2">
                  <div
                    onClick={() => m.carId && navigate(`/cars/${m.carId}`)}
                    className={`relative h-60 sm:h-72 rounded-xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                      isHovered
                        ? 'border-amber-400 shadow-2xl scale-[1.02]'
                        : 'border-white/10'
                    }`}
                  >
                    <img
                      src={m.image}
                      alt={m.model}
                      className="w-full h-full object-cover filter saturate-[0.9] hover:saturate-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                      <span>{m.model}</span>
                      <span className="text-amber-400">{m.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
