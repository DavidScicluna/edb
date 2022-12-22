import { MediaType } from '../../../../common/types';
import { Cast as MovieCast } from '../../../../common/types/movie';
import { Cast as TVShowCast } from '../../../../common/types/tv';

export type ViewCastMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewCastGetType<MT extends ViewCastMediaType> = MT extends 'movie' ? MovieCast : TVShowCast;

export type ViewCastCast<MT extends ViewCastMediaType> = ViewCastGetType<MT>;
export type ViewCastCasts<MT extends ViewCastMediaType> = ViewCastCast<MT>[];

export type ViewCastProps<MT extends ViewCastMediaType> = {
	mediaType: MT;
	cast?: ViewCastCasts<MT>;
	name?: string;
	isLoading?: boolean;
	isError?: boolean;
	isSuccess?: boolean;
	refetch?: () => void;
};
