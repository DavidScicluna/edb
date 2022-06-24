import { ReactElement } from 'react';

import { IconType, IconCategory } from '@davidscicluna/component-library';

import { MediaType } from '../../../common/types';
import { GetMediaType } from '../../../store/slices/Users/types';

export type RenderProps = {
	iconType: IconType;
	iconCategory: IconCategory;
	isDisabled: boolean;
	isLiked: boolean;
	onClick: () => void;
};

export interface LikeProps {
	renderAction: (props: RenderProps) => ReactElement;
	mediaType: MediaType;
	mediaItem?: GetMediaType<this['mediaType']>;
}
