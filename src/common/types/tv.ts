import { ProductionCompany, ProductionCountry, Language, Genre } from '.';
import { FullPerson } from './person';

export type Cast = {
  character?: string;
  credit_id?: string;
  order?: number;
  original_name?: string;
} & FullPerson;

export type Crew = {
  original_name?: string;
  credit_id?: string;
  department?: string;
  job?: string;
} & FullPerson;

export type Credits = {
  cast?: Cast[];
  crew?: Crew[];
  id?: number;
};

type EpisodeCrew = {
  credit_id?: string;
  department?: string;
  job?: string;
  original_name?: string;
} & FullPerson;

type EpisodeGuest = {
  credit_id?: string;
  order?: number;
  character?: string;
  original_name?: string;
} & FullPerson;

export type Episode = {
  air_date?: string;
  crew?: EpisodeCrew[];
  episode_number?: number;
  guest_stars?: EpisodeGuest[];
  id?: number;
  name?: string;
  overview?: string;
  production_code?: string;
  season_number?: number;
  still_path?: string;
  vote_average?: number;
  vote_count?: number;
};

type Season = {
  air_date?: string;
  id?: number;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  season_number?: number;
};

export type PartialSeason = {
  episode_count?: number;
} & Season;

export type FullSeason = {
  _id?: string;
  episodes?: Episode[];
} & Season;

type TV = {
  backdrop_path?: string | null;
  first_air_date?: string;
  id?: number;
  name?: string;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  vote_average?: number;
  vote_count?: number;
};

export type PartialTV = {
  genre_ids?: number[];
} & TV;

type CreatedBy = {
  id?: number;
  credit_id?: string;
  name?: string;
  gender?: number;
  profile_path?: string | null;
};

type Network = {
  id?: number;
  logo_path?: string | null;
  name?: string;
  origin_country?: string;
};

export type FullTV = {
  created_by?: CreatedBy[];
  episode_run_time?: number[];
  genres?: Genre[];
  homepage?: string;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: object;
  networks?: Network[];
  next_episode_to_air?: null;
  number_of_episodes?: number;
  number_of_seasons?: number;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  seasons?: PartialSeason[];
  spoken_languages?: Language[];
  status?: string;
  tagline?: string;
  type?: string;
} & TV;
