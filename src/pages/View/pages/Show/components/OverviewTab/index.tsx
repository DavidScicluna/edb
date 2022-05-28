import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import Hero from '../../../../components/Hero';
import Backdrop from '../../../../components/Hero/components/Cover/components/Backdrop';
import Poster from '../../../../components/Hero/components/Cover/components/Poster';
import Media from '../../../../components/Media';

import Cast from './components/Cast';
import Credits from './components/Credits';
import Details from './components/Details';
import LastEpisode from './components/LastEpisode';
import Recommendations from './components/Recommendations';
import Reviews from './components/Reviews';
import Similar from './components/Similar';
import { OverviewTabProps } from './types';


const OverviewTab = (props: OverviewTabProps): ReactElement => {
	const {
		tvShowQuery,
		creditsQuery,
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
						alt={tvShowQuery.data?.name}
						path={tvShowQuery.data?.poster_path}
						mediaType='tv'
						isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
						isError={tvShowQuery.isError}
						onClick={(path: string) => onAssetClick(path, 'image')}
					/>
				)}
				renderBackdrop={() => (
					<Backdrop
						alt={tvShowQuery.data?.name}
						path={tvShowQuery.data?.backdrop_path}
						video={(videosQuery.data?.results?.length || 0) > 0}
						mediaType='tv'
						isLoading={
							tvShowQuery.isFetching ||
							tvShowQuery.isLoading ||
							videosQuery.isFetching ||
							videosQuery.isLoading
						}
						isError={tvShowQuery.isError || videosQuery.isError}
						onClick={(path: string, video: boolean) => onAssetClick(path, video ? 'video' : 'image')}
					/>
				)}
				renderDetails={() => (
					<>
						<Details show={tvShowQuery.data} isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading} />

						{!(isNil(tvShowQuery.data?.created_by) || isEmpty(tvShowQuery.data?.created_by)) ||
						!(isNil(creditsQuery.data?.crew) || isEmpty(creditsQuery.data?.crew)) ||
						tvShowQuery.isFetching ||
						tvShowQuery.isLoading ||
						creditsQuery.isFetching ||
						creditsQuery.isLoading ? (
							<Credits
								show={tvShowQuery.data}
								crew={creditsQuery.data?.crew}
								isLoading={
									tvShowQuery.isFetching ||
									tvShowQuery.isLoading ||
									creditsQuery.isFetching ||
									creditsQuery.isLoading
								}
							/>
						) : null}
					</>
				)}
				tagline={tvShowQuery.data?.tagline}
				overview={tvShowQuery.data?.overview}
				isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
			/>

			<LastEpisode
				show={tvShowQuery.data}
				isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
				onChangeTab={() => onChangeTab(2)}
			/>

			<Cast
				name={tvShowQuery.data?.name}
				cast={creditsQuery.data?.cast}
				isError={creditsQuery.isError}
				isSuccess={creditsQuery.isSuccess}
				isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
				onChangeTab={() => onChangeTab(1)}
			/>

			<Recommendations
				name={tvShowQuery.data?.name}
				recommendations={recommendationsQuery.data}
				isError={recommendationsQuery.isError}
				isSuccess={recommendationsQuery.isSuccess}
				isLoading={recommendationsQuery.isFetching || recommendationsQuery.isLoading}
			/>

			<Similar
				name={tvShowQuery.data?.name}
				similar={similarQuery.data}
				isError={similarQuery.isError}
				isSuccess={similarQuery.isSuccess}
				isLoading={similarQuery.isFetching || similarQuery.isLoading}
			/>

			<Reviews
				show={tvShowQuery.data}
				reviews={reviews?.results}
				isLoading={
					tvShowQuery.isFetching || tvShowQuery.isLoading || reviewsQuery.isFetching || reviewsQuery.isLoading
				}
				onChangeTab={() => onChangeTab(3)}
			/>

			<Media
				alt={tvShowQuery.data?.name}
				assets={compact([
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
				mediaType='tv'
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
				onFooterClick={() => onChangeTab(4)}
			/>
		</VStack>
	);
};

export default OverviewTab;
