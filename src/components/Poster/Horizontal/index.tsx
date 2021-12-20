import { ReactElement } from 'react';

import {
  useTheme,
  useMediaQuery,
  useBreakpointValue,
  useBoolean,
  HStack,
  VStack,
  Box,
  AspectRatio,
  Fade
} from '@chakra-ui/react';
import useInView from 'react-cool-inview';

import { MediaType } from '../../../common/types';
import { Theme } from '../../../theme/types';
import Card from '../..//Clickable/Card';
import Link from '../../Clickable/Link';
import Image from '../../Image';
import Rating from '../../Rating';
import Skeleton from '../../Skeleton';
import Bookmark from '../components/Bookmark';
import Like from '../components/Like';
import Description from './components/Description';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { HorizontalPosterProps } from './types';

const width = ['100px', '116px', '152px', '188px', '188px', '224px'];

const HorizontalPoster = <MT extends MediaType>(props: HorizontalPosterProps<MT>): ReactElement => {
  const theme = useTheme<Theme>();
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

  const {
    mediaItem,
    mediaType,
    image,
    rating,
    title = 'Lorem ipsum',
    subtitle = 'Lorem ipsum',
    description = 'Lorem ipsum',
    isLoading = false
  } = props;

  const [isDisabled, setIsDisabled] = useBoolean();

  return (
    <Link isDisabled={isLoading || isDisabled} to={{ pathname: `/${mediaType}/${mediaItem?.id || ''}` }}>
      <Card isFullWidth isDisabled={isLoading} isClickable={!isDisabled} isLight>
        <HStack width='100%' position='relative' spacing={[1, 1, 2, 2, 2, 2]} p={[1, 1, 2, 2, 2, 2]}>
          {/* Image */}
          <Box
            ref={ref}
            as={AspectRatio}
            width={width}
            minWidth={width}
            maxWidth={width}
            borderRadius='base'
            ratio={2 / 3}
          >
            <Fade in={isLoading || inView} unmountOnExit style={{ width: 'inherit', borderRadius: 'inherit' }}>
              <AspectRatio width={width} minWidth={width} maxWidth={width} borderRadius='base' ratio={2 / 3}>
                <Skeleton isLoaded={!isLoading && Boolean(image)} borderRadius='base'>
                  <Image
                    alt={image?.alt || ''}
                    mediaType={mediaType}
                    maxWidth='none'
                    height='100%'
                    borderRadius='base'
                    thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.thumbnail || ''}${
                      image?.src || ''
                    }`}
                    fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${image?.size.full || ''}${image?.src || ''}`}
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
            spacing={[1, 1, 2, 2, 2, 2]}
          >
            {/* Rating */}
            {mediaType !== 'person' ? (
              <Rating
                rating={rating}
                isLoading={isLoading}
                iconFontsize={iconSize}
                textFontsize={['sm', 'sm', 'md', 'lg', 'lg', 'xl']}
              />
            ) : null}

            <VStack width='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0}>
              <Title title={title} isLoading={isLoading} />
              <Subtitle subtitle={subtitle} isLoading={isLoading} />
            </VStack>

            <Box width='100%' onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
              {typeof description === 'string' ? (
                <Description
                  mediaType={mediaType}
                  mediaItem={{ id: mediaItem?.id || -1, title, description }}
                  isLoading={isLoading}
                />
              ) : (
                description
              )}
            </Box>
          </VStack>

          {/* Like / List Icon buttons */}
          {mediaItem ? (
            <HStack
              spacing={0}
              sx={{
                position: 'absolute',
                top: 1,
                right: 1
              }}
            >
              {/* Like component */}
              <Box onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                <Like
                  title={title}
                  mediaType={mediaType}
                  mediaItem={mediaItem}
                  isLoading={isLoading}
                  size={isSm ? 'md' : 'lg'}
                />
              </Box>
              {/* List component */}
              {mediaType !== 'person' ? (
                <Box onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
                  <Bookmark
                    title={title}
                    mediaType={mediaType}
                    mediaItem={mediaItem}
                    isLoading={isLoading}
                    size={isSm ? 'md' : 'lg'}
                  />
                </Box>
              ) : null}
            </HStack>
          ) : null}
        </HStack>
      </Card>
    </Link>
  );
};

export default HorizontalPoster;
