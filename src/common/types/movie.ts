import { Genre, ProductionCompany, ProductionCountry, Language, Status } from './types';

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
  belongs_to_collection: null; // Check up on this type
  budget: number;
  genres: Genre[];
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
