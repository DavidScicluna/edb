import { MediaType } from '../../../../common/types';
import { Cast as MovieCast, Crew as MovieCrew } from '../../../../common/types/movie';
import { Cast as TVCast, Crew as TVCrew } from '../../../../common/types/tv';

export type Cast = Partial<MovieCast & TVCast>[];

export type Crew = Partial<MovieCrew & TVCrew>[];

export type Department = {
  title: string;
  crew: Crew;
};

export type CastCrewTabProps = {
  mediaType: Omit<MediaType, 'person'>;
  mediaItemTitle?: string;
  cast?: Cast;
  crew?: Crew;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
