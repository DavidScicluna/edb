import { ReactElement } from 'react';

import { IconType, IconCategory } from '@davidscicluna/component-library';

import { MediaType } from '../../../common/types';
import { MediaItem } from '../../../store/slices/Users/types';

export type RenderProps = {
	iconType: IconType;
	iconCategory: IconCategory;
	isDisabled: boolean;
	isLiked: boolean;
	onClick: () => void;
};

export type LikeProps<MT extends MediaType> = Pick<MediaItem<MT>, 'mediaItem' | 'mediaType'> & {
	renderAction: (props: RenderProps) => ReactElement;
};
