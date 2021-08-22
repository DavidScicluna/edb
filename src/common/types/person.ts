import { PartialMovie } from './movie';
import { PartialTV } from './tv';
import { MediaType } from './types';

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

export type Image = {
  id?: string;
  image_type?: string;
  media?: PartialMovie | PartialTV;
  media_type?: Omit<MediaType, 'person'>;
  aspect_ratio: number;
  file_path: string;
  width: number;
  height: number;
  iso_639_1: null;
  vote_average: number;
  vote_count: number;
};

export type ImageResponse = {
  id: number;
  profiles: Image[];
};

export type ExternalIDs = {
  imdb_id: string | null;
  facebook_id: string | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvrage_id: number | null;
  twitter_id: string | null;
  id: number;
  instagram_id: string | null;
};

type Person = {
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
