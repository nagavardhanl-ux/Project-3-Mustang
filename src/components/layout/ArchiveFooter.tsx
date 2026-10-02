import React from 'react';
import { useArchiveRouter } from '../../hooks/useArchiveRouter';
import { ArrowUp, Compass, Flag, ShieldAlert, Sparkles } from 'lucide-react';

export function ArchiveFooter() {
  const { navigate } = useArchiveRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eras = [
    { label: '1960s — Genesis & Muscle', path: '/timeline' },
    { label: '1970s — Trans-Am & Crisis Survival', path: '/timeline' },
    { label: '1980s — Fox Body & Turbo SVO', path: '/timeline' },
    { label: '1990s — SVT Dawn & Modular V8s', path: '/timeline' },
    { label: '2000s — Retro-Futurism & Shelby Return', path: '/timeline' },
    { label: '2010s — Coyote 5.0 & Voodoo Flat-Plane', path: '/timeline' },
    { label: '2020s — S650 Dark Horse & GTD Supercar', path: '/timeline' },
  ];

  return (
    <footer className="bg-[#050505] text-neutral-400 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle track lines in background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full border-b border-dashed border-white" style={{ backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🐎</span>
              <span className="font-editorial text-xl tracking-[0.25em] text-white font-bold uppercase">
                Mustang Archive
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
              An independent, digital automotive exhibition celebrating the six-decade heritage, mechanical engineering, and motorsport victories of the Ford Mustang.
            </p>
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-amber-400/90 bg-amber-950/20 border border-amber-500/20 px-3 py-1.5 rounded">
              <Sparkles size={12} />
              <span>Digital Archive Edition • Curated Enthusiast Record</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-4 flex items-center space-x-2">
              <Compass size={13} className="text-[#c02424]" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-white transition-colors">
                  Overview (Home)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/history')} className="hover:text-white transition-colors">
                  The Story of Mustang (16 Eras)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/timeline')} className="hover:text-white transition-colors">
                  Interactive Road Timeline
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cars/1969-mach-1')} className="hover:text-white text-amber-400 transition-colors">
                  Featured: 1969 Mach 1 360°
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/racing')} className="hover:text-white transition-colors">
                  Racing History & Legends
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/racing/1969-trans-am-laguna-seca')} className="hover:text-white transition-colors">
                  1969 Trans-Am Laguna Seca
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-white transition-colors">
                  Visual Image Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Eras Quick Jump */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-4 flex items-center space-x-2">
              <Flag size={13} className="text-[#c02424]" />
              <span>Chronological Eras</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {eras.map((era) => (
                <li key={era.label}>
                  <button
                    onClick={() => navigate(era.path)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {era.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 p-4 rounded-lg bg-neutral-900/50 border border-white/5 text-[11px] leading-relaxed text-neutral-400 space-y-2">
          <div className="flex items-center space-x-2 text-amber-500/90 font-mono text-xs">
            <ShieldAlert size={14} />
            <span className="font-bold tracking-wider uppercase">Enthusiast Disclaimer & Notice</span>
          </div>
          <p>
            This website is an unofficial, non-commercial personal enthusiast tribute and digital automotive archive dedicated to preserving the history of the Ford Mustang. This project is <strong>NOT affiliated with, sponsored by, or endorsed by Ford Motor Company</strong>.
          </p>
          <p className="text-[10px] text-neutral-400">
            All trademarks, model names, badges, and emblems (including "Mustang", "Mach 1", "Boss 302", "Shelby", "Cobra", "GT350", "GT500", "Dark Horse", and the running horse emblem) are the property of their respective trademark holders. Historical data, racing records, and specifications are curated for educational and enthusiast appreciation.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-400 gap-4">
          <div>
            © {new Date().getFullYear()} The Mustang Digital Archive. Built for enthusiasts.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 hover:text-white transition-colors group px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-neutral-900/60"
          >
            <span>Return to Top</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
