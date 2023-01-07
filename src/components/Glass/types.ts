import {
	Nullable,
	Space,
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
	BoxOther
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
	| BoxOther
	| 'backdropFilter';

export type GlassProps = Omit<CenterProps, Omitted> & {
	size?: Space;
};

export type GlassRef = Nullable<HTMLDivElement>;
