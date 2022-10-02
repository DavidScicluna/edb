import { MediaType } from '../../../../../common/types';
import { HorizontalPosterProps } from '../../types';

export type HorizontalPosterSubtitleProps<MT extends MediaType> = Pick<HorizontalPosterProps<MT>, 'subtitle'> & {
	inView: boolean;
};
