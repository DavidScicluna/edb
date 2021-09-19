import { Crew } from '../../../../../../common/types/movie';
import { DetailsProps } from '../../types';

export type Credit = {
  label: string;
  data: Crew[];
};

export type CreditsProps = {
  isLoading?: boolean;
} & Omit<
  DetailsProps,
  'renderCover' | 'tagline' | 'overview' | 'budget' | 'revenue' | 'languages' | 'originalLanguage' | 'isLoading'
>;
