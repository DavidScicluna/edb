import { ReactElement } from 'react';

import { Color } from '../../../../../../../../theme/types';
import { UserReviewsProps } from '../../types';

export type Form = {
  review: string;
  rating: number | null;
};

type RenderProps = {
  color: keyof Color;
  label: string;
  onClick: () => void;
};

export type CreateReviewProps = {
  renderAction: (props: RenderProps) => ReactElement;
} & Omit<UserReviewsProps, 'alt' | 'isLoading'>;
