import { ReactNode } from 'react';

import { CardHeaderProps } from '@davidscicluna/component-library';

import { MediaType } from '../../../../../../../common/types';

export type Trending = {
	label: string;
	mediaType: MediaType;
	color: string;
};

export type SearchListProps = Omit<CardHeaderProps, 'renderTitle' | 'renderSubtitle'> & {
	children: ReactNode;
};
