import { UseMediaTypeVideosQueryResult } from '../../../../../../common/queries/useMediaTypeVideosQuery';
import { ViewVideosMediaType, ViewVideosVideos } from '../../common/types';

type Picked = 'isFetching' | 'isLoading' | 'isError' | 'isSuccess';

// TODO: Go over all components and check if we can use UseResult from queries instead of declaring types ourselves

export type ViewVideosHorizontalGridProps = Partial<Pick<UseMediaTypeVideosQueryResult, Picked>> & {
	mediaType: ViewVideosMediaType;
	videos: ViewVideosVideos;
	title?: string;
	subtitle?: string;
	emptyLabel: string;
	total?: number;
	onFooterClick: () => void;
};
