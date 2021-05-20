import { ReactElement } from 'react';

export interface Breadcrumb {
  path: string;
  label: string;
}

export interface Image {
  alt: string;
  src: string;
  size: string;
  fallback?: ReactElement;
}

export interface Response<Data> {
  page: number;
  results: Data;
  total_pages: number;
  total_results: number;
}

export type Type = 'movie' | 'tv' | 'person';

export interface Genre {
  id: number;
  name: string;
}

export type Status =
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled';

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Language {
  iso_639_1: string;
  english_name?: string;
  name: string;
}
