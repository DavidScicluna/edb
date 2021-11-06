import { PartialMovie } from './movie';
import { PartialTV } from './tv';
import { MediaType, ImageResponse as Image } from './types';

export type Gender = 0 | 1 | 2 | 3;

export type CastMovieCredit = {
  character: string;
  credit_id: string;
} & PartialMovie;

export type CrewMovieCredit = {
  department: string;
  job: string;
  credit_id: string;
} & PartialMovie;

export type MovieCredits = {
  cast: CastMovieCredit[];
  crew: CrewMovieCredit[];
  id?: number;
};

export type CastTVCredit = {
  credit_id: string;
  character: string;
  episode_count: number;
} & PartialTV;

export type CrewTVCredit = {
  department: string;
  episode_count: number;
  job: string;
  credit_id: string;
} & PartialTV;

export type TVCredits = {
  cast: CastTVCredit[];
  crew: CrewTVCredit[];
  id?: number;
};

export type Credits = {
  cast: (MovieCredits & CastTVCredit)[];
  crew: (MovieCredits & CrewTVCredit)[];
  id?: number;
};

export type Profile = {
  id?: string;
  image_type?: string;
  media?: PartialMovie | PartialTV;
  media_type?: Omit<MediaType, 'person'>;
} & Image;

export type ImageResponse = {
  id: number;
  profiles: Profile[];
};

export type Person = {
  known_for_department: string;
  id: number;
  name: string;
  gender: Gender;
  popularity: number;
  profile_path: string | null;
  adult: boolean;
};

export type PartialPerson = {
  known_for?: (PartialMovie & PartialTV)[];
} & Person;

export type FullPerson = {
  birthday: string | null;
  deathday: string | null;
  also_known_as: string[];
  biography: string;
  place_of_birth: string | null;
  imdb_id: string;
  homepage: string | null;
} & Person;
