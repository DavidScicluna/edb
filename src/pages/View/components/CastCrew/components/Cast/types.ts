import { MediaType } from '../../../../../../common/types/types';
import { Cast } from '../../types';

export type CastProps = {
  mediaType: Omit<MediaType, 'person'>;
  mediaItemTitle?: string;
  cast?: Cast;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
};
