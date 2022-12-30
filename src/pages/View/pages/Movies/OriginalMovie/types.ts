import { ReactNode } from 'react';

import { Location } from 'react-router';

import { TabListTab, TabsOnChangeProps, TabsProps } from '@davidscicluna/component-library';

import { UseMediaTypeQueryResult } from '../../../../../common/queries/useMediaTypeQuery';
import { UseMediaTypeCreditsQueryResult } from '../../../../../common/queries/useMediaTypeCreditsQuery';
import { UseMediaTypeImagesQueryResult } from '../../../../../common/queries/useMediaTypeImagesQuery';
import { UseMediaTypeVideosQueryResult } from '../../../../../common/queries/useMediaTypeVideosQuery';
import { UseMediaTypeReviewsInfiniteQueryResult } from '../../../../../common/queries/useMediaTypeReviewsInfiniteQuery';

// TODO: Use TabListTabRenderProps type once exported
type RenderBadgeProps = Pick<TabsProps, 'color' | 'colorMode' | 'size'> & {
	isActive: boolean;
	total: number;
};

export type MovieTab = Pick<TabListTab, 'label'> & {
	path: Partial<Location>;
	renderBadge?: (props: RenderBadgeProps) => ReactNode;
};
export type MovieTabs = MovieTab[];

export type MovieParams = { id: string };

export type MovieContext = {
	movieQuery?: UseMediaTypeQueryResult<'movie'>;
	creditsQuery?: UseMediaTypeCreditsQueryResult<'movie'>;
	reviewsQuery?: UseMediaTypeReviewsInfiniteQueryResult;
	imagesQuery?: UseMediaTypeImagesQueryResult;
	videosQuery?: UseMediaTypeVideosQueryResult;
	onSetActiveTab: (props: TabsOnChangeProps) => void;
};
