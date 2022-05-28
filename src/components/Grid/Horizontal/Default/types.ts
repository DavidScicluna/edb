import { ReactElement } from 'react';

import { CardHeaderProps } from '@davidscicluna/component-library';

import { HorizontalGridProps } from '../types';

export type HorizontalGridDefaultProps = {
	children: ReactElement | ReactElement[];
	title: CardHeaderProps['title'];
} & HorizontalGridProps;
