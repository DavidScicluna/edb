import { FullTV } from '../../../../../../../../../../../common/types/tv';
import { ViewHeroCoverPosterProps } from '../../../../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverPoster/types';

export type OverviewTabHeroPosterProps = Pick<ViewHeroCoverPosterProps, 'onClick'> & {
	show?: FullTV;
};
