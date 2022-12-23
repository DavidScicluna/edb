import { MediaType } from '../../../../common/types';
import { Cast as MovieCast } from '../../../../common/types/movie';
import { Cast as TVShowCast } from '../../../../common/types/tv';
import { UseMediaTypeCreditsQueryResult } from '../../../../common/queries/useMediaTypeCreditsQuery';

export type ViewCastMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewCastGetType<MT extends ViewCastMediaType> = MT extends 'movie' ? MovieCast : TVShowCast;

export type ViewCastCast<MT extends ViewCastMediaType> = ViewCastGetType<MT>;
export type ViewCastCasts<MT extends ViewCastMediaType> = ViewCastCast<MT>[];

type Picked = 'isFetching' | 'isLoading' | 'isError' | 'isSuccess' | 'refetch';

export type ViewCastProps<MT extends ViewCastMediaType> = Pick<UseMediaTypeCreditsQueryResult<MT>, Picked> & {
	mediaType: MT;
	cast?: ViewCastCasts<MT>;
	name?: string;
};
