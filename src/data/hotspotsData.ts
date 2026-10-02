import { HotspotItem } from '../types';

export const HOTSPOTS: HotspotItem[] = [
  {
    id: 'grille',
    title: 'Front Grille & Quad Lamps',
    category: 'exterior',
    position: [0, 0.45, 2.35],
    cameraPosition: [0.1, 0.55, 3.2],
    cameraTarget: [0, 0.45, 2.1],
    description: 'Distinctive 1969 4-headlamp deep-inset grille with the iconic galloping pony emblem set inside the chrome corral bar.',
    details: [
      'Twin outboard sealed-beam high/low lights paired with twin inboard driving lamps',
      'Matte black textured horizontal eggcrate grille mesh',
      'Aggressive forward rake providing 4% front downforce improvement'
    ],
    specs: [
      { label: 'Headlamp Type', value: 'Sealed Beam Quad Lamp System' },
      { label: 'Grille Material', value: 'Die-cast zinc & ABS composite' },
      { label: 'Emblem', value: 'Running Horse in Corral' }
    ]
  },
  {
    id: 'shaker',
    title: 'Functional Shaker Ram-Air Scoop',
    category: 'engine',
    position: [0, 0.85, 0.85],
    cameraPosition: [0.6, 1.35, 1.4],
    cameraTarget: [0, 0.8, 0.8],
    description: 'Mounted directly atop the 4-barrel carburetor through a cutout in the hood, visibly vibrating (shaking) under engine torque and throttle snap.',
    details: [
      'Vacuum-actuated air flap opens under heavy acceleration to channel cool outside air',
      'Cast aluminum scoop finished in anti-glare semi-gloss black',
      'Direct intake ducting increases volumetric efficiency at speed'
    ],
    specs: [
      { label: 'Induction Type', value: 'Ram Air Cold Intake Flap' },
      { label: 'Actuation', value: 'Engine Vacuum Diaphragm' },
      { label: 'Finish', value: 'Semi-Gloss Raven Black' }
    ]
  },
  {
    id: 'hood_pins',
    title: 'Competition Hood Pins & Matte Black Cowl',
    category: 'exterior',
    position: [-0.65, 0.78, 1.6],
    cameraPosition: [-1.2, 1.1, 2.1],
    cameraTarget: [-0.6, 0.75, 1.5],
    description: 'Functional competition-style twist-latch hood pins with stainless steel lanyard cables, securing the lengthened hood at high speeds.',
    details: [
      'Authentic competition quick-release positive retention lock mechanism',
      'Protective vinyl-sheathed stainless lanyards fastened to core support',
      'Non-reflective matte black center hood paint reduces glare into driver vision'
    ],
    specs: [
      { label: 'Hardware', value: 'Chrome Twist-Lock & Steel Cable' },
      { label: 'Paint Code', value: 'Textured Flat Black Treatment' }
    ]
  },
  {
    id: 'wheels',
    title: 'Magnum 500 Chrome Styled Steel Wheels',
    category: 'chassis',
    position: [0.95, 0.15, 1.35],
    cameraPosition: [1.8, 0.35, 1.5],
    cameraTarget: [0.9, 0.15, 1.35],
    description: 'Staggered 14x7-inch Magnum 500 five-spoke wheels with deep chrome dish and satin black recessed cutouts, wrapped in Goodyear Polyglas tires.',
    details: [
      'Stamped steel welded construction with brilliant triple chrome plate',
      'Classic red crest center cap with Ford pony emblem',
      'F70-14 Goodyear Polyglas wide-tread bias-belted construction with raised white lettering'
    ],
    specs: [
      { label: 'Wheel Dimension', value: '14 x 7 Stamped Steel' },
      { label: 'Bolt Pattern', value: '5 x 4.5 in (114.3 mm)' },
      { label: 'Tire Model', value: 'Goodyear Polyglas F70-14' }
    ]
  },
  {
    id: 'badging',
    title: 'Mach 1 Reflective Accent Striping',
    category: 'exterior',
    position: [0.95, 0.55, -0.3],
    cameraPosition: [1.6, 0.65, -0.2],
    cameraTarget: [0.9, 0.55, -0.3],
    description: 'Die-cut 3M reflective gold and orange side stripe wrapping around the fastback body crease with integrated die-cast Mach 1 script.',
    details: [
      'Illuminates brilliantly under oncoming headlamps at night',
      'Distinctive tapering tri-band aerodynamic graphic accentuating the rear haunches',
      'Die-cast zinc chrome scripts located on front fenders and rear tail valance'
    ],
    specs: [
      { label: 'Material', value: '3M Reflective Scotchlite' },
      { label: 'Colors', value: 'Gold / Orange Tri-Tone' }
    ]
  },
  {
    id: 'engine_bay',
    title: '428ci Cobra Jet FE Big-Block V8',
    category: 'engine',
    position: [0, 0.55, 1.05],
    cameraPosition: [0.5, 1.25, 1.6],
    cameraTarget: [0, 0.45, 1.0],
    description: 'The legendary FE-series 7.0-liter powerplant engineered by Ford to dominate NHRA Super Stock drag racing and NASCAR.',
    details: [
      '4.132-inch bore and 3.984-inch stroke with nodular iron crankshaft',
      'High-velocity 427 low-riser cast iron cylinder heads with 2.09 intake valves',
 'Factory rated at 335 HP at 5,200 RPM; actual dyno output exceeded 410 HP'
 ],
 specs: [
 { label: 'Displacement', value: '428 cu in (7,014 cc)' },
 { label: 'Compression Ratio', value: '10.6 : 1' },
 { label: 'Carburetor', value: 'Holley 735 CFM 4-Barrel' }
 ]
 },
 {
 id: 'cockpit',
 title: 'Deluxe Interior & Rim-Blow Steering',
 category: 'interior',
 position: [-0.35, 0.65, 0.05],
 cameraPosition: [-0.7, 0.85, 0.2],
 cameraTarget: [-0.2, 0.6, -0.1],
 description: 'Deluxe interior group featuring Teak wood-grained appliques, twin-cowl dashboard, clock, and the tactile 3-spoke Rim-Blow wheel.',
 details: [
 'Horn is sounded by squeezing the flexible inner rubber rim anywhere along 360 degrees',
 'High-back bucket seats trimmed in breathable knitted vinyl with red racing accent stripe',
 'Hurst competition T-handle shifter connected to heavy-duty Toploader 4-speed'
 ],
 specs: [
 { label: 'Steering Wheel', value: '3-Spoke Rim-Blow Woodgrain' },
 { label: 'Seat Material', value: 'Corinthian Knitted Vinyl' },
 { label: 'Instrumentation', value: 'Speedometer, Tachometer, Ammeter, Fuel' }
 ]
 },
 {
 id: 'exhaust',
 title: 'Dual Exhaust with Quad Chrome Trumpet Tips',
 category: 'exterior',
 position: [0.45, 0.15, -2.35],
 cameraPosition: [0.8, 0.3, -2.8],
 cameraTarget: [0.35, 0.15, -2.25],
 description: 'True dual 2.25-inch mandrel-bent aluminized steel exhaust pipes exiting through cutouts in the rear valance with rolled chrome tips.',
 details: [
 'Low-restriction reverse-flow mufflers producing deep resonant muscle car idle',
 'Interconnected H-pipe crossover equalizing exhaust backpressure pulses',
 'Chrome rolled-edge twin tips flared for acoustic projection'
 ],
 specs: [
 { label: 'Diameter', value: '2.25 in (57 mm) Dual Mandrel' },
 { label: 'Configuration', value: 'H-Pipe Equalized Dual System' },
 { label: 'Tips', value: 'Quad Rolled-Edge Bright Chrome' }
 ]
 },
 {
 id: 'louvers_spoiler',
 title: 'Sport Roof Louvers & Adjustable Rear Wing',
 category: 'exterior',
 position: [0, 0.95, -1.55],
 cameraPosition: [-0.9, 1.25, -2.1],
 cameraTarget: [0, 0.85, -1.4],
 description: 'Black textured Sport Slats window louvers on the steeply raked 14-degree fastback rear glass with an adjustable pedestal decklid wing.',
 details: [
 'Hinged aluminum louvers keep interior cabin cool while preserving rearward sightlines',
 'Pedestal-mounted fiberglass rear decklid spoiler adjustable in angle for aerodynamic downforce',
 'Concave tail panel finished in low-gloss matte black to highlight triple vertical taillights'
 ],
 specs: [
 { label: 'Louver Material', value: 'Extruded Aircraft Aluminum' },
 { label: 'Rear Spoiler', value: 'Adjustable Pedestal Wing' },
 { label: 'Fastback Angle', value: '14-Degree Aerodynamic Slope' }
 ]
 }
];
