import { FullMovie } from '../../../../../../../common/types/movie';
import { ViewPosterProps } from '../../../../../components/ViewPoster/types';

export type MoviePosterProps = Pick<ViewPosterProps, 'onClick'> & {
	movie?: FullMovie;
};
