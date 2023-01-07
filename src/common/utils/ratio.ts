import { memoize } from 'lodash';

export type Orientation = 'landscape' | 'portrait' | 'square';

type GetOrientationByRatioProps = { width: number; height: number };

export const getOrientationByRatio = memoize(({ width, height }: GetOrientationByRatioProps): Orientation => {
	if (width > height) {
		return 'landscape';
	} else if (width < height) {
		return 'portrait';
	} else {
		return 'square';
	}
});

type GetRatioProps = { orientation: Orientation };

export const getRatio = memoize(({ orientation }: GetRatioProps): number => {
	switch (orientation) {
		case 'landscape':
			// return 1.78; // 178 / 100
			return 178 / 100;
		case 'portrait':
			// return 0.67;
			return 67 / 100;
		case 'square':
			return 1;
	}
});

type GetRatioDimensions = GetRatioProps & { width?: number; height?: number };

export const getRatioDimensions = memoize(({ width, height, orientation }: GetRatioDimensions): number => {
	if (width) {
		return parseFloat((width / getRatio({ orientation })).toFixed(2));
	} else if (height) {
		return parseFloat((height * getRatio({ orientation })).toFixed(2));
	} else {
		return 0;
	}
});
