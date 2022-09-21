import { DummyCardProps } from '@davidscicluna/component-library';

import { MediaType } from '../../../common/types';
import { MediaItem } from '../../../store/slices/Users/types';

export type DummyVerticalPosterProps<MT extends MediaType> = Omit<DummyCardProps, 'children'> & {
	hasSubtitle?: boolean;
} & Pick<MediaItem<MT>, 'mediaType'>;
