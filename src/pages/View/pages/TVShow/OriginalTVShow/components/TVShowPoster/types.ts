import { FullTV } from '../../../../../../../common/types/tv';
import { ViewPosterProps } from '../../../../../components/ViewPoster/types';

export type TVShowPosterProps = Pick<ViewPosterProps, 'onClick'> & {
	show?: FullTV;
};
