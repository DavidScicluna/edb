import { MediaType, Response, Review } from '../../../../common/types';
import { FullMovie } from '../../../../common/types/movie';
import { FullTV } from '../../../../common/types/tv';

type ReviewMediaItem = Partial<FullMovie & FullTV>;

export type ReviewsTabProps = {
  mediaItem?: ReviewMediaItem;
  mediaType: Omit<MediaType, 'person'>;
  reviews?: Response<Review[]>;
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  hasNextPage?: boolean;
  onFetchNextPage: () => void;
};
