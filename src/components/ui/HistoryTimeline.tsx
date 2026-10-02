import React, { useState } from 'react';
import { HISTORY_EVENTS } from '../../data/historyData';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface HistoryTimelineProps {
  active: boolean;
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ active }) => {
  const [selectedIndex, setSelectedIndex] = useState(4); // default to 1969 Mach 1

  if (!active) return null;

  const currentEvent = HISTORY_EVENTS[selectedIndex];

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-end p-6 md:p-12 pb-20 select-none">
      <div className="max-w-4xl w-full mx-auto pointer-events-auto bg-[#0b0c0f]/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 animate-in fade-in duration-500">
        {/* Timeline Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.35em] text-red-500 uppercase">
            <Calendar size={13} />
            <span>HERITAGE CHRONOLOGY // 1964 - 1970</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              className="p-1.5 border border-white/10 text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono text-zinc-400">
              {selectedIndex + 1} / {HISTORY_EVENTS.length}
            </span>
            <button
              onClick={() => setSelectedIndex(Math.min(HISTORY_EVENTS.length - 1, selectedIndex + 1))}
              disabled={selectedIndex === HISTORY_EVENTS.length - 1}
              className="p-1.5 border border-white/10 text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Year Pills Strip */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {HISTORY_EVENTS.map((event, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={event.year}
                onClick={() => setSelectedIndex(idx)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-red-950/70 border-red-500 text-white font-bold'
                    : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                {event.year}
              </button>
            );
          })}
        </div>

        {/* Active Event Card */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
              {currentEvent.subtitle}
            </span>
            <h3 className="text-2xl md:text-3xl font-editorial font-bold text-white tracking-wider mt-1">
              {currentEvent.title}
            </h3>
          </div>

          <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
            {currentEvent.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="bg-white/[0.02] border border-white/5 p-3">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                PRODUCTION MILESTONE
              </span>
              <span className="text-sm font-mono text-zinc-200 mt-0.5 block font-semibold">
                {currentEvent.milestone}
              </span>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-3">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">
                HISTORICAL IMPACT
              </span>
              <span className="text-sm text-zinc-300 mt-0.5 block font-light">
                {currentEvent.impact}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
