import { UserReviewProps } from '../../types';

export type CreateReviewProps = {
  mediaItem: UserReviewProps['mediaItem'];
  mediaType: UserReviewProps['mediaType'];
};

export type Form = {
  review: string;
  rating: number | null;
};
