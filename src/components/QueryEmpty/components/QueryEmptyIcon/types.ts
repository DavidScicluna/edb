import { ReactNode } from 'react';

import {
	BoxColor,
	BoxGradient,
	BoxTypography,
	BoxFlexbox,
	BoxGrid,
	BoxBackground,
	BoxBorders,
	BoxBorderRadius,
	BoxPosition,
	BoxShadow,
	BoxFilter,
	BoxPseudo,
	BoxOther
} from '@davidscicluna/component-library';

import { CenterProps } from '@chakra-ui/react';

import { QueryEmptyProps } from '../../types';

export type QueryEmptyIconVariant = 'contained' | 'outlined' | 'transparent';

export type RenderIconProps = Pick<QueryEmptyProps, 'colorMode'>;

type Omitted =
	| BoxColor
	| BoxGradient
	| BoxTypography
	| BoxFlexbox
	| BoxGrid
	| BoxBackground
	| BoxBorders
	| BoxBorderRadius
	| BoxPosition
	| BoxShadow
	| BoxFilter
	| BoxPseudo
	| BoxOther
	| 'children'
	| 'as';

export type QueryEmptyIconProps = Omit<CenterProps, Omitted> & {
	renderIcon: (props: RenderIconProps) => ReactNode;
	variant?: QueryEmptyIconVariant;
};
