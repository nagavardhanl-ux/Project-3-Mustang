import React from 'react';
import { useArchiveRouter } from '../../hooks/useArchiveRouter';
import { RACING_EVENTS, LEGENDARY_DRIVERS, RACING_CATEGORIES, MAJOR_VICTORIES } from '../../data/racingData';
import { Trophy, Flag, Timer, ArrowRight, User, Compass, Zap } from 'lucide-react';

export function RacingPage() {
  const { navigate } = useArchiveRouter();

  return (
    <div className="bg-[#080808] text-white pt-24 pb-32">
      {/* Hero Section: "BUILT TO RACE" */}
      <section className="relative py-20 sm:py-28 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/mustangs/1969-boss302-transam-racing.jpg"
            alt="Mustang Trans-Am Racing"
            className="w-full h-full object-cover object-center filter saturate-75 contrast-125 opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/90" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#c02424] tracking-[0.25em] uppercase mb-4 bg-red-950/30 px-3 py-1 rounded border border-red-500/20 font-bold">
            <Trophy size={14} />
            <span>Motorsport Chronicle • 1964–Present</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-bold text-white tracking-wide uppercase">
            Built to Race
          </h1>
          <p className="mt-6 text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
            Mustang was not born to sit in showrooms. From European rallies to Trans-Am tarmac dogfights, 330-mph nitro dragstrips, and modern 24 Hours of Le Mans GT3 podiums, racing is its lifeblood.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-28">
        {/* SECTION 1 & 2: ORIGINS & EARLY RACING (1964 TOUR DE FRANCE) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              Part I • The Baptism of Speed
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
              How Mustang Entered Racing
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-light">
              Just five months after the public launch at the New York World’s Fair, British racing team Alan Mann prepared four notchback 289 Mustangs with Weber carburetors and entered the 1964 Tour de France Automobile—a grueling 3,700-mile continental rally and circuit torture test.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed font-sans font-light">
              Piloted by Peter Procter and Andrew Cowan, the American pony cars swept 1st and 2nd in the Touring category ahead of established European titans, scoring Mustang’s very first major international racing triumph.
            </p>

            <button
              onClick={() => navigate('/racing/1964-tour-de-france')}
              className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 hover:text-white uppercase tracking-wider transition-colors pt-2"
            >
              <span>Examine 1964 Tour de France Event</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div 
            onClick={() => navigate('/racing/1964-tour-de-france')}
            className="lg:col-span-6 relative rounded-xl overflow-hidden border border-white/10 group cursor-pointer shadow-2xl"
          >
            <img
              src="/images/mustangs/1965-mustang-wimbledon-white.jpg"
              alt="1964 Tour de France Mustang"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
              <span>1964 Tour de France Touring Champion</span>
              <span className="text-amber-400">Read Race Story →</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: TRANS-AM & THE BOSS BATTLES */}
        <section className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-black border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#c02424] tracking-widest uppercase font-bold">
                <Flag size={14} />
                <span>Featured Exhibition Event</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-white tracking-wide">
                1969 Trans-Am: The Boss Battles
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-light">
                The zenith of American road racing. Prepared by Bud Moore Engineering and Carroll Shelby, the 450-hp Boss 302 Mustangs locked horns with Mark Donohue’s Penske Sunoco Camaro in front of deafening crowds.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-300">
                <div className="p-2.5 rounded bg-black/50 border border-white/10">
                  <div className="text-neutral-400 text-[10px]">CIRCUIT</div>
                  <div className="text-white font-bold">Laguna Seca Raceway</div>
                </div>
                <div className="p-2.5 rounded bg-black/50 border border-white/10">
                  <div className="text-neutral-400 text-[10px]">DRIVER</div>
                  <div className="text-amber-400 font-bold">Parnelli Jones</div>
                </div>
                <div className="p-2.5 rounded bg-black/50 border border-white/10">
                  <div className="text-neutral-400 text-[10px]">CAR</div>
                  <div className="text-white font-bold">No. 15 Boss 302</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/racing/1969-trans-am-laguna-seca')}
                  className="px-7 py-3.5 rounded bg-[#c02424] hover:bg-[#a31c1c] text-white font-mono text-xs tracking-widest uppercase font-semibold transition-all flex items-center space-x-2 shadow-xl"
                >
                  <span>ENTER 1969 LAGUNA SECA ARCHIVE</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div 
                onClick={() => navigate('/racing/1969-trans-am-laguna-seca')}
                className="relative rounded-lg overflow-hidden border border-white/15 cursor-pointer group shadow-2xl"
              >
                <img
                  src="/images/mustangs/1969-boss302-transam-racing.jpg"
                  alt="Trans-Am Boss 302 Laguna Seca"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-amber-400">
                  Parnelli Jones carving the Corkscrew (1969)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4, 5, 6, 7: RACING PILLARS (TRANS-AM, DRAG, IMSA, NASCAR) */}
        <section className="space-y-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#c02424] uppercase mb-2">
              Four Pillars of Competition
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
              Motorsport Disciplines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RACING_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="rounded-xl bg-neutral-900/60 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition-all group"
              >
                <div>
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-amber-400">
                      {cat.era}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-editorial font-bold text-white group-hover:text-amber-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 font-sans leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-white/5 space-y-1">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Key Triumphs:</div>
                  <ul className="text-[11px] font-mono text-neutral-300 space-y-0.5">
                    {cat.highlights.map((h, i) => (
                      <li key={i} className="truncate">• {h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8 & 9: LEGENDARY DRIVERS */}
        <section className="space-y-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2 flex items-center space-x-2">
              <User size={14} />
              <span>The Champions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
              Legendary Mustang Drivers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEGENDARY_DRIVERS.map((driver) => (
              <div
                key={driver.id}
                className="p-6 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-white/25 transition-all space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="w-16 h-16 rounded-full object-cover border border-white/15 shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-editorial font-bold text-white">
                      {driver.name}
                    </h3>
                    <div className="text-xs font-mono text-[#c02424]">
                      {driver.nationality} • {driver.activeYears}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
                  {driver.bio}
                </p>

                <div className="p-3 rounded bg-black/40 border border-white/5 space-y-1 text-xs font-mono">
                  <div className="text-[10px] text-neutral-400 uppercase">Career Hallmarks:</div>
                  <ul className="text-[11px] text-neutral-300 space-y-1">
                    {driver.achievements.slice(0, 2).map((ach, idx) => (
                      <li key={idx} className="truncate">• {ach}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10 & 11: MAJOR VICTORIES TIMELINE */}
        <section className="space-y-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#c02424] uppercase mb-2 flex items-center space-x-2">
              <Timer size={14} />
              <span>Podium Ledger</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
              Major Historical Victories
            </h2>
          </div>

          <div className="bg-neutral-900/60 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-neutral-950 text-neutral-400 border-b border-white/10 uppercase tracking-widest">
                  <tr>
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4">Race / Championship</th>
                    <th className="py-3 px-4">Winning Mustang</th>
                    <th className="py-3 px-4">Drivers</th>
                    <th className="py-3 px-4">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {MAJOR_VICTORIES.map((v, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-bold text-amber-400">{v.year}</td>
                      <td className="py-3 px-4 font-editorial font-semibold text-white">{v.title}</td>
                      <td className="py-3 px-4 text-neutral-300">{v.car}</td>
                      <td className="py-3 px-4 text-neutral-400">{v.driver}</td>
                      <td className="py-3 px-4 text-[11px] text-[#c02424]">{v.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
