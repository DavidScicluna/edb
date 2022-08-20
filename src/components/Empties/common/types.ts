import { ReactNode } from 'react';

import {
	BoxColor,
	BoxGradient,
	BoxTypography,
	BoxGrid,
	BoxShadow,
	BoxFilter,
	BoxPseudo,
	BoxOther
} from '@davidscicluna/component-library';

import { ColorMode, StackProps, TextProps } from '@chakra-ui/react';

type RenderActionProps = Pick<CommonEmptyProps, 'colorMode'>;

type Omitted =
	| BoxColor
	| BoxGradient
	| BoxTypography
	| BoxGrid
	| BoxShadow
	| BoxFilter
	| BoxPseudo
	| BoxOther
	| 'children'
	| 'as';

export type CommonEmptyProps = Omit<StackProps, Omitted> & {
	colorMode?: ColorMode;
	renderTitle: (props: TextProps) => ReactNode;
	renderDescription?: (props: TextProps) => ReactNode;
	renderAction?: (props: RenderActionProps) => ReactNode;
};
