import React, { useState, useEffect } from 'react';
import { useArchiveRouter } from '../../hooks/useArchiveRouter';
import { MUSTANG_CARS } from '../../data/mustangCars';
import { LEGENDARY_DRIVERS } from '../../data/racingData';
import { GALLERY_PHOTOS } from '../../data/galleryData';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Gauge, 
  Flame, 
  Compass, 
  Trophy, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export function HomePage() {
  const { navigate } = useArchiveRouter();
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Selected filters for Section 7: Archive Explorer
  const [filterGen, setFilterGen] = useState<string>('All');
  const [filterEra, setFilterEra] = useState<string>('All');

  // Hero curated cars
  const heroCars = MUSTANG_CARS.slice(0, 14);
  const activeCar = heroCars[activeHeroIdx] || heroCars[0];

  // Auto-advance hero unless hovered
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % heroCars.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroCars.length]);

  const nextHero = () => {
    setActiveHeroIdx((prev) => (prev + 1) % heroCars.length);
  };

  const prevHero = () => {
    setActiveHeroIdx((prev) => (prev - 1 + heroCars.length) % heroCars.length);
  };

  // Filtered cars for Section 7
  const filteredArchiveCars = MUSTANG_CARS.filter((car) => {
    if (filterGen !== 'All' && !car.generation.includes(filterGen)) return false;
    if (filterEra !== 'All' && car.era !== filterEra) return false;
    return true;
  });

  return (
    <div className="bg-[#080808] text-white selection:bg-[#c02424] selection:text-white">
      {/* =========================================================================
          SECTION 1: HERO — "THE MUSTANG LEGACY"
         ========================================================================= */}
      <section 
        className="relative h-screen min-h-[680px] w-full flex items-end overflow-hidden select-none"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Background Image Carousel with Depth Transition */}
        {heroCars.map((car, idx) => (
          <div
            key={car.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeHeroIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={car.heroImage}
              alt={car.name}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[7000ms] ease-out"
              style={{
                transform: idx === activeHeroIdx ? 'scale(1.02)' : 'scale(1.08)',
              }}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/45 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/30 to-transparent" />
            {/* Subtle mechanical vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />
          </div>
        ))}

        {/* Hero Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <div className="max-w-2xl">
            {/* Generation & Era Badge */}
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] text-amber-400 bg-black/60 border border-amber-500/30 px-2.5 py-1 rounded uppercase">
                {activeCar.generation}
              </span>
              <span className="text-[11px] font-mono tracking-widest text-neutral-400">
                {activeCar.era} ARCHIVE
              </span>
            </div>

            {/* Year & Name Headline */}
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl md:text-5xl font-mono text-neutral-300 font-light tracking-tight">
                {activeCar.year}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-editorial font-bold tracking-wide uppercase text-white drop-shadow-lg">
                {activeCar.name.replace(`${activeCar.year} `, '')}
              </h1>
            </div>

            {/* One-line Description */}
            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-sans font-light leading-relaxed max-w-xl">
              {activeCar.tagline}
            </p>

            {/* Key Specs Teaser */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-neutral-300 border-t border-white/10 pt-4">
              <div className="flex items-center space-x-1.5">
                <Gauge size={14} className="text-[#c02424]" />
                <span>{activeCar.dna.horsepower.split('@')[0]}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Flame size={14} className="text-amber-400" />
                <span>{activeCar.dna.acceleration0to60} (0-60)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-neutral-400">
                <span>{activeCar.dna.displacement}</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex items-center space-x-4">
              <button
                onClick={() => navigate(`/cars/${activeCar.id}`)}
                className="group inline-flex items-center space-x-3 px-7 py-3.5 rounded bg-[#c02424] hover:bg-[#a31c1c] text-white font-mono text-xs tracking-widest uppercase font-semibold shadow-xl hover:shadow-red-900/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>EXPLORE CAR</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/timeline')}
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <span>VIEW TIMELINE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Navigation Controls & Timeline Scrubber */}
        <div className="absolute bottom-6 right-4 sm:right-8 z-30 flex flex-col items-end space-y-3">
          {/* Next / Prev Chevrons */}
          <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1">
            <button
              onClick={prevHero}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Previous Iconic Mustang"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono px-2 text-neutral-300">
              {String(activeHeroIdx + 1).padStart(2, '0')} / {String(heroCars.length).padStart(2, '0')}
            </span>
            <button
              onClick={nextHero}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Next Iconic Mustang"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Micro Progress Bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#c02424] transition-all duration-300 ease-out"
              style={{ width: `${((activeHeroIdx + 1) / heroCars.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Bottom scroll hint indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 mb-1">Scroll to explore</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE STORY BEGINS
         ========================================================================= */}
      <section className="py-24 border-t border-white/10 bg-[#0a0a0c] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-lg overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src="/images/mustangs/1965-mustang-wimbledon-white.jpg"
                  alt="Mustang I Prototype and early styling"
                  className="w-full h-[420px] object-cover filter saturate-[0.85] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-neutral-300">
                  <span className="text-amber-400 font-bold">1962 EXPERIMENTAL:</span> The mid-engine Mustang I speedster at Watkins Glen
                </div>
              </div>
              {/* Decorative accent element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-[#c02424]/40 pointer-events-none" />
            </div>

            {/* Editorial Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#c02424] tracking-widest uppercase">
                <span className="w-8 h-px bg-[#c02424]" />
                <span>Chapter 01 • Origin</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-white tracking-wide">
                The story begins with an idea.
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
                In 1962, an informal group known as the Fairlane Committee gathered in Dearborn with an urgent mission: create an affordable, youthful, exhilarating four-seater before the post-war baby boomers came of driving age.
              </p>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
                From the lightweight tubular Mustang I experimental roadster to Gale Halderman’s midnight sketches of the galloping pony emblem, the project moved with unprecedented velocity. On April 17, 1964, the world changed forever.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/history')}
                  className="group inline-flex items-center space-x-3 text-xs font-mono tracking-widest text-amber-400 hover:text-white uppercase transition-colors"
                >
                  <span>DISCOVER THE FULL STORY</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 60+ YEARS OF MUSTANG (ERA PREVIEW)
         ========================================================================= */}
      <section className="py-24 border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-mono tracking-widest text-[#c02424] uppercase mb-2">
                Historical Continuum
              </div>
              <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
                60+ Years of Mustang Evolution
              </h2>
            </div>
            <button
              onClick={() => navigate('/timeline')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
            >
              <span>EXPLORE THE TIMELINE</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Eras Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {[
              { era: '1960s', title: 'Genesis & Big Blocks', car: 'Mach 1 / Shelby', count: '1964-69' },
              { era: '1970s', title: 'Trans-Am & Crisis', car: 'Boss 302 / II', count: '1970-78' },
              { era: '1980s', title: 'Fox 5.0 & Turbo SVO', car: '5.0 HO / SVO', count: '1979-89' },
              { era: '1990s', title: 'SVT Dawn & New Edge', car: '93 Cobra / SN95', count: '1990-99' },
              { era: '2000s', title: 'Retro-Futurism', car: 'S197 / Bullitt', count: '2000-09' },
              { era: '2010s', title: 'Coyote & Voodoo', car: '5.0 Ti-VCT / GT350', count: '2010-19' },
              { era: '2020s', title: 'Dark Horse & GTD', car: 'S650 / GT3', count: '2020+' },
            ].map((item) => (
              <div
                key={item.era}
                onClick={() => navigate('/timeline')}
                className="p-4 rounded-lg bg-neutral-900/60 border border-white/10 hover:border-amber-500/40 hover:bg-neutral-800/80 cursor-pointer transition-all group"
              >
                <div className="text-2xl font-editorial font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.era}
                </div>
                <div className="text-[10px] font-mono text-[#c02424] mt-1 font-semibold">
                  {item.count}
                </div>
                <div className="text-xs text-neutral-300 font-sans mt-2 font-medium">
                  {item.title}
                </div>
                <div className="text-[10px] font-mono text-neutral-400 mt-2">
                  {item.car}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE ICONS (HORIZONTAL CARDS)
         ========================================================================= */}
      <section className="py-24 border-t border-white/10 bg-[#0b0b0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2">
                Curated Hall of Fame
              </div>
              <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
                The Icons
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-400 max-w-sm mt-2 md:mt-0">
              Select an icon to explore its complete engineering DNA, factory engines, and racing legacy.
            </p>
          </div>

          {/* Horizontal Scroller */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              MUSTANG_CARS.find((c) => c.id === '1969-mach-1')!,
              MUSTANG_CARS.find((c) => c.id === '1965-shelby-gt350')!,
              MUSTANG_CARS.find((c) => c.id === '2016-shelby-gt350')!,
              MUSTANG_CARS.find((c) => c.id === '2024-dark-horse')!,
            ].filter(Boolean).map((car) => (
              <div
                key={car.id}
                className="rounded-lg bg-neutral-900/80 border border-white/10 overflow-hidden group hover:border-[#c02424]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={car.images.hero}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-amber-400 border border-white/10">
                      {car.year}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5">
                    <div className="text-xs font-mono text-[#c02424] font-semibold mb-1">
                      {car.generation}
                    </div>
                    <h3 className="text-lg font-editorial font-bold text-white group-hover:text-amber-400 transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans mt-2 line-clamp-2 leading-relaxed">
                      {car.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => navigate(`/cars/${car.id}`)}
                    className="w-full py-2.5 px-3 rounded bg-white/5 hover:bg-[#c02424] text-neutral-300 hover:text-white border border-white/10 hover:border-[#c02424] font-mono text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2"
                  >
                    <span>EXPLORE CAR</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: BUILT TO RACE
         ========================================================================= */}
      <section className="py-24 border-t border-white/10 bg-[#080808] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#c02424] tracking-widest uppercase">
                <Trophy size={14} />
                <span>Motorsport Heritage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-white tracking-wide">
                Built to Race
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
                The Mustang did not wait to go racing. Within months of its April 1964 launch, Alan Mann Racing entered red-and-gold notchbacks into the grueling 3,700-mile Tour de France Automobile, scoring the car’s first major international victory.
              </p>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
                From the brutal SCCA Trans-Am battles of 1969-70 between Parnelli Jones and Mark Donohue to 330-mph NHRA Funny Cars and modern 24 Hours of Le Mans GT3 podiums, competition is Mustang’s indelible genetic code.
              </p>

              {/* Race Highlights Quick List */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded bg-neutral-900/70 border border-white/10">
                  <div className="text-amber-400 font-bold">1964 Tour de France</div>
                  <div className="text-neutral-400 text-[10px]">First International Triumph</div>
                </div>
                <div className="p-3 rounded bg-neutral-900/70 border border-white/10">
                  <div className="text-[#c02424] font-bold">1970 Trans-Am Title</div>
                  <div className="text-neutral-400 text-[10px]">Parnelli Jones Boss 302</div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/racing')}
                  className="group inline-flex items-center space-x-3 px-6 py-3 rounded bg-[#c02424] hover:bg-[#a31c1c] text-white font-mono text-xs tracking-widest uppercase font-semibold transition-all"
                >
                  <span>EXPLORE RACING HISTORY</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Racing Image Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-lg overflow-hidden border border-white/15 shadow-2xl">
                <img
                  src="/images/mustangs/1969-boss302-transam-racing.jpg"
                  alt="Trans-Am Mustang at Laguna Seca"
                  className="w-full h-[440px] object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-neutral-300">
                  <span className="text-[#c02424] font-bold">1969 TRANS-AM:</span> Parnelli Jones carving the Corkscrew in the Bud Moore Boss 302
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DRIVERS & LEGENDS
         ========================================================================= */}
      <section className="py-24 border-t border-white/10 bg-[#0a0a0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2">
              The Men Behind the Wheel
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
              Drivers & Legends
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-2">
              The champions, builders, and visionaries who steered Mustang into immortality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEGENDARY_DRIVERS.slice(0, 3).map((driver) => (
              <div
                key={driver.id}
                onClick={() => navigate('/racing')}
                className="p-5 rounded-lg bg-neutral-900/60 border border-white/10 hover:border-amber-500/40 cursor-pointer transition-all group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="w-14 h-14 rounded-full object-cover border border-white/15 group-hover:border-amber-400 transition-colors"
                  />
                  <div>
                    <h3 className="text-base font-editorial font-bold text-white group-hover:text-amber-400 transition-colors">
                      {driver.name}
                    </h3>
                    <div className="text-[10px] font-mono text-neutral-400">
                      {driver.nationality} • {driver.activeYears}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 font-sans line-clamp-3 leading-relaxed">
                  {driver.bio}
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>{driver.signatureCars[0]}</span>
                  <ArrowRight size={12} className="text-neutral-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: EXPLORE THE MUSTANG ARCHIVE (FILTERING PREVIEW)
         ========================================================================= */}
      <section className="py-24 border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="text-xs font-mono tracking-widest text-[#c02424] uppercase mb-2 flex items-center space-x-2">
                <SlidersHorizontal size={13} />
                <span>Archive Catalog</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
                Explore the Mustang Archive
              </h2>
            </div>
            <button
              onClick={() => navigate('/timeline')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-amber-400 hover:text-white uppercase transition-colors"
            >
              <span>FULL INTERACTIVE ARCHIVE</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-8 p-4 rounded-lg bg-neutral-900/70 border border-white/10 items-center justify-between">
            {/* Generation Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Generation:</span>
              <select
                value={filterGen}
                onChange={(e) => setFilterGen(e.target.value)}
                className="bg-neutral-950 border border-white/15 text-xs font-mono text-white rounded px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
              >
                <option value="All">All Generations</option>
                <option value="Gen 1">Gen 1 (1964-73)</option>
                <option value="Gen 2">Gen 2 (1974-78)</option>
                <option value="Gen 3">Gen 3 Fox (1979-93)</option>
                <option value="Gen 4">Gen 4 SN95 (1994-04)</option>
                <option value="Gen 5">Gen 5 S197 (2005-14)</option>
                <option value="Gen 6">Gen 6 S550 (2015-23)</option>
                <option value="Gen 7">Gen 7 S650 (2024+)</option>
              </select>
            </div>

            {/* Era Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Era:</span>
              <select
                value={filterEra}
                onChange={(e) => setFilterEra(e.target.value)}
                className="bg-neutral-950 border border-white/15 text-xs font-mono text-white rounded px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
              >
                <option value="All">All Eras</option>
                <option value="1960s">1960s</option>
                <option value="1970s">1970s</option>
                <option value="1980s">1980s</option>
                <option value="1990s">1990s</option>
                <option value="2000s">2000s</option>
                <option value="2010s">2010s</option>
                <option value="2020s">2020s</option>
              </select>
            </div>

            <div className="text-[11px] font-mono text-neutral-400">
              Showing <span className="text-white font-bold">{filteredArchiveCars.length}</span> documented models
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArchiveCars.map((car) => (
              <div
                key={car.id}
                onClick={() => navigate(`/cars/${car.id}`)}
                className="rounded-lg bg-neutral-900/50 border border-white/10 hover:border-amber-400/50 p-4 cursor-pointer transition-all group"
              >
                <div className="relative h-40 rounded overflow-hidden mb-4">
                  <img
                    src={car.images.hero}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-300">
                    {car.dna.curbWeight}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                  <span>{car.year}</span>
                  <span className="text-amber-400">{car.generation}</span>
                </div>
                <h4 className="text-base font-editorial font-bold text-white group-hover:text-amber-400 transition-colors">
                  {car.name}
                </h4>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>{car.dna.engine.split('(')[0]}</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: GALLERY PREVIEW
         ========================================================================= */}
      <section className="py-24 border-t border-white/10 bg-[#09090c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2">
                Visual Archive
              </div>
              <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
                Gallery Preview
              </h2>
            </div>
            <button
              onClick={() => navigate('/gallery')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
            >
              <span>VIEW FULL GALLERY</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Visual Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {GALLERY_PHOTOS.slice(0, 6).map((photo) => (
              <div
                key={photo.id}
                onClick={() => navigate('/gallery')}
                className="relative h-44 rounded-lg overflow-hidden border border-white/10 hover:border-amber-400/50 cursor-pointer group transition-all"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity truncate">
                  {photo.title}
                </div>
                <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[9px] font-mono text-amber-400 uppercase">
                  {photo.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL HOMEPAGE CTA
         ========================================================================= */}
      <section className="py-32 border-t border-white/10 bg-gradient-to-b from-[#080808] to-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <div className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-white tracking-wider uppercase leading-tight">
            60+ YEARS.
            <br />
            COUNTLESS STORIES.
            <br />
            <span className="text-[#c02424]">ONE MUSTANG.</span>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed">
            From Venice Beach race shops to Michigan assembly lines, explore the definitive digital archive of America’s enduring automotive icon.
          </p>

          <div className="pt-6">
            <button
              onClick={() => navigate('/timeline')}
              className="group inline-flex items-center space-x-3 px-8 py-4 rounded bg-[#c02424] hover:bg-[#a31c1c] text-white font-mono text-xs tracking-widest uppercase font-semibold shadow-2xl hover:shadow-red-900/40 transition-all transform hover:-translate-y-0.5"
            >
              <span>EXPLORE THE MUSTANG LEGACY</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
