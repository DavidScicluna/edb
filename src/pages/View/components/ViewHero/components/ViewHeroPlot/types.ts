import { ViewHeroLabelProps } from '../ViewHeroLabel/types';

export type ViewHeroPlotProps = Omit<ViewHeroLabelProps, 'label'> & { plot: string };
