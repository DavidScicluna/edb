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
  const {
    width,
    mediaItem,
    mediaType,
    image,
    rating,
    title = 'Lorem ipsum',
    subtitle = 'Lorem ipsum',
    isLoading = false
  } = props;

  const [isHoveringLiked, setIsHoveringLiked] = useState<boolean>(false);
  const [isHoveringBookmark, setIsHoveringBookmark] = useState<boolean>(false);

  return (
    <Link
      isDisabled={isLoading || isHoveringLiked || isHoveringBookmark}
      to={{ pathname: `/${mediaType}/${mediaItem?.id || ''}` }}>
      <Card isDisabled={isLoading} isLightGray>
        <VStack width={width} position='relative' spacing={1} p={1}>
          {/* Image */}
          <Image
            orientation='vertical'
            mediaType={mediaType}
            alt={image.alt}
            src={image.src}
            size={image.size}
            isLoading={isLoading}
          />
          <VStack width='100%' spacing={mediaType !== 'person' ? 0.5 : 1}>
            {/* Header */}
            {mediaType !== 'person' ? (
              <HStack width='100%' justify='space-between' spacing={0}>
                {/* Rating component */}
                <Rating rating={rating} isLoading={isLoading} />

                <HStack spacing={0}>
                  {/* Like component */}
                  <Box onMouseEnter={() => setIsHoveringLiked(true)} onMouseLeave={() => setIsHoveringLiked(false)}>
                    <Like isDisabled={isLoading} title={title} mediaType={mediaType} mediaItem={mediaItem} size='sm' />
                  </Box>
                  {/* List component */}
                  <Box
                    onMouseEnter={() => setIsHoveringBookmark(true)}
                    onMouseLeave={() => setIsHoveringBookmark(false)}>
                    <Bookmark
                      isDisabled={isLoading}
                      title={title}
                      mediaType={mediaType}
                      mediaItem={mediaItem}
                      size='sm'
                    />
                  </Box>
                </HStack>
              </HStack>
            ) : null}
            {/* Text */}
            <VStack width='100%' alignItems='flex-start' spacing={0}>
              <Title title={title} isLoading={isLoading} />
              <Subtitle subtitle={subtitle} isLoading={isLoading} />
            </VStack>
          </VStack>

          {/* Like component */}
          {mediaType === 'person' ? (
            <HStack
              spacing={0}
              sx={{
                position: 'absolute',
                top: 1,
                right: 2
              }}>
              <Box onMouseEnter={() => setIsHoveringLiked(true)} onMouseLeave={() => setIsHoveringLiked(false)}>
                <Like isDisabled={isLoading} title={title} mediaType={mediaType} mediaItem={mediaItem} size='sm' />
              </Box>
            </HStack>
          ) : null}
        </VStack>
      </Card>
    </Link>
  );
};

export default VerticalPoster;
