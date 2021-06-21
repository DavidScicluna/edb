import { PartialTV } from '../../../../common/types/tv';
import { Response } from '../../../../common/types/types';

export type TVProps = {
  tv: Response<PartialTV[]>;
  isLoading: boolean;
};
