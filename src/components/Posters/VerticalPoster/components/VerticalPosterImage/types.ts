import { MediaType } from '../../../../../common/types';
import { VerticalPosterProps } from '../../types';

export type VerticalPosterImageProps<MT extends MediaType> = {
	isFocused: boolean;
	isHovering: boolean;
	inView: boolean;
	onSetIsFixed: { on: () => void; off: () => void; toggle: () => void };
} & Pick<VerticalPosterProps<MT>, 'mediaItem' | 'mediaType' | 'title' | 'image'>;
