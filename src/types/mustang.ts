export type MustangGeneration = 'Gen 1' | 'Gen 2' | 'Gen 3 (Fox)' | 'Gen 4 (SN95)' | 'Gen 5 (S197)' | 'Gen 6 (S550)' | 'Gen 7 (S650)';

export type MustangEra = '1960s' | '1970s' | '1980s' | '1990s' | '2000s' | '2010s' | '2020s';

export interface CarDNA {
  engine: string;
  displacement: string;
  horsepower: string;
  torque: string;
  transmission: string;
  topSpeed: string;
  acceleration0to60: string;
  bodyStyle: string;
  curbWeight: string;
  drivetrain: string;
  era: MustangEra;
}

export interface EngineOption {
  name: string;
  displacement: string;
  horsepower: string;
  torque: string;
  fuelSystem: string;
  compression: string;
  notable: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  code?: string;
  isPopular?: boolean;
}

export interface CarVariant {
  name: string;
  badge: string;
  engine: string;
  power: string;
  description: string;
  distinction: string;
}

export interface ProductionStats {
  totalBuilt: string;
  originalMSRP: string;
  assemblyPlants: string[];
  notableFacts: string[];
}

export interface RacingConnection {
  hasRacingHistory: boolean;
  eventId?: string;
  eventTitle?: string;
  carName?: string;
  racingClass?: string;
  summary: string;
  driver?: string;
}

export interface MustangCar {
  id: string;
  year: number;
  name: string;
  modelCode?: string;
  generation: MustangGeneration;
  era: MustangEra;
  tagline: string;
  heroImage: string;
  images: {
    hero: string;
    front34: string;
    rear34: string;
    side: string;
    interior: string;
    engine: string;
  };
  turntableImages?: string[];
  has3DModel?: boolean;
  accentColor: string;
  description: string;
  dna: CarDNA;
  story: {
    headline: string;
    summary: string;
    whyItMattered: string;
    historicalContext: string;
    whatChanged: string;
    enthusiastLegacy: string;
    pullQuote?: {
      quote: string;
      source: string;
    };
  };
  design: {
    headline: string;
    exterior: string;
    interior: string;
    bodyStyles: string[];
    keyDesignElements: string[];
  };
  engines: EngineOption[];
  colors: ColorSwatch[];
  variants: CarVariant[];
  production: ProductionStats;
  racingConnection?: RacingConnection;
  galleryImages: {
    url: string;
    category: 'exterior' | 'interior' | 'engine' | 'details' | 'historical';
    caption: string;
  }[];
  relatedCarIds: string[];
}

export interface RacingEvent {
  id: string;
  name: string;
  date: string;
  year: number;
  circuit: string;
  location: string;
  country: string;
  series: string;
  championship: string;
  distance: string;
  conditions: string;
  heroImage: string;
  mustang: {
    model: string;
    year: number;
    carNumber: string;
    engine: string;
    power: string;
    weight: string;
    transmission: string;
    racingModifications: string[];
    carId: string;
  };
  driver: {
    name: string;
    nationality: string;
    background: string;
    careerAchievements: string[];
    startingPosition: string;
    finishPosition: string;
    image: string;
  };
  team: {
    name: string;
    teamPrincipal: string;
    keyMembers: string[];
    image?: string;
    notes: string;
  };
  raceStory: {
    qualifying: string;
    startingPosition: string;
    keyMoments: string[];
    battles: string;
    strategy: string;
    finish: string;
  };
  results: {
    qualifyingResult: string;
    raceTime: string;
    fastestLap: string;
    finishPosition: string;
    championshipPoints: string;
    recordsBroken: string[];
  };
  gallery: {
    url: string;
    category: 'race' | 'car' | 'driver' | 'team' | 'circuit' | 'podium' | 'documents';
    caption: string;
  }[];
  whyThisRaceMatters: string;
  connectedHistory: {
    carId: string;
    driverId: string;
    relatedEventIds: string[];
    era: string;
  };
}

export interface Driver {
  id: string;
  name: string;
  nationality: string;
  activeYears: string;
  achievements: string[];
  signatureCars: string[];
  bio: string;
  image: string;
  victoriesCount: number;
}

export interface TimelineMilestone {
  id: string;
  year: number;
  model: string;
  generation: MustangGeneration;
  era: MustangEra;
  tagline: string;
  description: string;
  keyStat: string;
  image: string;
  badge: string;
  carId?: string;
  isMajorPivot?: boolean;
}

export interface HistoryChapter {
  id: string;
  number: number;
  era: string;
  title: string;
  subtitle: string;
  period: string;
  image: string;
  leadParagraph: string;
  body: string[];
  pullQuote?: {
    quote: string;
    author: string;
    title: string;
  };
  keyFacts: { label: string; value: string }[];
  relatedCarId?: string;
  relatedTimelineYear?: number;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  year: number;
  category: 'classic' | 'modern' | 'racing' | 'engines' | 'interiors' | 'concepts' | 'historical' | 'events' | 'details';
  url: string;
  caption: string;
  credit: string;
  carModel?: string;
  carId?: string;
}
