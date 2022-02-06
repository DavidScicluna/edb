import { HeroProps } from '../../types';

export type TaglineProps = Omit<HeroProps, 'renderPoster' | 'renderBackdrop' | 'renderDetails' | 'overview'>;
