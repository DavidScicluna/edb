import { ReactElement } from 'react';

import { MediaType } from '../../../common/types';
import { GetMediaType, List } from '../../../store/slices/Users/types';

type RenderProps = {
	lists?: List[];
	isDisabled: boolean;
	isBookmarked: boolean;
	onClick: () => void;
};

export interface BookmarkProps {
	renderAction: (props: RenderProps) => ReactElement;
	title: string;
	mediaType: MediaType;
	mediaItem?: GetMediaType<this['mediaType']>;
}
