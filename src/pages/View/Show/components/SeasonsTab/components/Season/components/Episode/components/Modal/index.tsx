import { ReactElement, useState, useEffect } from 'react';

import { useColorMode, useDisclosure, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from '../../../../../../../../../../../common/scripts/axios';
import { Images, Videos } from '../../../../../../../../../../../common/types';
import { EpisodeCredits } from '../../../../../../../../../../../common/types/tv';
import { handleReturnDate } from '../../../../../../../../../../../common/utils';
import MediaViewer from '../../../../../../../../../../../components/MediaViewer';
import { MediaViewerProps, MediaViewerType } from '../../../../../../../../../../../components/MediaViewer/types';
import Modal from '../../../../../../../../../../../components/Modal';
import Media from '../../../../../../../../../components/Media';
import Overview from '../../../Overview';
import Cast from './components/Cast';
import Crew from './components/Crew';
import { EpisodeModalProps } from './types';

const EpisodeModal = (props: EpisodeModalProps): ReactElement => {
  const source = axios.CancelToken.source();

  const { colorMode } = useColorMode();
  const { isOpen: isMediaViewerOpen, onOpen: onMediaViewerOpen, onClose: onMediaViewerClose } = useDisclosure();

  const { tvId, seasonNumber, episode, isOpen = false, onClose } = props;
  const { name, air_date: date, episode_number: number, overview } = episode;

  const [selectedAsset, setSelectedAsset] = useState<MediaViewerProps['selected']>();

  // Fetching tv show episode credits
  const creditsQuery = useQuery(
    [`tv-show-credits-${tvId}-season-${seasonNumber}-episode-${number}`, tvId],
    async () => {
      const { data } = await axiosInstance.get<EpisodeCredits>(
        `/tv/${tvId}/season/${seasonNumber}/episode/${number}/credits`,
        {
          cancelToken: source.token
        }
      );
      return data;
    },
    { enabled: isOpen }
  );

  // Fetching tv show episode images
  const imagesQuery = useQuery(
    [`tv-show-images-${tvId}-season-${seasonNumber}-episode-${number}`, tvId],
    async () => {
      const { data } = await axiosInstance.get<Images>(`/tv/${tvId}/season/${seasonNumber}/episode/${number}/images`, {
        cancelToken: source.token
      });
      return data;
    },
    { enabled: isOpen }
  );

  // Fetching tv show episode videos
  const videosQuery = useQuery(
    [`tv-show-videos-${tvId}-season-${seasonNumber}-episode-${number}`, tvId],
    async () => {
      const { data } = await axiosInstance.get<Videos>(`/tv/${tvId}/season/${seasonNumber}/episode/${number}/videos`, {
        cancelToken: source.token
      });
      return data;
    },
    { enabled: isOpen }
  );

  const handleMediaClick = (asset: string, type: MediaViewerType): void => {
    setSelectedAsset({ type, asset: asset });
    onMediaViewerOpen();
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <>
      <Modal
        title={
          <VStack alignItems='flex-start' spacing={0}>
            <Text
              align='left'
              fontSize='xl'
              fontWeight='semibold'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
            >
              {name}
            </Text>
            <Text
              align='left'
              fontSize='sm'
              fontWeight='normal'
              color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
            >
              {handleReturnDate(date, 'full')}
            </Text>
          </VStack>
        }
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size='6xl'
      >
        <VStack width='100%' spacing={4} p={2}>
          <Overview overview={overview} isLoading={!isOpen} />

          <Cast
            title='Cast'
            cast={creditsQuery.data?.cast}
            name={name}
            isError={creditsQuery.isError}
            isSuccess={creditsQuery.isSuccess}
            isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
          />

          <Cast
            title='Guest Stars'
            cast={creditsQuery.data?.guest_stars}
            name={name}
            isError={creditsQuery.isError}
            isSuccess={creditsQuery.isSuccess}
            isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
          />

          <Crew
            crew={creditsQuery.data?.crew}
            name={name}
            isError={creditsQuery.isError}
            isSuccess={creditsQuery.isSuccess}
            isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
          />

          <Media
            title={name}
            photos={[...(imagesQuery.data?.posters || []), ...(imagesQuery.data?.stills || [])]}
            videos={videosQuery.data?.results}
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
            onClick={handleMediaClick}
          />
        </VStack>
      </Modal>

      {imagesQuery.isSuccess || videosQuery.isSuccess ? (
        <MediaViewer
          isOpen={isMediaViewerOpen}
          selected={selectedAsset}
          photos={[...(imagesQuery.data?.posters || []), ...(imagesQuery.data?.stills || [])]}
          backdrops={[...(imagesQuery.data?.backdrops || [])]}
          videos={[...(videosQuery.data?.results.filter((video) => video.site === 'YouTube') || [])]}
          mediaType='tv'
          onClose={onMediaViewerClose}
        />
      ) : null}
    </>
  );
};

export default EpisodeModal;
