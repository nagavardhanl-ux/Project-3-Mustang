import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { HotspotItem } from '../../types';

interface HotspotModalProps {
  hotspot: HotspotItem | null;
  onClose: () => void;
}

export const HotspotModal: React.FC<HotspotModalProps> = ({ hotspot, onClose }) => {
  if (!hotspot) return null;

  return (
    <div className="fixed bottom-10 right-6 md:right-12 z-30 max-w-lg w-full pointer-events-auto select-none animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="bg-[#0f1013]/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-none shadow-2xl relative">
        {/* Subtle accent border top */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 via-amber-500 to-transparent" />

        {/* Header Bar */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-500 block mb-1">
              CATEGORY // {hotspot.category}
            </span>
            <h3 className="text-xl md:text-2xl font-editorial font-bold tracking-wider text-white">
              {hotspot.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
            title="Return to Full Car View"
          >
            <X size={16} />
          </button>
        </div>

        {/* Narrative Description */}
        <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-5">
          {hotspot.description}
        </p>

        {/* Engineering Highlights */}
        <div className="space-y-2 mb-6">
          {hotspot.details.map((detail, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-400 font-light">
              <ChevronRight size={13} className="text-red-500 shrink-0 mt-0.5" />
              <span>{detail}</span>
            </div>
          ))}
        </div>

        {/* Technical Specification Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 border-t border-white/10">
          {hotspot.specs.map((spec, idx) => (
            <div key={idx} className="bg-white/[0.03] border border-white/5 p-2.5">
              <div className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                {spec.label}
              </div>
              <div className="text-xs font-mono font-medium text-zinc-200 mt-0.5 truncate">
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        {/* Close inspection action */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 hover:text-white flex items-center space-x-2 transition-colors group"
          >
            <span>RETURN TO FULL VIEW</span>
            <span className="text-red-500 group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

