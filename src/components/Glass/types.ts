import {
	BoxColor,
	BoxGradient,
	BoxTypography,
	BoxFlexbox,
	BoxGrid,
	BoxBackground,
	BoxBorders,
	BoxShadow,
	BoxFilter,
	BoxPseudo,
	BoxOther,
	Nullable
} from '@davidscicluna/component-library';

import { CenterProps } from '@chakra-ui/react';

type Omitted =
	| BoxColor
	| BoxGradient
	| BoxTypography
	| BoxFlexbox
	| BoxGrid
	| BoxBackground
	| BoxBorders
	| BoxShadow
	| BoxFilter
	| BoxPseudo
	| BoxOther;

export type GlassProps = Omit<CenterProps, Omitted>;

export type GlassRef = Nullable<HTMLDivElement>;
