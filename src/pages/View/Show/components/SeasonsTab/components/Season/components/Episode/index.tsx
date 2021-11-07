import { ReactElement } from 'react';

import {
  useTheme,
  useDisclosure,
  useMediaQuery,
  useBreakpointValue,
  HStack,
  VStack,
  Box,
  AspectRatio,
  Fade
} from '@chakra-ui/react';
import useInView from 'react-cool-inview';

import Badge from '../../../../../../../../../components/Badge';
import Card from '../../../../../../../../../components/Clickable/Card';
import Image from '../../../../../../../../../components/Image';
import Rating from '../../../../../../../../../components/Rating';
import Skeleton from '../../../../../../../../../components/Skeleton';
import { Theme } from '../../../../../../../../../theme/types';
import Date from './components/Date';
import Modal from './components/Modal';
import Name from './components/Name';
import Overview from './components/Overview';
import { EpisodeProps } from './types';

const width = ['100px', '116px', '152px', '188px', '188px', '224px'];

const Episode = (props: EpisodeProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSm] = useMediaQuery('(max-width: 600px)');
  const iconSize = useBreakpointValue({
    'base': theme.fontSizes['lg'],
    'sm': theme.fontSizes['lg'],
    'md': theme.fontSizes['xl'],
    'lg': theme.fontSizes['2xl'],
    'xl': theme.fontSizes['2xl'],
    '2xl': theme.fontSizes['3xl']
  });

  const { observe: ref, inView } = useInView<HTMLDivElement>({
    threshold: [0.2, 0.4, 0.6, 0.8, 1],
    unobserveOnEnter: true
  });

  const { tvId, seasonNumber, episode, isLoading = false } = props;
  const {
    name = 'Lorem ipsum',
    air_date: date = 'Lorem ipsum',
    overview = 'Lorem ipsum',
    episode_number: number
  } = episode || {};

  return (
    <>
      <Card isFullWidth isDisabled={isLoading} isClickable onClick={() => onOpen()} isLight>
        <HStack width='100%' position='relative' spacing={[1, 1, 2, 2, 2, 2]} p={[1, 1, 2, 2, 2, 2]}>
          {/* Image */}
          <Box
            ref={ref}
            as={AspectRatio}
            width={width}
            minWidth={width}
            maxWidth={width}
            borderRadius='base'
            ratio={2 / 3}>
            <Fade in={isLoading || inView} unmountOnExit style={{ width: 'inherit', borderRadius: 'inherit' }}>
              <AspectRatio width={width} minWidth={width} maxWidth={width} borderRadius='base' ratio={2 / 3}>
                <Skeleton isLoaded={!isLoading} borderRadius='base'>
                  <Image
                    alt={`${episode?.name || ''} episode poster`}
                    maxWidth='none'
                    height='100%'
                    mediaType='tv'
                    borderRadius='base'
                    thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w92${episode?.still_path || ''}`}
                    fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${episode?.still_path || ''}`}
                  />
                </Skeleton>
              </AspectRatio>
            </Fade>
          </Box>

          <VStack
            width={[
              'calc(100% - 108px)',
              'calc(100% - 124px)',
              'calc(100% - 168px)',
              'calc(100% - 204px)',
              'calc(100% - 204px)',
              'calc(100% - 240px)'
            ]}
            alignItems='flex-start'
            spacing={[1, 1, 2, 2, 2, 2]}>
            {/* Rating */}
            <Rating
              rating={{
                rating: episode?.vote_average || null,
                count: episode?.vote_count || null
              }}
              isLoading={isLoading}
              iconFontsize={iconSize}
              textFontsize={['sm', 'sm', 'md', 'lg', 'lg', 'xl']}
            />

            <VStack width='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0}>
              <Name name={name} isLoading={isLoading} />
              <Date date={date} isLoading={isLoading} />
            </VStack>

            <Box width='100%'>
              <Overview overview={overview} isLoading={isLoading} />
            </Box>
          </VStack>

          {/* Episode number */}
          <Fade in={!isLoading} unmountOnExit>
            <Box
              sx={{
                position: 'absolute',
                top: isSm ? 1 : 2,
                right: isSm ? 1 : 2
              }}>
              <Badge label={`Episode ${number}`} size={isSm ? 'sm' : 'md'} />
            </Box>
          </Fade>
        </HStack>
      </Card>

      {episode && tvId && seasonNumber ? (
        <Modal tvId={tvId} seasonNumber={seasonNumber} episode={episode} isOpen={isOpen} onClose={onClose} />
      ) : null}
    </>
  );
};

export default Episode;
