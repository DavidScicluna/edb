import { FullMovie } from '../../../../../../../../../../../common/types/movie';
import { ViewHeroCoverBackdropProps } from '../../../../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverBackdrop/types';

export type OverviewTabHeroBackdropProps = Pick<ViewHeroCoverBackdropProps, 'onClick'> & {
	movie: FullMovie;
};
