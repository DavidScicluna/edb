import { ReactElement } from 'react';

import { MediaType } from '../../../common/types';
import { GetMediaType } from '../../../store/slices/Users/types';

type RenderProps = {
	isDisabled: boolean;
	isLiked: boolean;
	onClick: () => void;
};

export interface LikeProps {
	renderAction: (props: RenderProps) => ReactElement;
	mediaType: MediaType;
	mediaItem?: GetMediaType<this['mediaType']>;
}
