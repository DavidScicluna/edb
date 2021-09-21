import { Review } from '../../../../../../common/types/movie';

export type ReviewProps = {
  isLoading?: boolean;
} & Partial<Review>;
