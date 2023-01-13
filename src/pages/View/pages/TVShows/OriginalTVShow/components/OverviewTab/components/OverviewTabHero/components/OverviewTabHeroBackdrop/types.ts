import { FullTV } from '../../../../../../../../../../../common/types/tv';
import { ViewHeroCoverBackdropProps } from '../../../../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverBackdrop/types';

export type OverviewTabHeroBackdropProps = Pick<ViewHeroCoverBackdropProps, 'onClick'> & {
	show?: FullTV;
};
