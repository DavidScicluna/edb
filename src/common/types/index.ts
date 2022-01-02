import { ReactElement } from 'react';

import { PartialMovie } from './movie';
import { PartialTV } from './tv';

// Utility Types
export type NonNullable<T> = Exclude<T, null | undefined>; // Remove null and undefined from Type

// Component Types
export type Style = { [key: string]: number | string | unknown | Style };

export type Icon = ReactElement;

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonType = 'button' | 'iconButton';

export type ColorMode = 'light' | 'dark';

export type Image = {
  alt: string;
  src: string;
  size: {
    thumbnail: string;
    full: string;
  };
};

// Data Types
export type Response<Data> = {
  page: number;
  results: Data;
  total_pages: number;
  total_results: number;
};

export type ExternalIDs = {
  imdb_id?: string | null;
  facebook_id?: string | null;
  freebase_mid?: string | null;
  freebase_id?: string | null;
  tvrage_id?: number | null;
  twitter_id?: string | null;
  id?: number;
  instagram_id?: string | null;
};

export type MediaType = 'movie' | 'tv' | 'person';

export type Keyword = {
  id: number;
  name: string;
};

export type Status = 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type Videos = {
  id: number;
  results: Video[];
};

export type ImageResponse = {
  aspect_ratio: number;
  file_path: string;
  width: number;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
};

export type Images = {
  id: number;
  stills?: ImageResponse[];
  backdrops?: ImageResponse[];
  posters?: ImageResponse[];
};

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

export type ProductionCompany = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type Collection = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: (PartialMovie & PartialTV)[];
};

export type Genre = {
  id?: number;
  name?: string;
};

export type Genres = {
  genres?: Genre[];
};

export type Certification = {
  certification?: string;
  meaning?: string;
  order?: number;
};

type CertificationKey = 'US' | 'CA' | 'DE' | 'GB' | 'AU' | 'BR' | 'FR' | 'NZ' | 'IN';

export type Certifications = {
  certifications?: { [key in CertificationKey]: Certification[] };
};

// export type WatchProvider = {
//   display_priority?: number;
//   logo_path?: string;
//   provider_name?: string;
//   provider_id?: number;
// };

// export type WatchProviders = {
//   results?: WatchProvider[];
// };

export type Language = {
  iso_639_1?: string;
  english_name?: string;
  name?: string;
};
