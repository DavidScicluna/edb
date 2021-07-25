import React, { ReactElement, useState } from 'react';

import { VStack, HStack, Box } from '@chakra-ui/react';

import { MediaType } from '../../../common/types/types';
import Card from '../../../components/Clickable/Card';
import Link from '../../../components/Clickable/Link';
import Bookmark from '../../Bookmark';
import Image from '../../Image';
import Like from '../../Like';
import Rating from '../../Rating';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { VerticalPosterProps } from './types';

const VerticalPoster = <MT extends MediaType>(props: VerticalPosterProps<MT>): ReactElement => {
  const { width, mediaItem, mediaType, image, rating, title, subtitle, isLoaded } = props;

  const [isHoveringLiked, setIsHoveringLiked] = useState<boolean>(false);
  const [isHoveringBookmark, setIsHoveringBookmark] = useState<boolean>(false);

  return (
    <Link
      isDisabled={!isLoaded || isHoveringLiked || isHoveringBookmark}
      to={{ pathname: `/${mediaType}/${mediaItem?.id || ''}` }}>
      <Card isDisabled={!isLoaded} isLightGray>
        <VStack width={width} position='relative' spacing={1} p={1}>
          {/* Image */}
          <Image
            orientation='vertical'
            mediaType={mediaType}
            alt={image.alt}
            src={image.src}
            size={image.size}
            isLoaded={isLoaded}
          />
          <VStack width='100%' spacing={mediaType !== 'person' ? 0.5 : 1}>
            {/* Header */}
            {mediaType !== 'person' ? (
              <HStack width='100%' justify='space-between' spacing={0}>
                {/* Rating component */}
                <Rating rating={rating} isLoaded={isLoaded} />

                {mediaItem ? (
                  <HStack spacing={0}>
                    {/* Like component */}
                    <Box onMouseEnter={() => setIsHoveringLiked(true)} onMouseLeave={() => setIsHoveringLiked(false)}>
                      <Like
                        isDisabled={!isLoaded}
                        title={title}
                        mediaType={mediaType}
                        mediaItem={mediaItem}
                        size='sm'
                      />
                    </Box>
                    {/* List component */}
                    <Box
                      onMouseEnter={() => setIsHoveringBookmark(true)}
                      onMouseLeave={() => setIsHoveringBookmark(false)}>
                      <Bookmark
                        isDisabled={!isLoaded}
                        title={title}
                        mediaType={mediaType}
                        mediaItem={mediaItem}
                        size='sm'
                      />
                    </Box>
                  </HStack>
                ) : null}
              </HStack>
            ) : null}
            {/* Text */}
            <VStack width='100%' alignItems='flex-start' spacing={0}>
              <Title title={title} isLoaded={isLoaded} />
              <Subtitle subtitle={subtitle} isLoaded={isLoaded} />
            </VStack>
          </VStack>

          {/* Like component */}
          {mediaType === 'person' && mediaItem ? (
            <HStack
              spacing={0}
              sx={{
                position: 'absolute',
                top: 1,
                right: 2
              }}>
              <Box onMouseEnter={() => setIsHoveringLiked(true)} onMouseLeave={() => setIsHoveringLiked(false)}>
                <Like isDisabled={!isLoaded} title={title} mediaType={mediaType} mediaItem={mediaItem} size='sm' />
              </Box>
            </HStack>
          ) : null}
        </VStack>
      </Card>
    </Link>
  );
};

export default VerticalPoster;
