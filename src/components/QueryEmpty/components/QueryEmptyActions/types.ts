import { ReactNode } from 'react';

import { BoxTypography, BoxFlexbox, BoxGrid, BoxPosition, BoxShadow, BoxOther } from '@davidscicluna/component-library';

import { StackProps } from '@chakra-ui/react';

import { QueryEmptyContext } from '../../types';

type Omitted =
	// CUI Box Props
	| BoxTypography
	| BoxFlexbox
	| BoxGrid
	| BoxPosition
	| BoxShadow
	| BoxOther
	// CUI Stack Props
	| 'as'
	| 'children'
	| 'direction';

export type QueryEmptyActionsProps = Omit<StackProps, Omitted> & {
	renderActions: (props: QueryEmptyContext) => ReactNode;
};
