import { FullPerson } from '../../../../../../../../common/types/person';
import { OverviewProps } from '../../types';

export type PhotosProps = {
  name?: FullPerson['name'];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
} & Omit<OverviewProps, 'person' | 'credits' | 'isError' | 'isSuccess' | 'isLoading'>;
