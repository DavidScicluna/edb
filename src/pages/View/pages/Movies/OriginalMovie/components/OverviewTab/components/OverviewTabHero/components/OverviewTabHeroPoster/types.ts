import { FullMovie } from '../../../../../../../../../../../common/types/movie';
import { ViewHeroCoverPosterProps } from '../../../../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverPoster/types';

export type OverviewTabHeroPosterProps = Pick<ViewHeroCoverPosterProps, 'onClick'> & {
	movie?: FullMovie;
};
