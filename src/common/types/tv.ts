import { Gender } from './person';
import { Genre, ProductionCompany, ProductionCountry, Language, Status } from './types';

export type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: Gender;
  profile_path: string | null;
};

export type LastEpisode = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
};

export type Network = {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

type TV = {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  name: string;
};

export type PartialTV = {
  genre_ids: number[];
} & TV;

export type FullTV = {
  created_by: CreatedBy[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisode;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: Language[];
  status: Status;
  tagline: string;
  type: string;
} & TV;
