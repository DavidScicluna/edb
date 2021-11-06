import { SeasonProps } from '../../types';

export type HeaderProps = {
  title?: string;
  date?: string;
  episodes?: number;
} & Omit<SeasonProps, 'tvId' | 'index' | 'season'>;
