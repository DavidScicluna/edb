import { MediaType } from '../../../../../../common/types/types';
import { TotalResults } from '../../../../types';

export type DisplayProps = {
  query: string;
  mediaType?: MediaType;
  hasUnsubmitted: boolean;
  totalResults?: TotalResults;
};
