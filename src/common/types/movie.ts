import { FullPerson } from './person';

import { ProductionCompany, ProductionCountry, Genre, Language } from '.';

export type Cast = {
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
  original_name?: string;
} & FullPerson;

export type Crew = {
  credit_id?: string;
  department?: string;
  job?: string;
  original_name?: string;
} & FullPerson;

export type Credits = {
  cast?: Cast[];
  crew?: Crew[];
  id?: number;
};

type Movie = {
  adult?: boolean;
  backdrop_path?: string | null;
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_count?: number;
  vote_average?: number;
};

export type PartialMovie = {
  genre_ids?: number[];
} & Movie;

type ReleaseDate = {
  certification?: string;
  iso_639_1?: string;
  note?: string;
  release_date?: string;
  type?: number;
};

type ReleaseDatesResults = {
  iso_3166_1?: string;
  release_dates?: ReleaseDate[];
};

type ReleaseDates = {
  results?: ReleaseDatesResults[];
};

type Status = 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';

export type Collection = {
  backdrop_path?: string | null;
  id?: number;
  name?: string;
  overview?: string;
  parts?: PartialMovie[];
  poster_path?: string | null;
};

export type FullMovie = {
  belongs_to_collection?: Omit<Collection, 'overview' | 'parts'>;
  budget?: number;
  genres?: Genre[];
  homepage?: string | null;
  imdb_id?: string | null;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_dates?: ReleaseDates;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: Language[];
  status?: Status;
  tagline?: string | null;
} & Movie;
