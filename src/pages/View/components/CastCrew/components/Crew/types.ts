import { MediaType } from '../../../../../../common/types/types';
import { Crew } from '../../types';

export type CrewProps = {
  mediaType: Omit<MediaType, 'person'>;
  mediaItemTitle?: string;
  crew?: Crew;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
};
