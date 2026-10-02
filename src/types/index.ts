export type SectionId = 
  | 'garage'
  | 'hero'
  | 'walkaround'
  | 'explorer360'
  | 'hotspots'
  | 'exploded'
  | 'engine'
  | 'interior'
  | 'drive'
  | 'performance'
  | 'details'
  | 'history'
  | 'reassembly'
  | 'finalReveal';

export interface SectionConfig {
  id: SectionId;
  index: number;
  numberStr: string;
  title: string;
  subtitle: string;
  navLabel: string;
  description: string;
}

export interface HotspotItem {
  id: string;
  title: string;
  category: 'exterior' | 'interior' | 'engine' | 'chassis';
  position: [number, number, number];
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  description: string;
  details: string[];
  specs: { label: string; value: string }[];
}

export interface EngineComponent {
  id: string;
  name: string;
  subtitle: string;
  position: [number, number, number];
  description: string;
  specs: { label: string; value: string }[];
}

export interface SpecificationItem {
  key: string;
  label: string;
  value: string;
  numericTarget?: number;
  unit?: string;
  subtext: string;
  category: 'powertrain' | 'chassis' | 'dimensions' | 'drivetrain';
}

export interface HistoryTimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  milestone: string;
  impact: string;
}

export interface CameraFrame {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}
