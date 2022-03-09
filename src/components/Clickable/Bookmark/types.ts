import { ReactElement } from 'react';

import { MediaType } from '../../../common/types';
import { GetMediaType, List } from '../../../store/slices/Users/types';

type RenderButtonProps = {
	lists?: List[];
	isBookmarked: boolean;
	onClick: () => void;
};

export interface BookmarkProps {
	renderButton: (props: RenderButtonProps) => ReactElement;
	title: string;
	mediaType: MediaType;
	mediaItem?: GetMediaType<this['mediaType']>;
}
