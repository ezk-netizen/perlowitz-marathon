export const raceOptions = [
  { name: 'Marathon', distance: '26.2 mi', start: '7:00 AM', fee: '$95' },
  { name: 'Half Marathon', distance: '13.1 mi', start: '7:45 AM', fee: '$75' },
  { name: '10K', distance: '6.2 mi', start: '8:30 AM', fee: '$45' },
  { name: '5K', distance: '3.1 mi', start: '9:00 AM', fee: '$35' },
] as const;

export const highlights = [
  'Certified city course',
  'Aid stations every 2 miles',
  'Finisher medal and shirt',
  'Post-race food village',
];

export type RaceName = (typeof raceOptions)[number]['name'];
