import { ReactElement, useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { useMediaQuery, useDisclosure, Stack, Center, VStack, Collapse } from '@chakra-ui/react';

import axios from 'axios';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';

import Overview from './components/Overview';
import Tagline from './components/Tagline';
import { ShowProps } from './types';

import axiosInstance from '../../../../../../../common/scripts/axios';
import { Images, Videos } from '../../../../../../../common/types';
import { FullTV } from '../../../../../../../common/types/tv';
import { handleReturnBoringTypeByMediaType } from '../../../../../../../common/utils';
import MediaViewer from '../../../../../../../components/MediaViewer';
import Title from '../../../../../../../pages/View/pages/Show/components/Title';
import Actions from '../../components/Actions';
import Poster from '../../components/Poster';

const Show = ({ id }: ShowProps): ReactElement => {
	const source = axios.CancelToken.source();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

	const [selectedPath, setSelectedPath] = useState<string>();

	// Fetching tv show details
	const tvShowQuery = useQuery([`tv-show-${id}`, id], async () => {
		const { data } = await axiosInstance.get<FullTV>(`/tv/${id}`, {
			params: { append_to_response: 'content_ratings' },
			cancelToken: source.token
		});
		return data;
	});

	// Fetching tv show images
	const imagesQuery = useQuery([`tv-show-${id}-images`, id], async () => {
		const { data } = await axiosInstance.get<Images>(`/tv/${id}/images`, {
			cancelToken: source.token
		});
		return data;
	});

	// Fetching tv show videos
	const videosQuery = useQuery([`tv-show-${id}-videos`, id], async () => {
		const { data } = await axiosInstance.get<Videos>(`/tv/${id}/videos`, {
			cancelToken: source.token
		});
		return data;
	});

	const handleMediaClick = (path: string): void => {
		setSelectedPath(path);
		onMediaViewerOpen();
	};

	useEffect(() => {
		return () => {
			source.cancel();
		};
	}, []);

	return (
		<>
			<Stack width='100%' maxWidth='100%' direction={isSm ? 'column' : 'row'} spacing={isSm ? 4 : 2} p={2}>
				<Center width={isSm ? '100%' : '40%'} maxWidth={isSm ? '100%' : '40%'}>
					<Poster
						alt={tvShowQuery.data?.name || ''}
						path={tvShowQuery.data?.poster_path || ''}
						mediaType='tv'
						srcSize={['w92', 'original']}
						isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
						onClickPoster={handleMediaClick}
					/>
				</Center>
				<Center width={isSm ? '100%' : '60%'} maxWidth={isSm ? '100%' : '60%'}>
					<VStack width='100%' spacing={4}>
						<Title show={tvShowQuery.data} isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading} />

						<Collapse
							in={
								!(isNil(tvShowQuery.data?.overview) || isEmpty(tvShowQuery.data?.overview)) ||
								!(isNil(tvShowQuery.data?.tagline) || isEmpty(tvShowQuery.data?.tagline)) ||
								tvShowQuery.isFetching ||
								tvShowQuery.isLoading
							}
							unmountOnExit
							style={{ width: '100%' }}
						>
							<VStack width='100%' spacing={2}>
								<Collapse
									in={
										!(isNil(tvShowQuery.data?.tagline) || isEmpty(tvShowQuery.data?.tagline)) ||
										tvShowQuery.isFetching ||
										tvShowQuery.isLoading
									}
									unmountOnExit
									style={{ width: '100%' }}
								>
									<Tagline
										tagline={tvShowQuery.data?.tagline}
										isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
									/>
								</Collapse>
								<Collapse
									in={
										!(isNil(tvShowQuery.data?.overview) || isEmpty(tvShowQuery.data?.overview)) ||
										tvShowQuery.isFetching ||
										tvShowQuery.isLoading
									}
									unmountOnExit
									style={{ width: '100%' }}
								>
									<Overview
										overview={tvShowQuery.data?.overview}
										isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
									/>
								</Collapse>
							</VStack>
						</Collapse>

						<Actions
							mediaItem={tvShowQuery.data}
							mediaType='tv'
							title={tvShowQuery.data?.name}
							isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading}
							isError={tvShowQuery.isError}
						/>
					</VStack>
				</Center>
			</Stack>

			{imagesQuery.isSuccess || videosQuery.isSuccess ? (
				<MediaViewer
					alt={tvShowQuery.data?.name || 'TV Show Name'}
					assets={compact([
						(imagesQuery.data?.posters || []).length > 0
							? {
									label: 'Posters',
									mediaItems: (imagesQuery.data?.posters || []).map((image) => {
										return {
											type: 'image',
											boringType: handleReturnBoringTypeByMediaType('tv'),
											srcSize: ['w92', 'original'],
											data: { ...image }
										};
									})
							  }
							: undefined,
						(imagesQuery.data?.backdrops || []).length > 0
							? {
									label: 'Backdrops',
									mediaItems: (imagesQuery.data?.backdrops || []).map((image) => {
										return {
											type: 'image',
											boringType: handleReturnBoringTypeByMediaType('tv'),
											srcSize: ['w300', 'original'],
											data: { ...image }
										};
									})
							  }
							: undefined,
						(videosQuery.data?.results || []).length > 0
							? {
									label: 'Videos',
									mediaItems: (videosQuery.data?.results || []).map((video) => {
										return {
											type: 'video',
											boringType: handleReturnBoringTypeByMediaType('tv'),
											srcSize: ['', ''],
											data: { ...video }
										};
									})
							  }
							: undefined
					])}
					selectedPath={selectedPath}
					isOpen={isMediaViewerOpen}
					onClose={onMediaViewerClose}
				/>
			) : null}
		</>
	);
};

export default Show;
