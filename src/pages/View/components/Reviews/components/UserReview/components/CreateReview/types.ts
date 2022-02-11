import { ReactElement } from 'react';

import { Color } from '../../../../../../../../theme/types';
import { UserReviewProps } from '../../types';

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
} & Omit<UserReviewProps, 'alt' | 'isLoading'>;
