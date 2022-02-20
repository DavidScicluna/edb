import { ReactElement } from 'react';

import { MediaType } from '../../../../common/types';

export type RenderProps = {
	color: string;
	fontSize: 'xs' | 'sm' | '2xl' | '3xl';
	fontWeight: string;
};

export type TitleProps = {
	mediaType: Omit<MediaType, 'company'>;
	renderTitle: (props: RenderProps) => ReactElement;
	renderSubtitles?: (props: Omit<RenderProps, 'fontWeight'>) => ReactElement[];
	isLoading: boolean;
};
