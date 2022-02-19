import { ReactElement } from 'react';

import { Header } from '../../../Panel/types';
import { HorizontalGridProps } from '../types';

export type HorizontalGridDefaultProps = {
	children: ReactElement | ReactElement[];
	title: Header['title'];
} & HorizontalGridProps;
