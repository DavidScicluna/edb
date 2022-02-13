import { Credits as MovieCredits, Cast as MovieCast, Crew as MovieCrew } from '../../../../common/types/movie';
import { Credits as TVCredits, Cast as TVCast, Crew as TVCrew } from '../../../../common/types/tv';

export type Cast = MovieCast & TVCast;

export type Crew = MovieCrew & TVCrew;

export type Credits = MovieCredits & TVCredits;

export type Department = {
  id: string;
  title: string;
  people: (Cast & Crew)[];
};

export type CastCrewProps = {
  alt?: string;
  credits?: Credits;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
