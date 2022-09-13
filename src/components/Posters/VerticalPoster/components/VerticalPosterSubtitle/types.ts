import { MediaType } from '../../../../../common/types';
import { VerticalPosterProps } from '../../types';

export type VerticalPosterSubtitleProps<MT extends MediaType> = Pick<VerticalPosterProps<MT>, 'subtitle'> & {
	inView: boolean;
};
