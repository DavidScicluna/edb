import { ReactElement } from 'react';

import { IconCategory, IconType } from '@davidscicluna/component-library';

import { MediaType } from '../../../common/types';
import { MediaItem } from '../../../store/slices/Users/types';

type RenderActionProps = {
	iconType: IconType;
	iconCategory: IconCategory;
	isDisabled: boolean;
	isBookmarked: boolean;
	isBookmarkedMultiple: boolean;
	onClick: () => void;
};

export type BookmarkProps<MT extends MediaType> = Pick<MediaItem<MT>, 'mediaItem' | 'mediaType'> & {
	renderAction: (props: RenderActionProps) => ReactElement;
	title: string;
	isFocused?: boolean;
	isHovering?: boolean;
};
