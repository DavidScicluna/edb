import { IconButtonSize } from '@davidscicluna/component-library';

import { QuickViewModalMediaType } from '../../../../store/slices/Modals/types';
import { MediaItem } from '../../../../store/slices/Users/types';

type Picked = 'mediaItem' | 'mediaType';

export type PosterQuickviewProps<MT extends QuickViewModalMediaType> = Pick<MediaItem<MT>, Picked> & {
	title: string;
	size: IconButtonSize;
};
