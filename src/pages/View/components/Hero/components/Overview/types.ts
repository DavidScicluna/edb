import { HeroProps } from '../../types';

export type OverviewProps = Omit<HeroProps, 'renderPoster' | 'renderBackdrop' | 'renderDetails' | 'tagline'>;
