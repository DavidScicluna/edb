import {
	BoxColor,
	BoxGradient,
	BoxTypography,
	BoxLayout,
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

import { StackProps } from '@chakra-ui/react';

type Omitted =
	| BoxColor
	| BoxGradient
	| BoxTypography
	| BoxLayout
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
	| 'as'
	| 'direction';

export type ViewActionsProps = Omit<StackProps, Omitted>;
