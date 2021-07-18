// Component Types
export type Style = { [key: string]: number | string | Style };

export type Icon = any;

export type ButtonSize = 'xs' | 'md' | 'lg';

export type CardVariant = 'transparent' | 'outlined';

export type ColorMode = 'light' | 'dark';

export type Breadcrumb = {
  path: string;
  label: string;
};

export type SortBy = {
  label: string;
  value: string;
  isActive: boolean;
};

export type Image = {
  alt: string;
  src: string;
  size: string;
};

// Data Types
export type Response<Data> = {
  page: number;
  results: Data;
  total_pages: number;
  total_results: number;
};

export type MediaType = 'movie' | 'tv' | 'person';

export type Rating = {
  rating: number | null;
  count: number | null;
};

export type Genre = {
  id: number;
  name: string;
};

export type Status = 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';

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

export type Language = {
  iso_639_1: string;
  english_name?: string;
  name: string;
};
