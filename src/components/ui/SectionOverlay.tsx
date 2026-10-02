import React from 'react';
import { SectionConfig, EngineComponent } from '../../types';
import { ENGINE_COMPONENTS } from '../../data/engineData';
import { Play, RotateCw, ArrowDown, Sparkles, Sliders } from 'lucide-react';

interface SectionOverlayProps {
  currentSection: SectionConfig;
  sectionProgress: number; // 0 to 1
  onResetView?: () => void;
  isDriving: boolean;
  onToggleDrive: () => void;
  isEngineIgnited: boolean;
  onIgnition: () => void;
  selectedEngineComponent: EngineComponent | null;
  onSelectEngineComponent: (comp: EngineComponent) => void;
  explodedProgress: number;
  onSetExplodedProgress?: (val: number) => void;
}

export const SectionOverlay: React.FC<SectionOverlayProps> = ({
  currentSection,
  sectionProgress,
  onResetView,
  isDriving,
  onToggleDrive,
  isEngineIgnited,
  onIgnition,
  selectedEngineComponent,
  onSelectEngineComponent,
  explodedProgress,
  onSetExplodedProgress
}) => {
  const isGarage = currentSection.id === 'garage';
  const isHero = currentSection.id === 'hero';
  const isWalkaround = currentSection.id === 'walkaround';
  const is360 = currentSection.id === 'explorer360';
  const isHotspots = currentSection.id === 'hotspots';
  const isExploded = currentSection.id === 'exploded';
  const isEngine = currentSection.id === 'engine';
  const isInterior = currentSection.id === 'interior';
  const isDrive = currentSection.id === 'drive';
  const isPerformance = currentSection.id === 'performance';
  const isDetails = currentSection.id === 'details';
  const isHistory = currentSection.id === 'history';
  const isReassembly = currentSection.id === 'reassembly';
  const isFinalReveal = currentSection.id === 'finalReveal';

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-12 select-none">
      {/* Top Meta Bar */}
      <div className="flex justify-between items-start pt-16 md:pt-12">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.35em] text-zinc-500 uppercase">
            <span className="text-red-500 font-bold">{currentSection.numberStr}</span>
            <span>// {currentSection.subtitle}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-editorial font-bold tracking-widest text-white">
            {currentSection.title}
          </h2>
        </div>

        {/* Subtle Section Step Count */}
        <div className="hidden sm:block text-right">
          <span className="text-xs font-mono tracking-widest text-zinc-500">
            PHASE {currentSection.numberStr} / 14
          </span>
        </div>
      </div>

      {/* Center Narrative Overlays */}
      <div className="max-w-xl">
        {/* Section 01: The Garage Opening */}
        {isGarage && (
          <div className="space-y-4 animate-in fade-in duration-700">
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              {currentSection.description}
            </p>
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping inline-block"></span>
              <span>SCROLL DOWN TO INITIATE REVELATION</span>
            </div>
          </div>
        )}

        {/* Section 02: Hero Main Title */}
        {isHero && (
          <div className="space-y-3 animate-in fade-in duration-700">
            <div className="text-[12px] font-mono tracking-[0.45em] text-red-500 uppercase font-semibold">
              ORIGINAL SPORTSROOF FASTBACK
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-editorial font-black tracking-tight text-white leading-none">
              1969<br />
              <span className="text-zinc-300">MACH 1</span>
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed pt-2 max-w-md">
              The definitive expression of American high-speed touring. Engineered with Larry Shinoda aerodynamics and pure big-block authority.
            </p>
          </div>
        )}

        {/* Section 03: Walkaround Guidance */}
        {isWalkaround && (
          <div className="space-y-2 animate-in fade-in duration-500">
            <div className="text-[10px] font-mono tracking-[0.35em] text-zinc-500 uppercase">
              SCROLL-DRIVEN CAMERA CHOREOGRAPHY
            </div>
            <p className="text-xs md:text-sm text-zinc-400 font-light">
              Continuous 360-degree dolly tracing Larry Shinoda's extended hood line, fastback slope, and quad exhaust valance.
            </p>
          </div>
        )}

        {/* Section 04: Interactive 360 Explorer */}
        {is360 && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="inline-block bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 pointer-events-auto">
              <div className="text-xs font-mono tracking-[0.3em] text-white flex items-center space-x-2">
                <RotateCw size={14} className="text-red-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span>DRAG TO ROTATE // SCROLL TO ZOOM</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light max-w-sm">
              Free tactile inspection mode with smooth inertia. Drag in any direction or pinch/wheel to inspect surface curvature.
            </p>
            {onResetView && (
              <button
                onClick={onResetView}
                className="pointer-events-auto text-[10px] font-mono tracking-widest uppercase text-zinc-400 hover:text-white px-3 py-1.5 border border-white/10 hover:border-white/30 transition-all"
              >
                RESET CAMERA ANGLE
              </button>
            )}
          </div>
        )}

        {/* Section 05: Hotspots Guidance */}
        {isHotspots && (
          <div className="space-y-2 animate-in fade-in duration-500">
            <div className="text-[10px] font-mono tracking-[0.35em] text-red-500 uppercase">
              TACTILE SPECIFICATION NODES
            </div>
            <p className="text-xs md:text-sm text-zinc-400 font-light">
              Click any spatial beacon to engage focused macro inspection of the Shaker intake, Magnum 500 wheels, 428 CJ engine, or deluxe cockpit.
            </p>
          </div>
        )}

        {/* Section 06: Exploded View */}
        {isExploded && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="text-[10px] font-mono tracking-[0.35em] text-red-500 uppercase">
              KINEMATIC COMPONENT DISASSEMBLY
            </div>
            <p className="text-xs md:text-sm text-zinc-400 font-light">
              Scroll down to mechanically separate the sportsroof unibody, 428ci FE engine block, Magnum 500 axles, and interior cabin.
            </p>
            {/* Direct Slider Control for Interactive Precision */}
            {onSetExplodedProgress && (
              <div className="pointer-events-auto max-w-xs bg-black/60 backdrop-blur-md border border-white/10 p-3 space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>DISASSEMBLY RATIO</span>
                  <span className="text-white font-bold">{Math.round(explodedProgress * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodedProgress}
                  onChange={(e) => onSetExplodedProgress(parseFloat(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>
            )}
          </div>
        )}

        {/* Section 07: Engine Inspection Details */}
        {isEngine && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="text-[10px] font-mono tracking-[0.35em] text-red-500 uppercase">
              SURGICAL V8 INSPECTION
            </div>
            <p className="text-xs md:text-sm text-zinc-400 font-light">
              Inspect the high-flow Ram Air intake, Holley 735 CFM carburetor, and nodular cast-iron block that propelled the Mach 1 to drag-racing dominance.
            </p>
            {/* Interactive Engine Component Quick Selector */}
            <div className="pointer-events-auto flex flex-wrap gap-1.5 pt-2">
              {ENGINE_COMPONENTS.map((comp) => {
                const isSelected = selectedEngineComponent?.id === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => onSelectEngineComponent(comp)}
                    className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest border transition-all ${
                      isSelected
                        ? 'bg-red-950 border-red-500 text-white font-bold'
                        : 'bg-black/50 border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {comp.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Selected Component Card */}
            {selectedEngineComponent && (
              <div className="bg-black/80 backdrop-blur-md border border-white/15 p-4 pointer-events-auto animate-in fade-in">
                <div className="text-[9px] font-mono tracking-widest text-red-400 uppercase">
                  {selectedEngineComponent.subtitle}
                </div>
                <div className="text-sm font-editorial font-bold text-white mt-0.5 mb-1">
                  {selectedEngineComponent.name}
                </div>
                <p className="text-xs text-zinc-300 font-light mb-3">
                  {selectedEngineComponent.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedEngineComponent.specs.map((s, idx) => (
                    <div key={idx} className="bg-white/5 p-1.5 text-[10px] font-mono">
                      <span className="text-zinc-500 block">{s.label}</span>
                      <span className="text-white">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section 08: Interior Cabin Tour */}
        {isInterior && (
          <div className="space-y-3 animate-in fade-in duration-500">
            <div className="text-[10px] font-mono tracking-[0.35em] text-red-500 uppercase">
              COCKPIT ARCHITECTURE
            </div>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Deluxe sports package: Teak woodgrain dash applique, simulated high-density instrumentation, Rim-Blow horn control, and high-back knit vinyl bucket seats.
            </p>
          </div>
        )}

        {/* Section 09: The Drive Experience */}
        {isDrive && (
          <div className="space-y-5 animate-in fade-in duration-500 pointer-events-auto">
            <div className="space-y-1">
              <div className="text-[10px] font-mono tracking-[0.35em] text-red-500 uppercase">
                DYNAMIC PURSUIT
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-light">
                Unleash the 428 Cobra Jet onto open asphalt. Feel the cam idle rumble and witness the high-speed dusk tracking camera.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Ignition Fire Button */}
              <button
                onClick={onIgnition}
                className={`px-5 py-2.5 text-xs font-mono tracking-[0.2em] uppercase font-bold border transition-all flex items-center space-x-2 ${
                  isEngineIgnited
                    ? 'bg-red-600 text-white border-red-400 shadow-lg shadow-red-900/50'
                    : 'bg-white/10 hover:bg-white text-white hover:text-black border-white/20'
                }`}
              >
                <Play size={13} fill="currentColor" />
                <span>{isEngineIgnited ? '428 IGNITED' : 'START 428 V8'}</span>
              </button>

              {/* Drive Pursuit Mode Toggle */}
              <button
                onClick={onToggleDrive}
                className={`px-5 py-2.5 text-xs font-mono tracking-[0.2em] uppercase border transition-all ${
                  isDriving
                    ? 'bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-900/50'
                    : 'bg-black/60 text-zinc-300 hover:text-white border-white/15 hover:border-white/30'
                }`}
              >
                <span>{isDriving ? 'BRAKE / DISENGAGE' : 'ENGAGE DRIVE'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Section 11: Macro Photographic Details */}
        {isDetails && (
          <div className="space-y-2 animate-in fade-in duration-500">
            <div className="text-[10px] font-mono tracking-[0.35em] text-red-500 uppercase">
              MACRO CRAFTSMANSHIP
            </div>
            <p className="text-xs md:text-sm text-zinc-400 font-light">
              High-resolution automotive photography sequence: running horse corral, competition twist pins, and honeycomb tail panel.
            </p>
          </div>
        )}

        {/* Section 13: Mechanical Reassembly */}
        {isReassembly && (
          <div className="space-y-2 animate-in fade-in duration-500">
            <div className="text-[10px] font-mono tracking-[0.35em] text-red-500 uppercase">
              PRECISION MECHANICAL CONVERGENCE
            </div>
            <p className="text-xs md:text-sm text-zinc-400 font-light">
              Chassis, 428 Big-Block, interior cockpit, sportsroof body, and Magnum 500 wheels dock back into factory unity.
            </p>
          </div>
        )}

        {/* Section 14: Final Reveal Cinematic Ending */}
        {isFinalReveal && (
          <div className="space-y-4 animate-in fade-in duration-1000">
            <div className="text-[11px] font-mono tracking-[0.45em] text-red-500 uppercase font-bold">
              AN AMERICAN ICON
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-editorial font-black tracking-widest text-white leading-none">
              THE MACH 1
            </h1>
            <div className="text-xl font-editorial text-zinc-400 tracking-[0.3em]">
              1969
            </div>
            <p className="text-xs text-zinc-400 font-light max-w-md pt-2">
              Sculpted for speed. Revered for power. Preserved in digital immortality.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div className="flex justify-between items-end pb-4 border-t border-white/5 pt-4">
        <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-zinc-500">
          <ArrowDown size={12} className="animate-bounce text-red-500" />
          <span>SCROLL TO PROGRESS // SECTION {currentSection.numberStr}</span>
        </div>

        <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          FORD MUSTANG FASTBACK // MACH 1
        </div>
      </div>
    </div>
  );
};
