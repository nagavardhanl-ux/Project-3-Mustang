import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useArchiveRouter } from '../../hooks/useArchiveRouter';
import { MUSTANG_CARS } from '../../data/mustangCars';
import { RACING_EVENTS, LEGENDARY_DRIVERS } from '../../data/racingData';
import { HISTORY_CHAPTERS } from '../../data/historyData';
import { Search, X, Car, Trophy, BookOpen, User, ArrowRight } from 'lucide-react';

export function QuickSearchModal() {
  const { isSearchOpen, closeSearch, navigate } = useArchiveRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedCars = MUSTANG_CARS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.year.toString().includes(q) ||
        c.generation.toLowerCase().includes(q) ||
        c.dna.engine.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedRaces = RACING_EVENTS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.circuit.toLowerCase().includes(q) ||
        r.driver.name.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedChapters = HISTORY_CHAPTERS.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.era.toLowerCase().includes(q) ||
        h.leadParagraph.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedDrivers = LEGENDARY_DRIVERS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.achievements.some((a) => a.toLowerCase().includes(q))
    ).slice(0, 3);

    return {
      cars: matchedCars,
      races: matchedRaces,
      chapters: matchedChapters,
      drivers: matchedDrivers,
      total: matchedCars.length + matchedRaces.length + matchedChapters.length + matchedDrivers.length,
    };
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelect = (path: string) => {
    navigate(path);
    closeSearch();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Background Click to Dismiss */}
      <div className="fixed inset-0" onClick={closeSearch} />

      <div className="relative w-full max-w-2xl bg-[#0f0f11] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-white/10 bg-neutral-900/80">
          <Search size={18} className="text-amber-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any Mustang, year (e.g., 1969), driver, or racing event..."
            className="w-full bg-transparent text-white placeholder-neutral-500 font-mono text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-500 hover:text-white p-1 mr-1"
            >
              <X size={14} />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-xs font-mono text-neutral-400 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-neutral-400 text-xs font-mono">
              <p className="mb-2">Type keywords like <span className="text-white">"Mach 1"</span>, <span className="text-white">"Shelby"</span>, <span className="text-white">"Cobra"</span>, or <span className="text-white">"1969"</span></p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['1969 Mach 1', '1965 GT350', 'Laguna Seca', 'Coyote 5.0', 'Dark Horse'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results && results.total === 0 && (
            <div className="text-center py-8 text-neutral-500 text-xs font-mono">
              No matching records found in archive for "{query}".
            </div>
          )}

          {results && results.cars.length > 0 && (
            <div>
              <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2 flex items-center space-x-1">
                <Car size={12} className="text-amber-400" />
                <span>Mustang Cars ({results.cars.length})</span>
              </div>
              <div className="space-y-1">
                {results.cars.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => handleSelect(`/cars/${car.id}`)}
                    className="flex items-center justify-between p-2.5 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={car.images.hero} alt={car.name} className="w-12 h-8 object-cover rounded border border-white/10" />
                      <div>
                        <div className="text-sm font-editorial font-bold text-white group-hover:text-amber-400 transition-colors">
                          {car.name}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          {car.dna.engine} • {car.generation}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-500 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {results && results.races.length > 0 && (
            <div>
              <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2 flex items-center space-x-1">
                <Trophy size={12} className="text-amber-400" />
                <span>Racing History ({results.races.length})</span>
              </div>
              <div className="space-y-1">
                {results.races.map((race) => (
                  <div
                    key={race.id}
                    onClick={() => handleSelect(`/racing/${race.id}`)}
                    className="flex items-center justify-between p-2.5 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-editorial font-bold text-white group-hover:text-amber-400 transition-colors">
                        {race.name}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        {race.circuit} • {race.driver.name}
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-500 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {results && results.chapters.length > 0 && (
            <div>
              <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2 flex items-center space-x-1">
                <BookOpen size={12} className="text-amber-400" />
                <span>Editorial History ({results.chapters.length})</span>
              </div>
              <div className="space-y-1">
                {results.chapters.map((chap) => (
                  <div
                    key={chap.id}
                    onClick={() => handleSelect('/history')}
                    className="flex items-center justify-between p-2.5 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-editorial font-bold text-white group-hover:text-amber-400 transition-colors">
                        Chapter {chap.number}: {chap.title}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        {chap.era} • {chap.subtitle}
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-500 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {results && results.drivers.length > 0 && (
            <div>
              <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2 flex items-center space-x-1">
                <User size={12} className="text-amber-400" />
                <span>Drivers & Legends ({results.drivers.length})</span>
              </div>
              <div className="space-y-1">
                {results.drivers.map((drv) => (
                  <div
                    key={drv.id}
                    onClick={() => handleSelect('/racing')}
                    className="flex items-center justify-between p-2.5 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={drv.image} alt={drv.name} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                      <div>
                        <div className="text-sm font-editorial font-bold text-white group-hover:text-amber-400 transition-colors">
                          {drv.name}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          {drv.activeYears} • {drv.achievements[0]}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-500 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
