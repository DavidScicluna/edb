import { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, useMediaQuery, Stack, Center, VStack } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import { useQuery } from 'react-query';

import axiosInstance from '../../../../../../../common/scripts/axios';
import { Images } from '../../../../../../../common/types';
import { FullPerson, MovieCredits, TVCredits } from '../../../../../../../common/types/person';
import Button from '../../../../../../../components/Clickable/Button';
import Like, { handleReturnIcon } from '../../../../../../../components/Clickable/Like';
import MediaViewer from '../../../../../../../components/MediaViewer';
import { handleGetDepartments } from '../../../../../../../pages/View/pages/Person/common/utils';
import Title from '../../../../../../../pages/View/pages/Person/components/Title';
import Poster from '../Poster';
import Stats from './components/Stats';
import { PersonProps } from './types';

const Person = (props: PersonProps): ReactElement => {
  const source = axios.CancelToken.source();

  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { id } = props;

  const [selectedPhoto, setSelectedPhoto] = useState<string>();

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
    setSelectedPhoto(path);
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
            name={personQuery.data?.name || ''}
            path={personQuery.data?.profile_path || ''}
            mediaType='person'
            isLoading={personQuery.isFetching || personQuery.isLoading}
            onClickPoster={handleOnPosterClick}
          />
        </Center>
        <Center width={isSm ? '100%' : '60%'} maxWidth={isSm ? '100%' : '60%'}>
          <VStack width='100%' spacing={4}>
            <Title
              person={personQuery.data}
              departments={departments.map((department) => department.label)}
              isLoading={personQuery.isFetching || personQuery.isLoading}
              isQuickView
            />

            <Stats
              totalCrewCredits={(movieCreditsQuery.data?.crew?.length || 0) + (tvCreditsQuery.data?.crew?.length || 0)}
              totalMovieCredits={movieCreditsQuery.data?.cast?.length || 0}
              totalTvCredits={tvCreditsQuery.data?.cast?.length || 0}
              isLoading={
                movieCreditsQuery.isFetching ||
                movieCreditsQuery.isLoading ||
                tvCreditsQuery.isFetching ||
                tvCreditsQuery.isLoading
              }
            />

            <Center width='100%'>
              <Like
                renderButton={({ isLiked, onClick }) => (
                  <Button
                    color={isLiked ? 'red' : 'gray'}
                    renderLeftIcon={({ fontSize }) => handleReturnIcon(isLiked, fontSize)}
                    isFullWidth
                    isDisabled={
                      personQuery.isFetching ||
                      personQuery.isLoading ||
                      _.isNil(personQuery.data) ||
                      _.isEmpty(personQuery.data)
                    }
                    onClick={() => onClick()}
                    size='lg'
                    variant='outlined'
                  >
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                )}
                mediaType='person'
                mediaItem={personQuery.data}
              />
            </Center>
          </VStack>
        </Center>
      </Stack>

      {/* {imagesQuery.isSuccess || taggedImagesQuery.isSuccess ? (
        <MediaViewer
          isOpen={isMediaViewerOpen}
          selected={{ type: 'photo', asset: selectedPhoto }}
          photos={[...(imagesQuery.data?.profiles || []), ...(taggedImagesQuery.data?.results.profiles || [])]}
          mediaType='person'
          onClose={onMediaViewerClose}
        />
      ) : null} */}
    </>
  );
};

export default Person;
