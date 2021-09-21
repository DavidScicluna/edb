import { ReactElement, useState } from 'react';

import { useDisclosure, useMediaQuery, VStack, HStack, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '../../../../../../../common/scripts/axios';
import { FullPerson, Profile, ImageResponse, MovieCredits, TVCredits } from '../../../../../../../common/types/person';
import { Response } from '../../../../../../../common/types/types';
import MediaViewer from '../../../../../../../components/MediaViewer';
import { handleGetDepartments } from '../../../../../../../pages/Person';
import Poster from '../Poster';
import Container from './components/Container';
import { PersonProps } from './types';

const Person = (props: PersonProps): ReactElement => {
  const source = axios.CancelToken.source();

  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { id } = props;

  const [selectedPhoto, setSelectedPhoto] = useState<Profile | undefined>();

  // Fetching person details
  const personQuery = useQuery([`person-${id}`, id], async () => {
    const { data } = await axiosInstance.get<FullPerson>(`/person/${id}`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person movie credits
  const movieCreditsQuery = useQuery([`person-movie_credits-${id}`, id], async () => {
    const { data } = await axiosInstance.get<MovieCredits>(`/person/${id}/movie_credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person tv credits
  const tvCreditsQuery = useQuery([`person-tv_credits-${id}`, id], async () => {
    const { data } = await axiosInstance.get<TVCredits>(`/person/${id}/tv_credits`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person images
  const imagesQuery = useQuery([`person-images-${id}`, id], async () => {
    const { data } = await axiosInstance.get<ImageResponse>(`/person/${id}/images`, {
      cancelToken: source.token
    });
    return data;
  });

  // Fetching person tagged images
  const taggedImagesQuery = useQuery([`person-tagged_images-${id}`, id], async () => {
    const { data } = await axiosInstance.get<Response<ImageResponse>>(`/person/${id}/tagged_images`, {
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
    setSelectedPhoto(imagesQuery.data?.profiles.find((image) => image.file_path === path) || undefined);
    onMediaViewerOpen();
  };

  return (
    <>
      {isSm ? (
        <VStack width='100%' maxWidth='100%' spacing={2} p={2}>
          <Poster
            name={personQuery.data?.name || ''}
            path={personQuery.data?.profile_path || ''}
            mediaType='person'
            isLoading={personQuery.isFetching || personQuery.isLoading}
            onClickPoster={handleOnPosterClick}
          />
          <Container
            person={personQuery.data}
            departments={departments.map((department) => department.label)}
            totalMovieCredits={movieCreditsQuery.data?.cast.length || 0}
            totalTvCredits={tvCreditsQuery.data?.cast.length || 0}
            totalCrewCredits={(movieCreditsQuery.data?.crew.length || 0) + (tvCreditsQuery.data?.crew.length || 0)}
            isLoading={personQuery.isFetching || personQuery.isLoading}
            isError={personQuery.isError || personQuery.isError}
          />
        </VStack>
      ) : (
        <HStack width='100%' maxWidth='100%' spacing={2} p={2}>
          <Box width='40%' maxWidth='40%'>
            <Poster
              name={personQuery.data?.name || ''}
              path={personQuery.data?.profile_path || ''}
              mediaType='person'
              isLoading={personQuery.isFetching || personQuery.isLoading}
              onClickPoster={handleOnPosterClick}
            />
          </Box>
          <Box width='60%' maxWidth='60%'>
            <Container
              person={personQuery.data}
              departments={departments.map((department) => department.label)}
              totalMovieCredits={movieCreditsQuery.data?.cast.length || 0}
              totalTvCredits={tvCreditsQuery.data?.cast.length || 0}
              totalCrewCredits={(movieCreditsQuery.data?.crew.length || 0) + (tvCreditsQuery.data?.crew.length || 0)}
              isLoading={personQuery.isFetching || personQuery.isLoading}
              isError={personQuery.isError || personQuery.isError}
            />
          </Box>
        </HStack>
      )}

      {imagesQuery.isSuccess || taggedImagesQuery.isSuccess ? (
        <MediaViewer
          isOpen={isMediaViewerOpen}
          selected={{ type: 'photo', asset: selectedPhoto?.file_path }}
          photos={[...(imagesQuery.data?.profiles || []), ...(taggedImagesQuery.data?.results.profiles || [])]}
          mediaType='person'
          onClose={onMediaViewerClose}
        />
      ) : null}
    </>
  );
};

export default Person;
