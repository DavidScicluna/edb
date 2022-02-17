import { ReactElement } from 'react';

// Utility Types
export type NonNullable<T> = Exclude<T, null | undefined>; // Remove null and undefined from Type

// Component Types
export type Style = { [key: string]: number | string | unknown | Style };

export type Icon = ReactElement;

export type Orientation = 'vertical' | 'horizontal';

// Data Types
export type BoringAvatarType = 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus';

export type Response<Data> = {
	page?: number;
	results?: Data;
	total_pages?: number;
	total_results?: number;
};

export type ExternalIDs = {
	homepage_id?: string | null;
	imdb_id?: string | null;
	facebook_id?: string | null;
	freebase_mid?: string | null;
	freebase_id?: string | null;
	tvrage_id?: number | null;
	twitter_id?: string | null;
	id?: number;
	instagram_id?: string | null;
};

export type MediaType = 'movie' | 'tv' | 'person' | 'company' | 'collection';

export type Keyword = {
	id?: number;
	name?: string;
};

export type Video = {
	iso_639_1?: string;
	iso_3166_1?: string;
	name?: string;
	key?: string;
	site?: string;
	size?: number;
	type?: string;
	official?: boolean;
	published_at?: string;
	id?: string;
};

export type Videos = {
	id?: number;
	results?: Video[];
};

export type Image = {
	aspect_ratio?: number;
	file_path?: string;
	height?: number | null;
	iso_639_1?: string;
	vote_average?: number;
	vote_count?: number;
	width?: number;
};

export type Images = {
	id?: number;
	logos?: Image[];
	stills?: Image[];
	profiles?: Image[];
	backdrops?: Image[];
	posters?: Image[];
};

type Author = {
	name?: string;
	username?: string;
	avatar_path?: string;
	rating?: number;
};

export type Review = {
	id?: string;
	author?: string;
	author_details?: Author;
	content?: string;
	created_at?: string;
	iso_639_1?: string;
	media_id?: number;
	media_title?: string;
	media_type?: string;
	updated_at?: string;
	url?: string;
};

export type PartialCompany = {
	id?: number;
	logo_path?: string | null;
	name?: string;
	origin_country?: string;
};

export type FullCompany = {
	description?: string;
	headquarters?: string;
	homepage?: string;
	parent_company?: FullCompany | null;
} & PartialCompany;

export type ProductionCompany = {
	name?: string;
	id?: number;
	logo_path?: string | null;
	origin_country?: string;
};

export type ProductionCountry = {
	iso_3166_1?: string;
	name?: string;
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

export type Country = {
	iso_3166_1?: string;
	english_name?: string;
};

export type Language = {
	iso_639_1?: string;
	english_name?: string;
	name?: string;
};

export type Job = {
	department?: string;
	jobs?: string[];
};

export type Genre = {
	id?: number;
	name?: string;
};

export type Certification = {
	certification?: string;
	meaning?: string;
	order?: number;
};

// export type CertificationKey = 'US' | 'CA' | 'DE' | 'GB' | 'AU' | 'BR' | 'FR' | 'NZ' | 'IN';

export type Certifications = { [key: string]: Certification[] };
