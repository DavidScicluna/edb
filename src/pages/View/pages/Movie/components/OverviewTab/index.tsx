import { ReactElement } from 'react';

import { VStack, Collapse } from '@chakra-ui/react';

import _ from 'lodash';

import Cast from './components/Cast';
import Collection from './components/Collection';
import Credits from './components/Credits';
import Details from './components/Details';
import Recommendations from './components/Recommendations';
import Reviews from './components/Reviews';
import Similar from './components/Similar';
import { OverviewTabProps } from './types';

import Hero from '../../../../components/Hero';
import Backdrop from '../../../../components/Hero/components/Cover/components/Backdrop';
import Poster from '../../../../components/Hero/components/Cover/components/Poster';
import Media from '../../../../components/Media';

const OverviewTab = (props: OverviewTabProps): ReactElement => {
	const {
		movieQuery,
		creditsQuery,
		collectionQuery,
		recommendationsQuery,
		similarQuery,
		reviews,
		reviewsQuery,
		imagesQuery,
		videosQuery,
		onAssetClick,
		onChangeTab
	} = props;

	return (
		<VStack width='100%' maxWidth='100%' spacing={4}>
			<Hero
				renderPoster={() => (
					<Poster
						alt={movieQuery.data?.title}
						path={movieQuery.data?.poster_path}
						mediaType='movie'
						isLoading={movieQuery.isFetching || movieQuery.isLoading}
						isError={movieQuery.isError}
						onClick={(path: string) => onAssetClick(path, 'image')}
					/>
				)}
				renderBackdrop={() => (
					<Backdrop
						alt={movieQuery.data?.title}
						path={movieQuery.data?.backdrop_path}
						video={movieQuery.data?.video || (videosQuery.data?.results?.length || 0) > 0}
						mediaType='movie'
						isLoading={
							movieQuery.isFetching ||
							movieQuery.isLoading ||
							videosQuery.isFetching ||
							videosQuery.isLoading
						}
						isError={movieQuery.isError || videosQuery.isError}
						onClick={(path: string, video: boolean) => onAssetClick(path, video ? 'video' : 'image')}
					/>
				)}
				renderDetails={() => (
					<>
						<Details movie={movieQuery.data} isLoading={movieQuery.isFetching || movieQuery.isLoading} />

						{!(_.isNil(creditsQuery.data?.crew) || _.isEmpty(creditsQuery.data?.crew)) ||
						creditsQuery.isFetching ||
						creditsQuery.isLoading ? (
							<Credits
								crew={creditsQuery.data?.crew}
								isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
							/>
						) : null}
					</>
				)}
				tagline={movieQuery.data?.tagline}
				overview={movieQuery.data?.overview}
				isLoading={movieQuery.isFetching || movieQuery.isLoading}
			/>

			<Cast
				title={movieQuery.data?.title}
				cast={creditsQuery.data?.cast}
				isError={creditsQuery.isError}
				isSuccess={creditsQuery.isSuccess}
				isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
				onChangeTab={() => onChangeTab(1)}
			/>

			<Collapse
				in={collectionQuery.isSuccess && !(_.isNil(collectionQuery.data) || _.isEmpty(collectionQuery.data))}
				unmountOnExit
				style={{ width: '100%' }}
			>
				<Collection collection={collectionQuery.data} />
			</Collapse>

			<Recommendations
				title={movieQuery.data?.title}
				recommendations={recommendationsQuery.data}
				isError={recommendationsQuery.isError}
				isSuccess={recommendationsQuery.isSuccess}
				isLoading={recommendationsQuery.isFetching || recommendationsQuery.isLoading}
			/>

			<Similar
				title={movieQuery.data?.title}
				similar={similarQuery.data}
				isError={similarQuery.isError}
				isSuccess={similarQuery.isSuccess}
				isLoading={similarQuery.isFetching || similarQuery.isLoading}
			/>

			<Reviews
				movie={movieQuery.data}
				reviews={reviews?.results}
				isLoading={
					movieQuery.isFetching || movieQuery.isLoading || reviewsQuery.isFetching || reviewsQuery.isLoading
				}
				onChangeTab={() => onChangeTab(2)}
			/>

			<Media
				alt={movieQuery.data?.title}
				assets={_.compact([
					{
						label: 'Posters',
						type: 'poster',
						isDisabled: imagesQuery.data?.posters?.length === 0,
						data: imagesQuery.data?.posters || []
					},
					{
						label: 'Backdrops',
						type: 'backdrop',
						isDisabled: (imagesQuery.data?.backdrops || []).length === 0,
						data: imagesQuery.data?.backdrops || []
					},
					{
						label: 'Videos',
						type: 'video',
						isDisabled: videosQuery.data?.results?.length === 0,
						data: videosQuery.data?.results || []
					}
				])}
				mediaType='movie'
				isError={{
					images: imagesQuery.isError,
					videos: videosQuery.isError
				}}
				isSuccess={{
					images: imagesQuery.isSuccess,
					videos: videosQuery.isSuccess
				}}
				isLoading={{
					images: imagesQuery.isFetching || imagesQuery.isLoading,
					videos: videosQuery.isFetching || videosQuery.isLoading
				}}
				onAssetClick={onAssetClick}
				onFooterClick={() => onChangeTab(3)}
			/>
		</VStack>
	);
};

export default OverviewTab;
