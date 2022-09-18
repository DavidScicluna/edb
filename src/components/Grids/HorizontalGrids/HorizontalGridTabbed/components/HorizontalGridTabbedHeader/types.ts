import {
	BoxMargin,
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
	BoxOther,
	CardHeaderProps,
	TabListProps
} from '@davidscicluna/component-library';

import { StackProps } from '@chakra-ui/react';

import { ArrowsProps } from '../../../components/Arrows/types';

type Omitted =
	| BoxMargin
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
	| 'children'
	| 'direction';

export type HorizontalGridTabbedHeaderProps = Omit<StackProps, Omitted> & {
	cardHeaderProps: CardHeaderProps;
	tabListProps: TabListProps;
} & Pick<ArrowsProps, 'iconButtonProps'>;
