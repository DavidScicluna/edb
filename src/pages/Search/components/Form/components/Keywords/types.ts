import { Response } from '../../../../../../common/types';

export type Keyword = {
  id: number;
  name: string;
};

export type KeywordsProps = {
  keywords?: Response<Keyword[]>;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  hasNextPage?: boolean;
  onKeywordClick: (name: Keyword['name']) => void;
  onFetchNextPage: () => void;
};
