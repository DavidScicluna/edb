import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';
import { Response } from '../../../../common/types/types';

export type AllProps = {
  query: string;
  isLoading?: boolean;
  movies: Response<PartialMovie[]> | null;
  tv: Response<PartialTV[]> | null;
  people: Response<PartialPerson[]> | null;
};
