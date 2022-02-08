import { ReactElement } from 'react';

import { MediaType, Icon, Genre, Certification } from '../../common/types';
import { Color } from '../../theme/types';

type FormDate = string | undefined;

export type Form = {
  date: [FormDate, FormDate];
  genres: Genre['id'][];
  certifications: Certification['certification'][];
  rating: number[];
  count: number[];
  runtime: number[];
  adult: boolean;
};

export type RenderButtonProps = {
  color: keyof Color;
  icon: Icon;
  onClick: () => void;
};

export type FiltersProps = {
  renderButton: (props: RenderButtonProps) => ReactElement;
  mediaType: Omit<MediaType, 'person' | 'collection' | 'company'>;
  onFilter: (filters: Form) => void;
};
