import {
	BoxColor,
	BoxGradient,
	BoxTypography,
	BoxGrid,
	BoxShadow,
	BoxFilter,
	BoxPseudo,
	BoxOther,
	Color
} from '@davidscicluna/component-library';

import { ColorMode, StackProps } from '@chakra-ui/react';

export type QueryEmptyColor = Exclude<Color, 'transparent' | 'black' | 'white' | 'gray'>;

type Omitted = BoxColor | BoxGradient | BoxTypography | BoxGrid | BoxShadow | BoxFilter | BoxPseudo | BoxOther | 'as';

export type QueryEmptyProps = Omit<StackProps, Omitted> & {
	color?: QueryEmptyColor;
	colorMode?: ColorMode;
};

export type QueryEmptyContext = Pick<QueryEmptyProps, 'color' | 'colorMode'>;
