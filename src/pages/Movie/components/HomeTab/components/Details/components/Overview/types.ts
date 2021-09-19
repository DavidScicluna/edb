import { DetailsProps } from '../../types';

export type OverviewProps = {
  isLoading?: boolean;
} & Omit<
  DetailsProps,
  | 'renderCover'
  | 'tagline'
  | 'directors'
  | 'executiveProducer'
  | 'producers'
  | 'writers'
  | 'budget'
  | 'revenue'
  | 'languages'
  | 'originalLanguage'
  | 'isLoading'
>;
