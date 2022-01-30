import {
  FullPerson,
  CastMovieCredit,
  CrewMovieCredit,
  CastTVCredit,
  CrewTVCredit
} from '../../../../../../../../common/types/person';
import { OverviewProps } from '../../types';

export type KnownFor = (CastMovieCredit & CastTVCredit & CrewMovieCredit & CrewTVCredit)[];

export type KnownForProps = {
  name?: FullPerson['name'];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
} & Omit<OverviewProps, 'person' | 'images' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickImage'>;
