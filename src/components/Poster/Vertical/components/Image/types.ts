import { MediaType } from '../../../../../common/types';
import { VerticalPosterProps } from '../../types';

export type PosterImageProps<MT extends MediaType> = {
	isHovering: boolean;
	inView: boolean;
	onMouseChange: (bool: boolean) => void;
} & Omit<VerticalPosterProps<MT>, 'width' | 'rating' | 'subtitle'>;
