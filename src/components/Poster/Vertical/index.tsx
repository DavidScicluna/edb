import React, { ReactElement } from 'react';

import { useColorMode, VStack, HStack } from '@chakra-ui/react';

import Bookmark from '../../Bookmark';
import Image from '../../Image';
import Like from '../../Like';
import Rating from '../../Rating';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { VerticalPosterProps } from './types';

const VerticalPoster = (props: VerticalPosterProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { width, mediaType, image, rating, title, subtitle, isLoaded } = props;

  return (
    <VStack
      width={width}
      position='relative'
      background='transparent'
      borderRadius='lg'
      border='solid2'
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      spacing={1}
      p='1'>
      {/* Image */}
      <Image
        orientation='vertical'
        mediaType={mediaType}
        alt={image.alt}
        src={image.src}
        size={image.size}
        isLoaded={isLoaded}
      />
      <VStack width='100%' spacing={1}>
        {/* Header */}
        {mediaType !== 'person' ? (
          <HStack width='100%' justify='space-between' spacing={1}>
            {/* Rating component */}
            <Rating rating={rating} isLoaded={isLoaded} type='vertical' />

            <HStack spacing={0}>
              {/* Like component */}
              <Like isLiked={false} isDisabled={!isLoaded} title={title} mediaType={mediaType} size='xs' />
              {/* List component */}
              <Bookmark isBookmarked={false} isDisabled={!isLoaded} title={title} mediaType={mediaType} size='xs' />
            </HStack>
          </HStack>
        ) : null}
        {/* Text */}
        <VStack width='100%' alignItems='flex-start' spacing={0}>
          <Title title={title} isLoaded={isLoaded} />
          <Subtitle subtitle={subtitle} isLoaded={isLoaded} />
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
          <Like isLiked={false} isDisabled={!isLoaded} title={title} mediaType={mediaType} />
        </HStack>
      ) : null}
    </VStack>
  );
};

export default VerticalPoster;
