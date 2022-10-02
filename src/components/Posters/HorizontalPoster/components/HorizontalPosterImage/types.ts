import { MediaType } from '../../../../../common/types';
import { HorizontalPosterProps } from '../../types';

export type HorizontalPosterImageProps<MT extends MediaType> = {
	inView: boolean;
} & Pick<HorizontalPosterProps<MT>, 'mediaItem' | 'mediaType' | 'image'>;
