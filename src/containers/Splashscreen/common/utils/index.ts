import { memoize, sample } from 'lodash';

import { SplashscreenColor } from '../../types';

const colors: SplashscreenColor[] = [
	'red',
	'pink',
	'purple',
	'deep_purple',
	'indigo',
	'blue',
	'light_blue',
	'cyan',
	'teal',
	'green',
	'light_green',
	'lime',
	'yellow',
	'orange',
	'deep_orange'
];

export type ColorLetter = 'colorE' | 'colorD' | 'colorB';
export type ColorLetters = Record<ColorLetter, SplashscreenColor>;

export const setColors = memoize(({ colorE, colorD, colorB }: ColorLetters): ColorLetters => {
	const filtered = colors.filter((c) => c !== colorE && c !== colorD && c !== colorB);
	let e: string = colorE;
	let d: string = colorD;
	let b: string = colorB;

	e = sample(filtered.filter((c) => c !== d && c !== b) || []) || '';
	d = sample(filtered.filter((c) => c !== e && c !== b) || []) || '';
	b = sample(filtered.filter((c) => c !== e && c !== d) || []) || '';

	return { colorE: e, colorD: d, colorB: b } as ColorLetters;
});
