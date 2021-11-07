import { Gender, Person } from './person';
import { Genre, ProductionCompany, ProductionCountry, Language, Status } from './types';

export type Role = {
  credit_id: string;
  character: string;
  episode_count: number;
};

export type Job = {
  credit_id: string;
  job: string;
  episode_count: number;
};

export type Cast = {
  original_name: string;
  roles: Role[];
  total_episode_count: number;
  order: number;
} & Person;

export type Crew = {
  original_name: string;
  jobs: Job[];
  department: string;
  total_episode_count: number;
} & Person;

type EpisodeCreditsCast = {
  original_name: string;
  character: string;
  credit_id: string;
  order: number;
} & Person;

type EpisodeCreditsCrew = {
  department: string;
  job: string;
  credit_id: string;
} & Person;

export type EpisodeCredits = {
  id: number;
  cast: EpisodeCreditsCast[];
  crew: EpisodeCreditsCrew[];
  guest_stars: EpisodeCreditsCast[];
};

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export type Certification = {
  iso_3166_1: string;
  rating: string;
};

export type Certifications = {
  results: Certification[];
  id: number;
};

export type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: Gender;
  profile_path: string | null;
};

export type Network = {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
};

export type Episode = {
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

type EpisodeCrew = {
  department: string;
  job: string;
  credit_id: string;
  original_name: string;
} & Person;

type EpisodeGuest = {
  credit_id: string;
  order: number;
  character: string;
  original_name: string;
} & Person;

export type FullEpisode = {
  crew: EpisodeCrew[];
  guest_stars: EpisodeGuest[];
} & Episode;

type Season = {
  air_date: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type PartialSeason = {
  episode_count: number;
} & Season;

export type FullSeason = {
  _id: string;
  episodes: Episode[];
} & Season;

type TV = {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string | null;
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
  homepage: string | null;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: PartialSeason[];
  spoken_languages: Language[];
  status: Status;
  tagline: string | null;
  type: string;
} & TV;
