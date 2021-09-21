import { ReactElement } from 'react';

import { DetailsProps } from '../../types';

export type List = {
  label: string;
  children?: ReactElement;
};

export type InfoProps = {
  isLoading?: boolean;
} & Omit<
  DetailsProps,
  'renderCover' | 'tagline' | 'overview' | 'directors' | 'executiveProducer' | 'producers' | 'writers' | 'isLoading'
>;
