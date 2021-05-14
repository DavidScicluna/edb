import { Genre, ProductionCompany, ProductionCountry, Language, Status } from './index';

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null; // Check up on this type
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: Language[];
  status: Status;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
