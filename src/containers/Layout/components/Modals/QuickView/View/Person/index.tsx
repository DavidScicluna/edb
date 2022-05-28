import { ReactElement, useState, useEffect } from 'react';


import { useMediaQuery, useDisclosure, useConst, Stack, Center, VStack, Collapse } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';


import { useSelector } from '../../../../../../../common/hooks';
import axiosInstance from '../../../../../../../common/scripts/axios';
import { Images } from '../../../../../../../common/types';
import { FullPerson, MovieCredits, TVCredits } from '../../../../../../../common/types/person';
import { handleReturnBoringTypeByMediaType } from '../../../../../../../common/utils';
import MediaViewer from '../../../../../../../components/MediaViewer';
import { handleGetDepartments } from '../../../../../../../pages/View/pages/Person/common/utils';
import Title from '../../../../../../../pages/View/pages/Person/components/Title';
import { guest } from '../../../../../../../store/slices/Users';
import Actions from '../../components/Actions';
import Poster from '../../components/Poster';

import { PersonProps } from './types';
import Stats from './components/Stats';
import Bio from './components/Bio';

const Person = ({ id }: PersonProps): ReactElement => {
	const source = axios.CancelToken.source();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

	const user = useSelector((state) => state.app.data.user);

	const [selectedImagePath, setSelectedImagePath] = useState<string>();

	const isGuest = useConst<boolean>(guest.data.id === user);

	// Fetching person details
	const personQuery = useQuery([`person-${id}`, id], async () => {
		const { data } = await axiosInstance.get<FullPerson>(`/person/${id}`, {
			cancelToken: source.token
		});
		return data;
	});

	// Fetching person movie credits
	const movieCreditsQuery = useQuery([`person-${id}-movie_credits`, id], async () => {
		const { data } = await axiosInstance.get<MovieCredits>(`/person/${id}/movie_credits`, {
			cancelToken: source.token
		});
		return data;
	});

	// Fetching person tv credits
	const tvCreditsQuery = useQuery([`person-${id}-tv_credits`, id], async () => {
		const { data } = await axiosInstance.get<TVCredits>(`/person/${id}/tv_credits`, {
			cancelToken: source.token
		});
		return data;
	});

	// Fetching person images
	const imagesQuery = useQuery([`person-${id}-images`, id], async () => {
		const { data } = await axiosInstance.get<Images>(`/person/${id}/images`, {
			cancelToken: source.token
		});
		return data;
	});

	const departments =
		movieCreditsQuery.isSuccess && tvCreditsQuery.isSuccess
			? handleGetDepartments(movieCreditsQuery.data, tvCreditsQuery.data)
			: [];

	/**
	 * This method will find the image object from images and then it will open the media modal
	 *
	 * @param path - Image path
	 */
	const handleOnPosterClick = (path: string): void => {
		setSelectedImagePath(path);
		onMediaViewerOpen();
	};

	useEffect(() => {
		return () => source.cancel();
	}, []);

	return (
		<>
			<Stack width='100%' maxWidth='100%' direction={isSm ? 'column' : 'row'} spacing={isSm ? 4 : 2} p={2}>
				<Center width={isSm ? '100%' : '40%'} maxWidth={isSm ? '100%' : '40%'}>
					<Poster
						alt={personQuery.data?.name || ''}
						path={personQuery.data?.profile_path || ''}
						mediaType='person'
						srcSize={['w45', 'original']}
						isLoading={personQuery.isFetching || personQuery.isLoading}
						onClickPoster={handleOnPosterClick}
					/>
				</Center>
				<Center width={isSm ? '100%' : '60%'} maxWidth={isSm ? '100%' : '60%'}>
					<VStack width='100%' spacing={4}>
						<VStack width='100%' spacing={2}>
							<Title
								person={personQuery.data}
								departments={departments.map((department) => department.label)}
								isLoading={personQuery.isFetching || personQuery.isLoading}
							/>

							<Collapse
								in={
									!(isNil(personQuery.data?.biography) || isEmpty(personQuery.data?.biography)) ||
									!(isNil(personQuery.data?.birthday) || isEmpty(personQuery.data?.birthday)) ||
									personQuery.isFetching ||
									personQuery.isLoading
								}
								unmountOnExit
								style={{ width: '100%' }}
							>
								<Bio
									birthday={personQuery.data?.birthday}
									place_of_birth={personQuery.data?.place_of_birth}
									deathday={personQuery.data?.deathday}
									bio={personQuery.data?.biography}
									isLoading={personQuery.isFetching || personQuery.isLoading}
								/>
							</Collapse>
						</VStack>

						<Stats
							totalCrewCredits={
								(movieCreditsQuery.data?.crew?.length || 0) + (tvCreditsQuery.data?.crew?.length || 0)
							}
							totalMovieCredits={movieCreditsQuery.data?.cast?.length || 0}
							totalTvCredits={tvCreditsQuery.data?.cast?.length || 0}
							isLoading={
								movieCreditsQuery.isFetching ||
								movieCreditsQuery.isLoading ||
								tvCreditsQuery.isFetching ||
								tvCreditsQuery.isLoading
							}
						/>

						{!isGuest ? (
							<Actions
								mediaItem={personQuery.data}
								mediaType='person'
								title={personQuery.data?.name}
								isLoading={personQuery.isFetching || personQuery.isLoading}
								isError={personQuery.isError}
							/>
						) : null}
					</VStack>
				</Center>
			</Stack>

			{imagesQuery.isSuccess && (imagesQuery.data?.profiles || []).length > 0 ? (
				<MediaViewer
					alt={personQuery.data?.name || 'Person Name'}
					assets={[
						{
							label: 'Photos',
							mediaItems: (imagesQuery.data?.profiles || []).map((image) => {
								return {
									type: 'image',
									boringType: handleReturnBoringTypeByMediaType('person'),
									srcSize: ['w45', 'original'],
									data: { ...image }
								};
							})
						}
					]}
					selectedPath={selectedImagePath}
					isOpen={isMediaViewerOpen}
					onClose={onMediaViewerClose}
				/>
			) : null}
		</>
	);
};

export default Person;
