import React, { ReactElement } from 'react';

import { useMediaQuery, useBoolean, HStack, VStack, Box } from '@chakra-ui/react';

import { MediaType } from '../../../common/types/types';
import Card from '../../../components/Clickable/Card';
import Link from '../../../components/Clickable/Link';
import Bookmark from '../../Bookmark';
import Like from '../../Like';
import Rating from '../../Rating';
import Image from '../components/Image';
import Description from './components/Description';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { HorizontalPosterProps } from './types';

const HorizontalPoster = <MT extends MediaType>(props: HorizontalPosterProps<MT>): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 480px)');

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

  const [isHoveringLiked, setIsHoveringLiked] = useBoolean();
  const [isHoveringBookmark, setIsHoveringBookmark] = useBoolean();
  const [isHoveringDescription, setIsHoveringDescription] = useBoolean();

  return (
    <Link
      isDisabled={isLoading || isHoveringLiked || isHoveringBookmark || isHoveringDescription}
      to={{ pathname: `${mediaType}/${mediaItem?.id || ''}` }}>
      <Card
        isFullWidth
        isDisabled={isLoading}
        isClickable={!isHoveringLiked && !isHoveringBookmark && !isHoveringDescription}
        isLightGray>
        <HStack width='100%' position='relative' spacing={[1, 1, 2, 2, 2, 2]} p={[1, 1, 2, 2, 2, 2]}>
          {/* Image */}
          <Image
            width={['100px', '116px', '152px', '188px', '188px', '224px']}
            orientation='vertical'
            mediaType={mediaType}
            alt={image.alt}
            src={image.src}
            size={image.size}
            isLoading={isLoading}
          />
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
            {/* Rating component */}
            {mediaType !== 'person' ? <Rating rating={rating} isLoading={isLoading} isHorizontal /> : null}

            {/* Text */}
            <VStack width='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0}>
              <Title title={title} isLoading={isLoading} />
              <Subtitle subtitle={subtitle} isLoading={isLoading} />
            </VStack>

            <Box width='100%'>
              <Box
                onMouseEnter={() => setIsHoveringDescription.on()}
                onMouseLeave={() => setIsHoveringDescription.off()}>
                <Description
                  mediaType={mediaType}
                  mediaItem={{ id: mediaItem?.id || -1, title, description }}
                  isLoading={isLoading}
                />
              </Box>
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
              }}>
              {/* Like component */}
              <Box onMouseEnter={() => setIsHoveringLiked.on()} onMouseLeave={() => setIsHoveringLiked.off()}>
                <Like
                  isDisabled={isLoading}
                  title={title}
                  mediaType={mediaType}
                  mediaItem={mediaItem}
                  size={isSm ? 'sm' : 'md'}
                />
              </Box>
              {/* List component */}
              {mediaType !== 'person' ? (
                <Box onMouseEnter={() => setIsHoveringBookmark.on()} onMouseLeave={() => setIsHoveringBookmark.off()}>
                  <Bookmark
                    isDisabled={isLoading}
                    title={title}
                    mediaType={mediaType}
                    mediaItem={mediaItem}
                    size={isSm ? 'sm' : 'md'}
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
