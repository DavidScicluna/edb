import { QuickViewModalPosterProps } from '../../../QuickViewModalPoster/types';
import { CommonQuickViewModalMovieProps } from '../../common/types';

export type QuickViewModalMoviePosterProps = Pick<QuickViewModalPosterProps, 'onClick'> &
	CommonQuickViewModalMovieProps;
