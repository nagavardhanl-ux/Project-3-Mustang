import React, { useState } from 'react';
import { useArchiveRouter } from '../../hooks/useArchiveRouter';
import { HISTORY_CHAPTERS } from '../../data/historyData';
import { ArrowRight, BookOpen, Quote, Calendar, Layers, ChevronRight } from 'lucide-react';

export function HistoryPage() {
  const { navigate } = useArchiveRouter();
  const [activeChapterId, setActiveChapterId] = useState<string>(HISTORY_CHAPTERS[0].id);

  return (
    <div className="bg-[#080808] text-white pt-24 pb-32">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-[#080808] to-[#080808] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 tracking-[0.25em] uppercase mb-4 bg-amber-950/30 px-3 py-1 rounded border border-amber-500/20">
            <BookOpen size={13} />
            <span>Digital Automotive Chronicle</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-editorial font-bold text-white tracking-wide uppercase">
            The Story of Mustang
          </h1>
          <p className="mt-6 text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
            Six decades of rebellion, design innovation, engineering audacity, and the unyielding spirit of the American pony car—from a secret 1962 Dearborn committee to the global racing stage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center space-x-1.5 bg-neutral-900 px-3 py-1.5 rounded border border-white/10">
              <Calendar size={13} className="text-[#c02424]" />
              <span>1960 – Present Day</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-neutral-900 px-3 py-1.5 rounded border border-white/10">
              <Layers size={13} className="text-amber-400" />
              <span>16 Editorial Chapters</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Magazine Layout: Sticky Chapter Index + Longform Narrative */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Interactive Chapter Navigator */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 bg-neutral-900/60 border border-white/10 rounded-xl p-5 backdrop-blur-md max-h-[calc(100vh-140px)] overflow-y-auto space-y-1">
              <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-3 pb-2 border-b border-white/10">
                Chapter Index
              </div>
              {HISTORY_CHAPTERS.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setActiveChapterId(chapter.id);
                    document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`block w-full p-2 rounded text-xs font-mono transition-all text-left ${
                    activeChapterId === chapter.id
                      ? 'bg-white/15 text-white font-semibold pl-3 border-l-2 border-[#c02424]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="text-[10px] text-amber-400/80">
                    Chapter {String(chapter.number).padStart(2, '0')} • {chapter.era}
                  </div>
                  <div className="font-editorial text-neutral-200 truncate mt-0.5">
                    {chapter.title.split(':')[0]}
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Right Column: Editorial Chapters */}
          <main className="lg:col-span-8 space-y-24">
            {HISTORY_CHAPTERS.map((chapter) => (
              <article
                key={chapter.id}
                id={chapter.id}
                className="scroll-mt-28 border-b border-white/10 pb-20 space-y-8"
              >
                {/* Chapter Meta */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-xs font-mono text-[#c02424]">
                    <span>CHAPTER {String(chapter.number).padStart(2, '0')}</span>
                    <span>•</span>
                    <span className="text-amber-400">{chapter.era}</span>
                    <span>•</span>
                    <span className="text-neutral-500">{chapter.period}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-editorial font-bold text-white tracking-wide leading-tight">
                    {chapter.title}
                  </h2>
                  <p className="text-sm font-mono text-neutral-400">
                    {chapter.subtitle}
                  </p>
                </div>

                {/* Chapter Lead Photography */}
                <div className="relative rounded-lg overflow-hidden border border-white/15 shadow-2xl group">
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                    <span>Archival Record • Era {chapter.era}</span>
                    {chapter.relatedCarId && (
                      <button
                        onClick={() => navigate(`/cars/${chapter.relatedCarId}`)}
                        className="text-amber-400 hover:text-white flex items-center space-x-1"
                      >
                        <span>Examine Car</span>
                        <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Lead Paragraph */}
                <p className="text-base sm:text-lg font-sans font-normal text-white leading-relaxed border-l-2 border-amber-500/50 pl-4 italic">
                  {chapter.leadParagraph}
                </p>

                {/* Narrative Body */}
                <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-light">
                  {chapter.body.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Pull Quote if available */}
                {chapter.pullQuote && (
                  <div className="p-6 rounded-lg bg-neutral-900/60 border border-white/10 relative my-6">
                    <Quote size={28} className="text-[#c02424] opacity-30 absolute top-4 right-4" />
                    <p className="text-base sm:text-lg font-editorial italic text-white leading-relaxed">
                      "{chapter.pullQuote.quote}"
                    </p>
                    <div className="mt-3 text-xs font-mono text-amber-400">
                      — {chapter.pullQuote.author}, <span className="text-neutral-400">{chapter.pullQuote.title}</span>
                    </div>
                  </div>
                )}

                {/* Key Historical Facts Table */}
                {chapter.keyFacts && chapter.keyFacts.length > 0 && (
                  <div className="bg-neutral-950/70 border border-white/10 rounded-lg p-4">
                    <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-3">
                      Historical Ledger Data
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {chapter.keyFacts.map((fact, idx) => (
                        <div key={idx} className="border-l border-white/10 pl-3">
                          <div className="text-[10px] font-mono text-neutral-400 uppercase">{fact.label}</div>
                          <div className="text-xs font-mono font-semibold text-white mt-0.5">{fact.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chapter Footer Connections */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                  {chapter.relatedCarId ? (
                    <button
                      onClick={() => navigate(`/cars/${chapter.relatedCarId}`)}
                      className="inline-flex items-center space-x-2 text-xs font-mono text-[#c02424] hover:text-white uppercase tracking-wider"
                    >
                      <span>Explore Associated Mustang →</span>
                    </button>
                  ) : (
                    <span />
                  )}

                  <button
                    onClick={() => navigate('/timeline')}
                    className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-amber-400 uppercase tracking-wider"
                  >
                    <span>Jump to Timeline Year</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </article>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
