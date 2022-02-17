import { ReactElement } from 'react';

import { MediaType } from '../../../common/types';
import { GetMediaType } from '../../../store/slices/User/types';

type RenderButtonProps = {
	isLiked: boolean;
	onClick: () => void;
};

export interface LikeProps {
	renderButton: (props: RenderButtonProps) => ReactElement;
	mediaType: MediaType;
	mediaItem?: GetMediaType<this['mediaType']>;
}
