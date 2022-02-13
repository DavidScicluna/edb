import { Collection } from '../../../../../../../../../common/types/movie';

export type OverviewProps = {
  overview: Collection['overview'];
  isLoading: boolean;
};
