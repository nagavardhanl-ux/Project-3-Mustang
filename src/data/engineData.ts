import { EngineComponent } from '../types';

export const ENGINE_COMPONENTS: EngineComponent[] = [
  {
    id: 'air_cleaner',
    name: 'Ram Air Cleaner Assembly',
    subtitle: 'Cold-Air Induction System',
    position: [0, 0.95, 1.05],
    description: 'Distinctive round chrome-topped air filter casing sealed with a high-density rubber gasket against the underside of the hood, feeding cold ambient air directly into the carburetor barrels.',
    specs: [
      { label: 'Filter Diameter', value: '14 Inches' },
      { label: 'Induction Style', value: 'Vacuum-actuated scoop flap' },
      { label: 'Seal Material', value: 'Molded Neoprene Rubber' }
    ]
  },
  {
    id: 'carburetor',
    name: 'Holley 735 CFM 4-Barrel',
    subtitle: 'Fuel Metering System',
    position: [0, 0.8, 1.05],
    description: 'Specific Holley model 4150 carburetor calibrated exclusively for the 428 Cobra Jet, featuring vacuum secondary throttle plates and down-leg boosters for instant throttle response.',
    specs: [
      { label: 'Flow Rate', value: '735 CFM' },
      { label: 'Barrels', value: '4-Barrel Down-Draft' },
      { label: 'Choke Type', value: 'Electric/Heat-Assisted' }
    ]
  },
  {
    id: 'block',
    name: 'Cast-Iron FE Engine Block',
    subtitle: '428 Cubic Inch Deep-Skirt Architecture',
    position: [0, 0.45, 1.05],
    description: 'Heavy-duty nodular cast-iron block with extra web reinforcement around main bearing bulkheads, finished in authentic Ford Corporate Engine Blue.',
    specs: [
      { label: 'Casting Code', value: 'C9VE / FE Series' },
      { label: 'Bore x Stroke', value: '4.132 in x 3.984 in' },
      { label: 'Main Bearings', value: '2-Bolt Cross-Bolted Bulkhead' }
    ]
  },
  {
    id: 'valves',
    name: '427 Low-Riser Cylinder Heads',
    subtitle: 'High-Velocity Breathing',
    position: [0.35, 0.65, 1.05],
    description: 'Large-port cylinder heads fitted with 2.09-inch intake valves and 1.65-inch exhaust valves, paired with stamped steel rocker arms and chrome valve covers.',
    specs: [
      { label: 'Intake Valve', value: '2.09 in (53.1 mm)' },
      { label: 'Exhaust Valve', value: '1.65 in (41.9 mm)' },
      { label: 'Combustion Chamber', value: '73.5 cc Volume' }
    ]
  },
  {
    id: 'cooling',
    name: 'Heavy-Duty 24 Brass Radiator',
 subtitle: 'Thermal Management Group',
 position: [0, 0.5, 1.95],
 description: 'Extra-capacity 3-row brass radiator with flex-blade engine fan and molded fiberglass fan shroud to manage the immense thermal loads of the 7.0-liter V8.',
 specs: [
 { label: 'Core Dimensions', value: '24 Wide, 3-Row Core' },
      { label: 'Fan Type', value: '7-Blade Temperature Clutch Fan' },
      { label: 'Coolant Capacity', value: '20.5 Quarts' }
    ]
  },
  {
    id: 'transmission',
    name: 'Toploader 4-Speed Manual',
    subtitle: 'Heavy-Duty Drivetrain',
    position: [0, 0.25, 0.15],
    description: 'All-synchronized cast-iron casing transmission, recognized by drag racers as one of the most indestructible manual transmissions ever built.',
    specs: [
      { label: 'Input Shaft', value: '1-3/8 in 10-Spline' },
      { label: 'First Gear Ratio', value: '2.32:1 (Close Ratio)' },
      { label: 'Casing', value: 'Cast-Iron Toploader' }
    ]
  }
];
