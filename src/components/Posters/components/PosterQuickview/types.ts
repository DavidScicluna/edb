import { IconButtonSize } from '@davidscicluna/component-library';

import { MediaType } from '../../../../common/types';
import { MediaItem } from '../../../../store/slices/Users/types';

export type PosterQuickviewProps<MT extends MediaType> = Pick<MediaItem<MT>, 'mediaItem' | 'mediaType'> & {
	title: string;
	size: IconButtonSize;
};
