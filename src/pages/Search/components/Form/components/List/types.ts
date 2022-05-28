import { ReactElement } from 'react';

import { CardHeaderProps } from '@davidscicluna/component-library';

import { MediaType } from '../../../../../../common/types';

export type Ref = HTMLDivElement | null;

export type Trending = {
	label: string;
	mediaType: MediaType;
	color: string;
};

export type ListProps = {
	children: ReactElement;
} & CardHeaderProps;
