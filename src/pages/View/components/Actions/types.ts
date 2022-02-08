import { MediaType } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialTV } from '../../../../common/types/tv';

export type ActionsProps = {
  mediaItem?: PartialMovie | PartialTV;
  mediaType: Omit<MediaType, 'company'>;
  title?: string;
  isLoading?: boolean;
  isError?: boolean;
};
