import { SpecificationItem } from '../types';

export const SPECIFICATIONS: SpecificationItem[] = [
  {
    key: 'displacement',
    label: 'DISPLACEMENT',
    value: '428 cu in / 7.0 L',
    numericTarget: 428,
    unit: 'cu in',
    subtext: 'Cast-iron FE big-block, 4.13 bore x 3.98 stroke',
    category: 'powertrain'
  },
  {
    key: 'horsepower',
    label: 'HORSEPOWER',
    value: '335 bhp @ 5,200 RPM',
    numericTarget: 335,
    unit: 'BHP',
    subtext: 'Factory rating (true dynamometer output: 410+ HP)',
    category: 'powertrain'
  },
  {
    key: 'torque',
    label: 'PEAK TORQUE',
    value: '440 lb-ft @ 3,400 RPM',
    numericTarget: 440,
    unit: 'lb-ft',
    subtext: 'Devastating low-end grunt through heavy nodular crankshaft',
    category: 'powertrain'
  },
  {
    key: 'acceleration',
    label: '0 - 60 MPH',
    value: '5.5 SECONDS',
    numericTarget: 5.5,
    unit: 'SEC',
    subtext: 'Quarter-mile in 13.9 seconds at 103.3 mph (Car and Driver, 1969)',
    category: 'powertrain'
  },
  {
    key: 'transmission',
    label: 'TRANSMISSION',
    value: 'Toploader 4-Speed Manual',
    subtext: 'Close-ratio cast-iron casing with Hurst competition linkage',
    category: 'drivetrain'
  },
  {
    key: 'differential',
    label: 'REAR AXLE',
    value: '9-Inch Traction-Lok (3.50:1)',
    subtext: 'Limited-slip differential with 31-spline heavy-duty axles',
    category: 'drivetrain'
  },
  {
    key: 'weight',
    label: 'CURB WEIGHT',
    value: '3,607 LBS / 1,636 KG',
    numericTarget: 3607,
    unit: 'LBS',
    subtext: '56% front / 44% rear distribution with competition suspension',
    category: 'dimensions'
  },
  {
    key: 'length',
    label: 'OVERALL LENGTH',
    value: '187.4 IN / 4,760 MM',
    numericTarget: 187,
    unit: 'IN',
    subtext: '3.8 inches longer than 1968 model for enhanced high-speed stability',
    category: 'dimensions'
  },
  {
    key: 'wheelbase',
    label: 'WHEELBASE',
    value: '108.0 IN / 2,743 MM',
    numericTarget: 108,
    unit: 'IN',
    subtext: 'Track: 58.5 in front / 58.5 in rear wide-stance track width',
    category: 'dimensions'
  },
  {
    key: 'suspension',
    label: 'SUSPENSION',
    value: 'Competition Handling Package',
    subtext: 'Staggered rear shocks (reduces axle hop), heavy-duty front sway bar',
    category: 'chassis'
  },
  {
    key: 'brakes',
    label: 'BRAKING SYSTEM',
    value: '11.3-in Front Power Discs',
    subtext: 'Ventilated cast-iron front rotors with rear 10-in finned drums',
    category: 'chassis'
  },
  {
    key: 'wheels_tires',
    label: 'WHEELS & TIRES',
    value: '14x7 Magnum 500 / F70-14',
    subtext: 'Goodyear Polyglas bias-belted tires with raised white lettering',
    category: 'chassis'
  }
];
