import React from 'react';
import { useArchiveRouter } from '../../hooks/useArchiveRouter';
import { RACING_EVENTS } from '../../data/racingData';
import { MUSTANG_CARS } from '../../data/mustangCars';
import { 
  ArrowLeft, 
  ArrowRight, 
  Trophy, 
  Flag, 
  Timer, 
  Car, 
  User, 
  Users, 
  Compass, 
  CheckCircle2, 
  Zap, 
  Clock 
} from 'lucide-react';

interface RacingDetailPageProps {
  eventId?: string;
}

export function RacingDetailPage({ eventId }: RacingDetailPageProps) {
  const { navigate } = useArchiveRouter();

  const effectiveId = eventId || '1969-trans-am-laguna-seca';
  const race = RACING_EVENTS.find((r) => r.id === effectiveId) || RACING_EVENTS[0];

  const associatedCar = MUSTANG_CARS.find((c) => c.id === race.mustang.carId);

  return (
    <div className="bg-[#080808] text-white pt-24 pb-32">
      {/* Top Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-white/10 text-xs font-mono text-neutral-400">
        <button
          onClick={() => navigate('/racing')}
          className="hover:text-white flex items-center space-x-2 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>BACK TO RACING ARCHIVE</span>
        </button>

        <div className="flex items-center space-x-2">
          <span>MOTORSPORT</span>
          <span>/</span>
          <span className="text-[#c02424] font-bold">{race.year}</span>
          <span>/</span>
          <span className="text-white">{race.circuit}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-[#c02424] font-bold uppercase bg-red-950/40 border border-red-500/20 px-2.5 py-1 rounded">
                {race.series}
              </span>
              <span className="text-xs font-mono text-neutral-400">{race.date}</span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs font-mono text-amber-400">{race.location}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-editorial font-bold text-white tracking-wide uppercase leading-tight">
              {race.name}
            </h1>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-neutral-300">
              <span>Circuit: <strong className="text-white">{race.circuit}</strong></span>
              <span>•</span>
              <span>Winning Driver: <strong className="text-amber-400">{race.driver.name}</strong></span>
              <span>•</span>
              <span>Car: <strong className="text-white">{race.mustang.carNumber}</strong></span>
            </div>
          </div>

          {/* Lead Race Photography */}
          <div className="mt-10 rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative">
            <img
              src={race.heroImage}
              alt={race.name}
              className="w-full h-[400px] sm:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-neutral-300">
              <span>Archival Track Record: {race.circuit}</span>
              <span className="text-amber-400 font-bold">{race.results.finishPosition}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-24">
        {/* RACE BASICS GRID */}
        <section>
          <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2 flex items-center space-x-2">
            <Timer size={14} />
            <span>Telemetry & Conditions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-wide uppercase mb-6">
            Race Basics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Event Name', val: race.name },
              { label: 'Official Date', val: race.date },
              { label: 'Circuit & Course', val: race.circuit },
              { label: 'Host Country', val: race.country },
              { label: 'Sanctioning Body', val: race.series },
              { label: 'Championship Round', val: race.championship },
              { label: 'Race Distance', val: race.distance },
              { label: 'Track Conditions', val: race.conditions },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-neutral-900/60 border border-white/10">
                <div className="text-[10px] font-mono text-neutral-400 uppercase">{item.label}</div>
                <div className="text-xs font-mono font-bold text-white mt-1">{item.val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* THE MUSTANG & RACE MODIFICATIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 rounded-2xl bg-neutral-900/50 border border-white/10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#c02424] tracking-widest uppercase">
              <Car size={14} />
              <span>Homologated Machinery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
              The Mustang: {race.mustang.model}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded bg-black/40 border border-white/5">
                <div className="text-neutral-400 text-[10px]">LIVERY NUMBER</div>
                <div className="text-amber-400 font-bold">{race.mustang.carNumber}</div>
              </div>
              <div className="p-3 rounded bg-black/40 border border-white/5">
                <div className="text-neutral-400 text-[10px]">ENGINE SPEC</div>
                <div className="text-white font-bold">{race.mustang.engine.split('(')[0]}</div>
              </div>
              <div className="p-3 rounded bg-black/40 border border-white/5">
                <div className="text-neutral-400 text-[10px]">OUTPUT</div>
                <div className="text-white font-bold">{race.mustang.power}</div>
              </div>
              <div className="p-3 rounded bg-black/40 border border-white/5">
                <div className="text-neutral-400 text-[10px]">DRY WEIGHT</div>
                <div className="text-white font-bold">{race.mustang.weight}</div>
              </div>
              <div className="p-3 rounded bg-black/40 border border-white/5">
                <div className="text-neutral-400 text-[10px]">TRANSMISSION</div>
                <div className="text-white font-bold">{race.mustang.transmission.split('with')[0]}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Skunkworks Racing Modifications:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
                {race.mustang.racingModifications.map((mod, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#c02424] mt-0.5">•</span>
                    <span>{mod}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link to explore the base production car */}
            <div className="pt-4">
              <button
                onClick={() => navigate(`/cars/${race.mustang.carId}`)}
                className="inline-flex items-center space-x-3 px-6 py-3 rounded bg-[#c02424] hover:bg-[#a31c1c] text-white font-mono text-xs tracking-widest uppercase font-semibold transition-all shadow-lg"
              >
                <span>EXPLORE THIS MUSTANG IN THE ARCHIVE</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <img
              src="https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1200&auto=format&fit=crop"
              alt="Mustang Race Car"
              className="rounded-xl border border-white/10 w-full object-cover shadow-2xl"
            />
          </div>
        </section>

        {/* DRIVER & TEAM PROFILES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Driver Card */}
          <div className="p-6 rounded-xl bg-neutral-900/60 border border-white/10 space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={race.driver.image}
                alt={race.driver.name}
                className="w-16 h-16 rounded-full object-cover border border-amber-400/40"
              />
              <div>
                <div className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                  Primary Pilot
                </div>
                <h3 className="text-xl font-editorial font-bold text-white">
                  {race.driver.name}
                </h3>
                <div className="text-xs font-mono text-neutral-400">
                  {race.driver.nationality}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed font-light">
              {race.driver.background}
            </p>

            <div className="pt-3 border-t border-white/5 space-y-1 text-xs font-mono text-neutral-400">
              <div>Starting Grid: <span className="text-white">{race.driver.startingPosition}</span></div>
              <div>Official Result: <span className="text-amber-400 font-bold">{race.driver.finishPosition}</span></div>
            </div>
          </div>

          {/* Team Card */}
          <div className="p-6 rounded-xl bg-neutral-900/60 border border-white/10 space-y-4">
            <div className="text-[10px] font-mono tracking-widest text-[#c02424] uppercase flex items-center space-x-1.5">
              <Users size={13} />
              <span>Works Racing Team</span>
            </div>

            <h3 className="text-xl font-editorial font-bold text-white">
              {race.team.name}
            </h3>

            <div className="text-xs font-mono text-amber-400 font-semibold">
              Team Principal: {race.team.teamPrincipal}
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed font-light">
              {race.team.notes}
            </p>

            <div className="pt-3 border-t border-white/5 space-y-1 text-xs font-mono text-neutral-400">
              <div className="text-[10px] uppercase">Key Operations Personnel:</div>
              <ul className="space-y-0.5 text-neutral-300">
                {race.team.keyMembers.map((m, i) => (
                  <li key={i}>• {m}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* THE RACE STORY (EDITORIAL MULTI-ACT NARRATIVE) */}
        <section className="space-y-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#c02424] uppercase mb-2">
              Trackside Report
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white tracking-wide">
              The Race Story
            </h2>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-editorial font-bold text-amber-400 uppercase">
                Act I: Qualifying & The Front Row Duel
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed font-light">
                {race.raceStory.qualifying}
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-lg font-editorial font-bold text-white uppercase">
                Act II: Decisive On-Track Battles
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed font-light">
                {race.raceStory.battles}
              </p>
            </div>

            {/* Key Moments Chronology */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                Key Turning Points:
              </h3>
              <div className="space-y-2">
                {race.raceStory.keyMoments.map((moment, idx) => (
                  <div key={idx} className="p-3 rounded bg-black/40 border border-white/5 text-xs font-mono text-neutral-200">
                    {moment}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-lg font-editorial font-bold text-[#c02424] uppercase">
                Act III: The Checkered Flag & Triumph
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed font-light">
                {race.raceStory.finish}
              </p>
            </div>
          </div>
        </section>

        {/* RESULTS & RECORDS */}
        <section className="space-y-6">
          <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-2 flex items-center space-x-2">
            <Trophy size={14} />
            <span>Official Classification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white tracking-wide uppercase">
            Results & Records
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-neutral-900/60 border border-white/10">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Finish Position</div>
              <div className="text-base font-mono font-bold text-amber-400 mt-1">{race.results.finishPosition}</div>
            </div>
            <div className="p-4 rounded-lg bg-neutral-900/60 border border-white/10">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Total Race Time</div>
              <div className="text-xs font-mono font-bold text-white mt-1">{race.results.raceTime}</div>
            </div>
            <div className="p-4 rounded-lg bg-neutral-900/60 border border-white/10">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Fastest Lap</div>
              <div className="text-xs font-mono font-bold text-[#c02424] mt-1">{race.results.fastestLap}</div>
            </div>
            <div className="p-4 rounded-lg bg-neutral-900/60 border border-white/10">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Points Awarded</div>
              <div className="text-xs font-mono font-bold text-white mt-1">{race.results.championshipPoints}</div>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-neutral-950 border border-white/10">
            <div className="text-[10px] font-mono text-neutral-400 uppercase mb-2 font-bold">
              Records Broken During Event:
            </div>
            <ul className="space-y-1 text-xs font-mono text-neutral-300">
              {race.results.recordsBroken.map((rec, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <CheckCircle2 size={13} className="text-amber-400" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* WHY THIS RACE MATTERS */}
        <section className="p-8 rounded-2xl bg-gradient-to-r from-[#17171a] to-[#0d0d0f] border border-white/10 space-y-4">
          <div className="text-xs font-mono tracking-widest text-[#c02424] uppercase font-semibold">
            Historical Significance
          </div>
          <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white">
            Why This Race Matters
          </h3>
          <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed font-light">
            {race.whyThisRaceMatters}
          </p>
        </section>

        {/* CONNECTED HISTORY LINKS */}
        <section className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <button
            onClick={() => navigate(`/cars/${race.mustang.carId}`)}
            className="inline-flex items-center space-x-2 text-amber-400 hover:text-white"
          >
            <span>← Explore Associated Road Car ({race.mustang.carId})</span>
          </button>

          <button
            onClick={() => navigate('/racing')}
            className="inline-flex items-center space-x-2 text-neutral-400 hover:text-white"
          >
            <span>Return to Racing Hub →</span>
          </button>
        </section>
      </div>
    </div>
  );
}
