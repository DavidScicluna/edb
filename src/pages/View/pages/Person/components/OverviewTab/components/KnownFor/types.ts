import {
  FullPerson,
  CastMovieCredit,
  CrewMovieCredit,
  CastTVCredit,
  CrewTVCredit
} from '../../../../../../../../common/types/person';
import { OverviewTabProps } from '../../types';

export type KnownFor = (CastMovieCredit & CastTVCredit & CrewMovieCredit & CrewTVCredit)[];

export type KnownForProps = {
  name?: FullPerson['name'];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
} & Omit<OverviewTabProps, 'person' | 'images' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickImage'>;
