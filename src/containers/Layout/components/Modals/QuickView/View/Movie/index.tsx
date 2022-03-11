import { ReactElement, useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { useMediaQuery, useDisclosure, Stack, Center, VStack, Collapse } from '@chakra-ui/react';

import axios from 'axios';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import Overview from './components/Overview';
import Tagline from './components/Tagline';
import { MovieProps } from './types';

import axiosInstance from '../../../../../../../common/scripts/axios';
import { Images, Videos } from '../../../../../../../common/types';
import { FullMovie } from '../../../../../../../common/types/movie';
import { handleReturnBoringTypeByMediaType } from '../../../../../../../common/utils';
import MediaViewer from '../../../../../../../components/MediaViewer';
import Title from '../../../../../../../pages/View/pages/Movie/components/Title';
import Actions from '../../components/Actions';
import Poster from '../../components/Poster';

const Movie = ({ id }: MovieProps): ReactElement => {
	const source = axios.CancelToken.source();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

	const [selectedPath, setSelectedPath] = useState<string>();

	// Fetching movie details
	const movieQuery = useQuery([`movie-${id}`, id], async () => {
		const { data } = await axiosInstance.get<FullMovie>(`/movie/${id}`, {
			params: { append_to_response: 'release_dates' },
			cancelToken: source.token
		});
		return data;
	});

	// Fetching movie images
	const imagesQuery = useQuery([`movie-${id}-images`, id], async () => {
		const { data } = await axiosInstance.get<Images>(`/movie/${id}/images`, {
			cancelToken: source.token
		});
		return data;
	});

	// Fetching movie videos
	const videosQuery = useQuery([`movie-${id}-videos`, id], async () => {
		const { data } = await axiosInstance.get<Videos>(`/movie/${id}/videos`, {
			cancelToken: source.token
		});
		return data;
	});

	/**
	 * This method will open the image passed in the media modal
	 *
	 * @param image - Image object
	 */
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
						alt={movieQuery.data?.title || ''}
						path={movieQuery.data?.poster_path || ''}
						mediaType='movie'
						srcSize={['w92', 'original']}
						isLoading={movieQuery.isFetching || movieQuery.isLoading}
						onClickPoster={handleMediaClick}
					/>
				</Center>
				<Center width={isSm ? '100%' : '60%'} maxWidth={isSm ? '100%' : '60%'}>
					<VStack width='100%' spacing={4}>
						<Title movie={movieQuery.data} isLoading={movieQuery.isFetching || movieQuery.isLoading} />

						<Collapse
							in={
								!(isNil(movieQuery.data?.overview) || isEmpty(movieQuery.data?.overview)) ||
								!(isNil(movieQuery.data?.tagline) || isEmpty(movieQuery.data?.tagline)) ||
								movieQuery.isFetching ||
								movieQuery.isLoading
							}
							unmountOnExit
							style={{ width: '100%' }}
						>
							<VStack width='100%' spacing={2}>
								<Collapse
									in={
										!(isNil(movieQuery.data?.tagline) || isEmpty(movieQuery.data?.tagline)) ||
										movieQuery.isFetching ||
										movieQuery.isLoading
									}
									unmountOnExit
									style={{ width: '100%' }}
								>
									<Tagline
										tagline={movieQuery.data?.tagline}
										isLoading={movieQuery.isFetching || movieQuery.isLoading}
									/>
								</Collapse>
								<Collapse
									in={
										!(isNil(movieQuery.data?.overview) || isEmpty(movieQuery.data?.overview)) ||
										movieQuery.isFetching ||
										movieQuery.isLoading
									}
									unmountOnExit
									style={{ width: '100%' }}
								>
									<Overview
										overview={movieQuery.data?.overview}
										isLoading={movieQuery.isFetching || movieQuery.isLoading}
									/>
								</Collapse>
							</VStack>
						</Collapse>

						<Actions
							mediaItem={movieQuery.data}
							mediaType='movie'
							title={movieQuery.data?.title}
							isLoading={movieQuery.isFetching || movieQuery.isLoading}
							isError={movieQuery.isError}
						/>
					</VStack>
				</Center>
			</Stack>

			{imagesQuery.isSuccess || videosQuery.isSuccess ? (
				<MediaViewer
					alt={movieQuery.data?.title || 'Movie Title'}
					assets={compact([
						(imagesQuery.data?.posters || []).length > 0
							? {
									label: 'Posters',
									mediaItems: (imagesQuery.data?.posters || []).map((image) => {
										return {
											type: 'image',
											boringType: handleReturnBoringTypeByMediaType('movie'),
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
											boringType: handleReturnBoringTypeByMediaType('movie'),
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
											boringType: handleReturnBoringTypeByMediaType('movie'),
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

export default Movie;
