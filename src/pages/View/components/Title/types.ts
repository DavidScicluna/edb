import { ReactElement } from 'react';

import { MediaType } from '../../../../common/types';

export type RenderProps = {
	color: string;
	fontSize: 'xs' | 'sm' | '2xl' | '3xl';
	fontWeight: 'extrabold';
	lineHeight: 'normal';
};

export type TitleProps = {
	mediaType: Omit<MediaType, 'company'>;
	renderTitle: (props: RenderProps) => ReactElement;
	renderSubtitles?: (props: Omit<RenderProps, 'fontWeight' | 'lineHeight'>) => ReactElement[];
	isLoading: boolean;
};
