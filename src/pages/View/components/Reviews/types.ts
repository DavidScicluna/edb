import { MediaType, Response, Review } from '../../../../common/types';
import { FullMovie } from '../../../../common/types/movie';
import { FullTV } from '../../../../common/types/tv';

export type ReviewsTabProps = {
  alt?: string;
  mediaItem?: FullMovie | FullTV;
  mediaType: Omit<MediaType, 'person' | 'company' | 'collection'>;
  reviews?: Response<Review[]>;
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  hasNextPage?: boolean;
  onFetchNextPage: () => void;
};
