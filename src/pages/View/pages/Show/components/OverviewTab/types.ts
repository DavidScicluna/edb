import { UseQueryResult, UseInfiniteQueryResult } from 'react-query';

import { Images, Response, Review, Videos } from '../../../../../../common/types';
import { FullTV, Credits, PartialTV } from '../../../../../../common/types/tv';
import { AssetType } from '../../../../../../components/MediaViewer/types';

export type OverviewTabProps = {
	tvShowQuery: UseQueryResult<FullTV>;
	creditsQuery: UseQueryResult<Credits>;
	recommendationsQuery: UseQueryResult<PartialTV[]>;
	similarQuery: UseQueryResult<PartialTV[]>;
	reviews?: Response<Review[]>;
	reviewsQuery: UseInfiniteQueryResult<Response<Review[]>>;
	imagesQuery: UseQueryResult<Images>;
	videosQuery: UseQueryResult<Videos>;
	onAssetClick: (path: string, type: AssetType) => void;
	onChangeTab: (index: number) => void;
};
