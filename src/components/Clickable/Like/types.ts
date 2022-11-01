import { ReactElement } from 'react';

import { IconType, IconCategory, Style } from '@davidscicluna/component-library';

import { MediaType } from '../../../common/types';
import { MediaItem } from '../../../store/slices/Users/types';

export type RenderActionProps = {
	iconType: IconType;
	iconCategory: IconCategory;
	isDisabled: boolean;
	isLiked: boolean;
	onClick: () => void;
	sx: Style;
};

export type LikeProps<MT extends MediaType> = Pick<MediaItem<MT>, 'mediaItem' | 'mediaType'> & {
	renderAction: (props: RenderActionProps) => ReactElement;
	title: string;
};
