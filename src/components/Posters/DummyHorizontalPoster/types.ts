import { DummyCardProps } from '@davidscicluna/component-library';

import { MediaType } from '../../../common/types';
import { MediaItem } from '../../../store/slices/Users/types';

export type DummyHorizontalPosterProps<MT extends MediaType> = Omit<DummyCardProps, 'children'> & {
	hasSubtitle?: boolean;
	hasDescription?: boolean;
} & Pick<MediaItem<MT>, 'mediaType'>;
