import { ViewHeroLabelProps } from '../ViewHeroLabel/types';

export type ViewHeroTaglineProps = Omit<ViewHeroLabelProps, 'label'> & { tagline: string };
