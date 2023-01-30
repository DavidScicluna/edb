import { MovieCast as MovieCast } from '../../../../../common/types/movie';
import { TVShowCast as TVShowCast } from '../../../../../common/types/tv';
import { UseMediaTypeCreditsQueryResult } from '../../../../../common/queries/useMediaTypeCreditsQuery';
import { CommonViewCastProps, ViewCastMediaType } from '../common/types';

export type ViewCastGetType<MT extends ViewCastMediaType> = MT extends 'movie' ? MovieCast : TVShowCast;

export type ViewCastCast<MT extends ViewCastMediaType> = ViewCastGetType<MT>;
export type ViewCastCasts<MT extends ViewCastMediaType> = ViewCastCast<MT>[];

type Picked = 'isFetching' | 'isLoading' | 'isError' | 'isSuccess' | 'refetch';

export type ViewCastProps<MT extends ViewCastMediaType> = CommonViewCastProps<MT> & {
	cast?: ViewCastCasts<MT>;
	name?: string;
} & Partial<Pick<UseMediaTypeCreditsQueryResult<MT>, Picked>>;
