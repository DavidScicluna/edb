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
	DummyCardHeaderProps,
	DummyTabListProps
} from '@davidscicluna/component-library';

import { StackProps } from '@chakra-ui/react';

import { DummyArrowsProps } from '../../../components/DummyArrows/types';

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

export type DummyHorizontalGridTabbedHeaderProps = Omit<StackProps, Omitted> & {
	dummyCardHeaderProps: DummyCardHeaderProps;
	dummyTabListProps: DummyTabListProps;
} & Pick<DummyArrowsProps, 'dummyArrowProps'>;
