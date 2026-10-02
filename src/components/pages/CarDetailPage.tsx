import React from 'react';
import { useArchiveRouter } from '../../hooks/useArchiveRouter';
import { MUSTANG_CARS } from '../../data/mustangCars';
import { Car360Viewer } from '../ui/Car360Viewer';
import { 
  ArrowRight, 
  ArrowLeft, 
  Gauge, 
  Flame, 
  Trophy, 
  Quote, 
  Wrench, 
  Palette, 
  Cpu, 
  ShieldCheck, 
  Compass 
} from 'lucide-react';

interface CarDetailPageProps {
  carId?: string;
}

export function CarDetailPage({ carId }: CarDetailPageProps) {
  const { navigate } = useArchiveRouter();
  
  // Find car by carId, default to 1969-mach-1
  const effectiveId = carId || '1969-mach-1';
  const car = MUSTANG_CARS.find((c) => c.id === effectiveId) || MUSTANG_CARS[0];

  const relatedCars = MUSTANG_CARS.filter((c) => car.relatedCarIds?.includes(c.id) || false);

  return (
    <div className="bg-[#080808] text-white pt-24 pb-32">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-white/10 text-xs font-mono text-neutral-400">
        <button
          onClick={() => navigate('/timeline')}
          className="hover:text-white flex items-center space-x-2 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>BACK TO TIMELINE</span>
        </button>

        <div className="flex items-center space-x-2">
          <span>CATALOG</span>
          <span>/</span>
          <span className="text-amber-400">{car.generation}</span>
          <span>/</span>
          <span className="text-white font-bold">{car.year}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-mono tracking-widest text-[#c02424] font-semibold uppercase">
              {car.generation} ARCHIVE EXHIBIT
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-mono text-neutral-400">{car.dna.era}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-bold text-white tracking-wide uppercase leading-tight">
            {car.name}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 font-sans font-light leading-relaxed">
            {car.tagline}
          </p>
        </div>

        {/* 360 Studio / 3D Interactive Inspection Stage */}
        <div className="mt-6">
          <Car360Viewer
            carName={car.name}
            has3DModel={car.has3DModel}
            heroImage={car.images.hero}
          />
        </div>
      </section>

      {/* MUSTANG DNA: Engineering Specifications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2 flex items-center space-x-2">
            <Cpu size={14} />
            <span>Telemetry & Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-wide uppercase">
            Mustang DNA
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Primary Engine', val: car.dna.engine.split('(')[0] },
            { label: 'Displacement', val: car.dna.displacement },
            { label: 'Peak Power', val: car.dna.horsepower.split('@')[0] },
            { label: 'Peak Torque', val: car.dna.torque.split('@')[0] },
            { label: '0 – 60 MPH', val: car.dna.acceleration0to60 },
            { label: 'Top Speed', val: car.dna.topSpeed.split('(')[0] },
            { label: 'Transmission', val: car.dna.transmission.split('/')[0] },
            { label: 'Curb Weight', val: car.dna.curbWeight.split('(')[0] },
            { label: 'Drivetrain', val: car.dna.drivetrain.split('(')[0] },
            { label: 'Body Style', val: car.dna.bodyStyle },
            { label: 'Generation', val: car.generation },
            { label: 'Era', val: car.dna.era },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-neutral-900/60 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                {item.label}
              </div>
              <div className="text-sm font-mono font-bold text-white mt-1 truncate" title={item.val}>
                {item.val}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY & HISTORICAL SIGNIFICANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Story Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="text-xs font-mono tracking-widest text-[#c02424] uppercase">
              Curatorial Analysis
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
              {car.story.headline}
            </h2>
            <p className="text-base text-neutral-300 font-sans leading-relaxed">
              {car.story.summary}
            </p>

            <div className="space-y-4 pt-4 text-sm text-neutral-400 font-sans leading-relaxed">
              <div>
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1 font-semibold">
                  Why It Mattered
                </h4>
                <p>{car.story.whyItMattered}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1 font-semibold">
                  Historical Context
                </h4>
                <p>{car.story.historicalContext}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1 font-semibold">
                  What Changed Under the Skin
                </h4>
                <p>{car.story.whatChanged}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-1 font-semibold">
                  Enthusiast Legacy
                </h4>
                <p>{car.story.enthusiastLegacy}</p>
              </div>
            </div>

            {/* Pull Quote */}
            {car.story.pullQuote && (
              <div className="p-6 rounded-lg bg-neutral-900/80 border border-white/10 relative mt-6">
                <Quote size={28} className="text-[#c02424] opacity-30 absolute top-4 right-4" />
                <p className="text-base font-editorial italic text-white leading-relaxed">
                  "{car.story.pullQuote.quote}"
                </p>
                <div className="mt-3 text-xs font-mono text-amber-400">
                  — {car.story.pullQuote.source}
                </div>
              </div>
            )}
          </div>

          {/* Right Racing Connection Spotlight Box */}
          <div className="lg:col-span-4">
            {car.racingConnection?.hasRacingHistory ? (
              <div className="p-6 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-red-950/40 border border-[#c02424]/40 shadow-2xl space-y-4 sticky top-28">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#c02424] tracking-wider uppercase font-semibold">
                  <Trophy size={14} />
                  <span>Motorsport Link</span>
                </div>

                <h3 className="text-xl font-editorial font-bold text-white tracking-wide">
                  This Mustang Went Racing
                </h3>

                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {car.racingConnection.summary}
                </p>

                <div className="p-3 rounded bg-black/50 border border-white/5 space-y-1 text-xs font-mono">
                  <div className="text-neutral-400 text-[10px]">RACE PREPARED CAR:</div>
                  <div className="text-amber-400 font-semibold">{car.racingConnection.carName}</div>
                  {car.racingConnection.driver && (
                    <div className="text-neutral-300 text-[10px]">
                      Piloted by: <span className="text-white">{car.racingConnection.driver}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/racing/${car.racingConnection?.eventId}`)}
                  className="w-full py-3 px-4 rounded bg-[#c02424] hover:bg-[#a31c1c] text-white font-mono text-xs tracking-widest uppercase font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>EXPLORE RACING HISTORY</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-neutral-900/50 border border-white/10 space-y-3 text-xs font-mono text-neutral-400">
                <div className="text-white font-bold uppercase">Heritage Note</div>
                <p>
                  Production records and homologation archives are continuously curated for this generation.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DESIGN & AERODYNAMICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2 flex items-center space-x-2">
            <Wrench size={14} />
            <span>Industrial Styling & Craft</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-wide uppercase">
            Design & Aerodynamics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 rounded-lg bg-neutral-900/60 border border-white/10 space-y-3">
            <h3 className="text-base font-editorial font-bold text-white uppercase tracking-wider">
              Exterior Bodywork & Aero
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed font-light">
              {car.design.exterior}
            </p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-900/60 border border-white/10 space-y-3">
            <h3 className="text-base font-editorial font-bold text-white uppercase tracking-wider">
              Interior Cockpit Architecture
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed font-light">
              {car.design.interior}
            </p>
          </div>
        </div>

        {/* Key Design Highlights Pills */}
        <div className="p-5 rounded-lg bg-neutral-950 border border-white/10">
          <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-3">
            Distinctive Visual Signatures
          </div>
          <div className="flex flex-wrap gap-2">
            {car.design.keyDesignElements.map((el, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-200"
              >
                {el}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINES & PERFORMANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest text-[#c02424] uppercase mb-2 flex items-center space-x-2">
            <Flame size={14} />
            <span>Powertrain Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-wide uppercase">
            Engines & Performance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {car.engines.map((eng, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-neutral-900/60 border border-white/10 space-y-4 hover:border-amber-400/40 transition-colors"
            >
              <div className="text-xs font-mono text-amber-400 font-bold uppercase">
                Option {idx + 1}
              </div>
              <h3 className="text-lg font-editorial font-bold text-white">
                {eng.name}
              </h3>

              <div className="space-y-2 text-xs font-mono pt-2 border-t border-white/10">
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Displacement:</span>
                  <span>{eng.displacement}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Output:</span>
                  <span className="text-amber-400 font-bold">{eng.horsepower}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Torque:</span>
                  <span>{eng.torque}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Fuel Induction:</span>
                  <span>{eng.fuelSystem}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 font-sans pt-2 border-t border-white/5">
                {eng.notable}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FACTORY COLOR PALETTE */}
      {car.colors.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
          <div className="mb-8">
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2 flex items-center space-x-2">
              <Palette size={14} />
              <span>Authentic Finishes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-wide uppercase">
              Factory Color Palette
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {car.colors.map((color, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-neutral-900/60 border border-white/10 text-center space-y-2 group hover:border-white/30 transition-all"
              >
                <div
                  className="w-full h-16 rounded-md shadow-inner border border-white/10 transform group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="text-[11px] font-mono text-neutral-200 truncate font-semibold" title={color.name}>
                  {color.name}
                </div>
                {color.isPopular && (
                  <span className="inline-block text-[9px] font-mono uppercase bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">
                    Popular
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VARIANTS & SPECIAL EDITIONS */}
      {car.variants.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
          <div className="mb-8">
            <div className="text-xs font-mono tracking-widest text-[#c02424] uppercase mb-2">
              Related Packages
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-wide uppercase">
              Variants & Special Editions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {car.variants.map((variant, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-neutral-900/70 border border-white/10 space-y-3"
              >
                <div className="inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-amber-400 font-bold">
                  {variant.badge}
                </div>
                <h3 className="text-xl font-editorial font-bold text-white">
                  {variant.name}
                </h3>
                <div className="text-xs font-mono text-neutral-400">
                  {variant.engine} • <span className="text-white">{variant.power}</span>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed pt-2 border-t border-white/5">
                  {variant.description}
                </p>
                <div className="text-[11px] font-mono text-[#c02424] pt-2">
                  Key Distinction: {variant.distinction}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRODUCTION & HISTORICAL FACTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2 flex items-center space-x-2">
            <ShieldCheck size={14} />
            <span>Manufacturing Ledger</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-wide uppercase">
            Production & Delivery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg bg-neutral-900/60 border border-white/10 space-y-1">
            <div className="text-xs font-mono text-neutral-400 uppercase">Total Production</div>
            <div className="text-lg font-mono font-bold text-white">{car.production.totalBuilt}</div>
          </div>

          <div className="p-6 rounded-lg bg-neutral-900/60 border border-white/10 space-y-1">
            <div className="text-xs font-mono text-neutral-400 uppercase">Original Window Sticker MSRP</div>
            <div className="text-lg font-mono font-bold text-amber-400">{car.production.originalMSRP}</div>
          </div>

          <div className="p-6 rounded-lg bg-neutral-900/60 border border-white/10 space-y-1">
            <div className="text-xs font-mono text-neutral-400 uppercase">Assembly Plants</div>
            <div className="text-sm font-mono text-white">{car.production.assemblyPlants.join(', ')}</div>
          </div>
        </div>

        {/* Notable Facts */}
        <div className="p-6 rounded-xl bg-neutral-950 border border-white/10 space-y-2">
          <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-2">
            Historical Registry Notes
          </div>
          <ul className="space-y-2 text-xs font-mono text-neutral-300 list-disc list-inside">
            {car.production.notableFacts.map((fact, idx) => (
              <li key={idx} className="leading-relaxed">{fact}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* GALLERY STRIP */}
      {car.galleryImages.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2">
                Detailed Photography
              </div>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-wide uppercase">
                Exhibit Gallery
              </h2>
            </div>
            <button
              onClick={() => navigate('/gallery')}
              className="text-xs font-mono tracking-wider text-neutral-400 hover:text-white uppercase flex items-center space-x-1"
            >
              <span>View Full Visual Archive</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {car.galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden border border-white/10 group h-64"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#c02424] uppercase font-bold mr-2">[{img.category}]</span>
                  {img.caption}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED MUSTANGS */}
      {relatedCars.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
          <div className="mb-8">
            <div className="text-xs font-mono tracking-widest text-[#c02424] uppercase mb-2">
              Connected Lineage
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-wide uppercase">
              Related Mustangs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedCars.map((relCar) => (
              <div
                key={relCar.id}
                onClick={() => navigate(`/cars/${relCar.id}`)}
                className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-amber-400/50 cursor-pointer transition-all group"
              >
                <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                  <img
                    src={relCar.images.hero}
                    alt={relCar.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-amber-400">
                    {relCar.year}
                  </div>
                </div>
                <div className="text-xs font-mono text-[#c02424] font-semibold">{relCar.generation}</div>
                <h4 className="text-base font-editorial font-bold text-white group-hover:text-amber-400 transition-colors">
                  {relCar.name}
                </h4>
                <div className="mt-2 text-xs font-mono text-neutral-400 flex items-center justify-between">
                  <span>{relCar.dna.displacement}</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
