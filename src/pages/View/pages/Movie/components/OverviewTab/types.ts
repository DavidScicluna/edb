import { UseQueryResult, UseInfiniteQueryResult } from 'react-query';

import { Images, Response, Review, Videos } from '../../../../../../common/types';
import { Collection, Credits, FullMovie, PartialMovie } from '../../../../../../common/types/movie';
import { AssetType } from '../../../../../../components/MediaViewer/types';

export type OverviewTabProps = {
	movieQuery: UseQueryResult<FullMovie>;
	creditsQuery: UseQueryResult<Credits>;
	collectionQuery: UseQueryResult<Collection>;
	recommendationsQuery: UseQueryResult<PartialMovie[]>;
	similarQuery: UseQueryResult<PartialMovie[]>;
	reviews?: Response<Review[]>;
	reviewsQuery: UseInfiniteQueryResult<Response<Review[]>>;
	imagesQuery: UseQueryResult<Images>;
	videosQuery: UseQueryResult<Videos>;
	onAssetClick: (path: string, type: AssetType) => void;
	onChangeTab: (index: number) => void;
};
