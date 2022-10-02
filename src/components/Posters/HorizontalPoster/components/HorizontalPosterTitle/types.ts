import { MediaType } from '../../../../../common/types';
import { HorizontalPosterProps } from '../../types';

export type HorizontalPosterTitleProps<MT extends MediaType> = Pick<HorizontalPosterProps<MT>, 'title'> & {
	inView: boolean;
};
