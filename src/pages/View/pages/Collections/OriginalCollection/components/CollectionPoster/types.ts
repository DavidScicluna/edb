import { Collection } from '../../../../../../../common/types/movie';
import { ViewPosterProps } from '../../../../../components/ViewPoster/types';

export type CollectionPosterProps = Omit<ViewPosterProps, 'alt' | 'src'> & {
	collection?: Collection;
};
