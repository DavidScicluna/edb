import { Person } from './person';
import {
  Genre,
  ProductionCompany,
  ProductionCountry,
  Language,
  Status,
  ImageResponse as Image,
  VideoResponse as Video,
  Collection
} from './types';

type Author = { name: string; username: string; avatar_path: string | null; rating: number | null };

export type Review = {
  id: string;
  author: string;
  author_details: Author;
  content: string;
  created_at: string;
  updated_at: string;
  url?: string;
};

type ReleaseDate = {
  certification: string;
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
};

export type ReleaseDates = {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
};

export type VideoResponse = {
  id: number;
  results: Video[];
};

export type ImageResponse = {
  id: number;
  backdrops: Image[];
  posters: Image[];
};

export type Cast = {
  original_name: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
} & Person;

export type Crew = {
  original_name: string;
  credit_id: string;
  department: string;
  job: string;
} & Person;

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export type ExternalIDs = {
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  id: number;
};

type Movie = {
  adult: boolean;
  poster_path: string | null;
  overview: string | null;
  release_date: string;
  id: number;
  original_language: string;
  original_title: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type PartialMovie = {
  genre_ids: number[];
} & Movie;

export type FullMovie = {
  belongs_to_collection: Omit<Collection, 'overview' | 'parts'>;
  budget: number;
  genres: Genre[];
  release_dates: {
    results: ReleaseDates[];
  };
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: Language[];
  status: Status;
  tagline: string | null;
} & Movie;
