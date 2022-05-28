import { IconButtonSize } from '@davidscicluna/component-library';

import { MediaType } from '../../../../common/types';
import { MediaItem } from '../../../../store/slices/Users/types';

export type PosterLikeProps<MT extends MediaType> = {
	mediaItem?: MediaItem<MT>;
	mediaType: MediaType;
	title: string;
	isLoading: boolean;
	size: IconButtonSize;
};
