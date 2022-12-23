import { UseMediaTypeVideosQueryResult } from '../../../../../../common/queries/useMediaTypeVideosQuery';
import { ViewVideosMediaType, ViewVideosVideos } from '../../common/types';

type Picked = 'isFetching' | 'isLoading' | 'isError' | 'isSuccess' | 'error' | 'refetch';

// TODO: Go over all components and check if we can use UseResult from queries instead of declaring types ourselves
export type ViewVideosVerticalGridProps = Partial<Pick<UseMediaTypeVideosQueryResult, Picked>> & {
	mediaType: ViewVideosMediaType;
	videos?: ViewVideosVideos;
	name?: string;
};
