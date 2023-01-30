import { FullPerson } from './person';

import { ProductionCompany, ProductionCountry, Language, Genre } from '.';

export type TVShowCastRole = {
	credit_id?: string;
	character?: string;
	episode_count?: number;
};

export type TVShowCast = {
	credit_id?: string;
	character?: string;
	episode_count?: number;
	roles?: TVShowCastRole[];
	total_episode_count?: number;
	order?: number;
	original_name?: string;
} & FullPerson;

export type TVShowCrewJob = {
	credit_id?: string;
	job?: string;
	episode_count?: number;
};

export type TVShowCrew = {
	credit_id?: string;
	department?: string;
	job?: string;
	jobs?: TVShowCrewJob[];
	total_episode_count?: number;
	original_name?: string;
} & FullPerson;

export type TVShowCredits = {
	cast?: TVShowCast[];
	crew?: TVShowCrew[];
	id?: number;
};

export type TVShowEpisodeCast = {
	original_name?: string;
	character?: string;
	credit_id?: string;
	order?: number;
} & FullPerson;

export type TVShowEpisodeCrew = {
	credit_id?: string;
	department?: string;
	job?: string;
	original_name?: string;
} & FullPerson;

export type TVShowEpisodeGuest = {
	credit_id?: string;
	order?: number;
	character?: string;
	original_name?: string;
} & FullPerson;

export type TVShowEpisodeCredits = {
	cast?: TVShowEpisodeCast[];
	crew?: TVShowEpisodeCrew[];
	guest_stars?: TVShowEpisodeGuest[];
	id?: number;
};

export type TVShowEpisode = {
	air_date?: string;
	crew?: TVShowEpisodeCrew[];
	episode_number?: number;
	guest_stars?: TVShowEpisodeGuest[];
	id?: number;
	name?: string;
	overview?: string;
	production_code?: string;
	runtime?: number;
	season_number?: number;
	still_path?: string;
	show_id?: number;
	vote_average?: number;
	vote_count?: number;
};

type TVShowSeason = {
	air_date?: string;
	id?: number;
	name?: string;
	overview?: string;
	poster_path?: string | null;
	season_number?: number;
};

export type TVShowPartialSeason = {
	episode_count?: number;
} & TVShowSeason;

export type TVShowFullSeason = {
	_id?: string;
	episodes?: TVShowEpisode[];
} & TVShowSeason;

type TVShow = {
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

export type PartialTVShow = {
	genre_ids?: number[];
} & TVShow;

export type TVShowCreatedBy = {
	id?: number;
	credit_id?: string;
	name?: string;
	gender?: number;
	profile_path?: string | null;
};

type TVShowNetwork = {
	id?: number;
	logo_path?: string | null;
	name?: string;
	origin_country?: string;
};

export type TVShowContentRating = {
	iso_3166_1?: string;
	rating?: string;
};

type TVShowContentRatings = {
	results?: TVShowContentRating[];
};

export type TVShowStatus = 'Returning Series' | 'Planned' | 'In Production' | 'Ended' | 'Canceled' | 'Pilot';

export type FullTVShow = {
	created_by?: TVShowCreatedBy[];
	content_ratings?: TVShowContentRatings;
	episode_run_time?: number[];
	genres?: Genre[];
	homepage?: string;
	in_production?: boolean;
	languages?: string[];
	last_air_date?: string;
	last_episode_to_air?: TVShowEpisode;
	networks?: TVShowNetwork[];
	next_episode_to_air?: TVShowEpisode;
	number_of_episodes?: number;
	number_of_seasons?: number;
	production_companies?: ProductionCompany[];
	production_countries?: ProductionCountry[];
	seasons?: TVShowPartialSeason[];
	spoken_languages?: Language[];
	status?: TVShowStatus;
	tagline?: string;
	type?: string;
} & TVShow;
