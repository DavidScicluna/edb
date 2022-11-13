import {
	BoxMargin,
	BoxPadding,
	BoxColor,
	BoxGradient,
	BoxTypography,
	BoxFlexbox,
	BoxGrid,
	BoxBackground,
	BoxBorders,
	BoxBorderRadius,
	BoxShadow,
	BoxFilter,
	BoxPseudo,
	BoxOther
} from '@davidscicluna/component-library';

import { BoxProps } from '@chakra-ui/react';

export type IllustrationIndex = 1 | 2 | 3 | 4 | 5 | 6;
export type IllustrationIndexes = IllustrationIndex[];

type Omitted =
	| BoxMargin
	| BoxPadding
	| BoxColor
	| BoxGradient
	| BoxTypography
	| BoxFlexbox
	| BoxGrid
	| BoxBackground
	| BoxBorders
	| BoxBorderRadius
	| BoxShadow
	| BoxFilter
	| BoxPseudo
	| BoxOther
	| 'as'
	| 'children';

export type IllustrationProps = Omit<BoxProps, Omitted>;
