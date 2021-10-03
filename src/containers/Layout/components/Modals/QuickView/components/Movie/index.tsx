import { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, useMediaQuery, VStack, HStack, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '../../../../../../../common/scripts/axios';
import { FullMovie, ImageResponse } from '../../../../../../../common/types/movie';
import MediaViewer from '../../../../../../../components/MediaViewer';
import Poster from '../Poster';
import Container from './components/Container';
import { MovieProps } from './types';

const Movie = (props: MovieProps): ReactElement => {
  const source = axios.CancelToken.source();

  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { id } = props;

  const [selectedPhoto, setSelectedPhoto] = useState<string>();

  // Fetching movie details
  const movieQuery = useQuery([`movie-${id}`, id], async () => {
    const { data } = await axiosInstance.get<FullMovie>(`/movie/${id}`, {
      params: {
        append_to_response: 'release_dates'
      },
      cancelToken: source.token
    });
    return data;
  });

  // Fetching movie external ids
  // const externalIdsQuery = useQuery([`movie-external_ids-${id}`, id], async () => {
  //   const { data } = await axiosInstance.get<ExternalIDs>(`/movie/${id}/external_ids`, {
  //     cancelToken: source.token
  //   });
  //   return data;
  // });

  // Fetching movie images
  const imagesQuery = useQuery([`movie-images-${id}`, id], async () => {
    const { data } = await axiosInstance.get<ImageResponse>(`/movie/${id}/images`, {
      cancelToken: source.token
    });
    return data;
  });

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
      {isSm ? (
        <VStack width='100%' maxWidth='100%' spacing={2} p={2}>
          <Poster
            name={movieQuery.data?.title || ''}
            path={movieQuery.data?.poster_path || ''}
            mediaType='movie'
            isLoading={movieQuery.isFetching || movieQuery.isLoading}
            onClickPoster={handleOnPosterClick}
          />

          <Container
            movie={movieQuery.data}
            isLoading={movieQuery.isFetching || movieQuery.isLoading}
            isError={movieQuery.isError}
          />
        </VStack>
      ) : (
        <HStack width='100%' maxWidth='100%' spacing={2} p={2}>
          <Box width='40%' maxWidth='40%'>
            <Poster
              name={movieQuery.data?.title || ''}
              path={movieQuery.data?.poster_path || ''}
              mediaType='movie'
              isLoading={movieQuery.isFetching || movieQuery.isLoading}
              onClickPoster={handleOnPosterClick}
            />
          </Box>
          <Box width='60%' maxWidth='60%'>
            <Container
              movie={movieQuery.data}
              isLoading={movieQuery.isFetching || movieQuery.isLoading}
              isError={movieQuery.isError}
            />
          </Box>
        </HStack>
      )}

      {imagesQuery.isSuccess ? (
        <MediaViewer
          isOpen={isMediaViewerOpen}
          selected={{ type: 'photo', asset: selectedPhoto }}
          photos={[...(imagesQuery.data.posters || [])]}
          backdrops={[...(imagesQuery.data.posters || [])]}
          mediaType='person'
          onClose={onMediaViewerClose}
        />
      ) : null}
    </>
  );
};

export default Movie;
