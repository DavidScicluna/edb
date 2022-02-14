import { Review } from '../../../../../../../../common/types';
import { FullTV } from '../../../../../../../../common/types/tv';

export type ReviewsProps = {
  show?: FullTV;
  reviews?: Review[];
  isLoading?: boolean;
  onChangeTab: () => void;
};
