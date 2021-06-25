import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { SortBy, Genre, Response } from '../../common/types/types';

export type Keyword = {
  id: number;
  name: string;
};

export type SearchFormProps = {
  query: string;
  sortBy?: SortBy;
  genres?: Genre[];
  refetch?: boolean;
  onMoviesChange: (data: Response<PartialMovie[]>) => void;
  onTVChange: (data: Response<PartialTV[]>) => void;
  onPeopleChange: (data: Response<PartialPerson[]>) => void;
  onQueryChange: (query: string) => void;
  onIsLoading?: (bool: boolean) => void;
  onIsFetched?: (bool: boolean) => void;
};
