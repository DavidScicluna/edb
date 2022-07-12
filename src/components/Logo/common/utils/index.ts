import { FontSize, Radius } from '@davidscicluna/component-library';

import { memoize } from 'lodash';

import { LogoSize } from '../../types';
import { size as defaultSize } from '../data/defaultPropValues';

type GetSizeConfigReturn = {
	width: number; // In Pixels
	height: number; // In Pixels
	fontSize: FontSize; // In FontSize (Theme) Values
	radius: Radius; // In Radius (Theme) Values
	border: number; // In Pixels
	offset: number; // In Pixels
	// lineHeight: number; // In Pixels
};

type GetSizeConfigProps = { size: LogoSize };

export const getSizeConfig = memoize(({ size = defaultSize }: GetSizeConfigProps): GetSizeConfigReturn => {
	switch (size) {
		case 'xs':
			return {
				width: 40,
				height: 30,
				fontSize: 'md',
				radius: 'xs',
				border: 1,
				offset: 2
				// lineHeight: ,
			};
		case 'sm':
			return {
				width: 70,
				height: 36,
				fontSize: 'xl',
				radius: 'xs',
				border: 1,
				offset: 2
				// lineHeight: ,
			};
		case 'lg':
			return {
				width: 130,
				height: 50,
				fontSize: '5xl',
				radius: 'lg',
				border: 2,
				offset: 4
				// lineHeight: ,
			};
		case 'xl':
			return {
				width: 160,
				height: 60,
				fontSize: '7xl',
				radius: 'lg',
				border: 2,
				offset: 4
				// lineHeight: ,
			};
		default:
			return {
				width: 100,
				height: 42,
				fontSize: '3xl',
				radius: 'base',
				border: 2,
				offset: 4
				// lineHeight: ,
			};
	}
});

type GetAmountReturn = {
	hover: number;
	active: number;
};

export const getAmount = (): GetAmountReturn => {
	return {
		hover: 0.05,
		active: 0.1
	};
};
