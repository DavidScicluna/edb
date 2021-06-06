import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, HStack } from '@chakra-ui/react';

import Bookmark from '../../Bookmark';
import Image from '../../Image';
import Like from '../../Like';
import Rating from '../../Rating';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { VerticalPosterProps } from './types';

const VerticalPoster = (props: VerticalPosterProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isTablet] = useMediaQuery(['(min-width: 960px)']);

  const { width, type, image, rating, title, subtitle, isLoaded } = props;

  return (
    <VStack
      width={width}
      background='transparent'
      borderRadius='lg'
      border='solid2'
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      spacing={1}
      p='1'>
      {/* Image */}
      <Image
        orientation='vertical'
        alt={image.alt}
        src={image.src}
        // fallbackSrc={image.fallbackSrc}
        size={image.size}
        isLoaded={isLoaded}
      />
      <VStack width='100%' spacing={1}>
        {/* Header */}
        <HStack width='100%' justify='space-between' spacing={1}>
          {/* Rating component */}
          {type !== 'person' ? <Rating rating={rating} isLoaded={isLoaded} /> : null}

          <HStack spacing={0}>
            {/* Like component */}
            <Like isLiked={false} isDisabled={!isLoaded} title={title} type={type} size={isTablet ? 'sm' : 'xs'} />
            {/* List component */}
            {type !== 'person' ? (
              <Bookmark
                isBookmarked={false}
                isDisabled={!isLoaded}
                title={title}
                type={type}
                size={isTablet ? 'sm' : 'xs'}
              />
            ) : null}
          </HStack>
        </HStack>
        {/* Text */}
        <VStack width='100%' alignItems='flex-start' spacing={0}>
          <Title title={title} isLoaded={isLoaded} />
          <Subtitle subtitle={subtitle} isLoaded={isLoaded} />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default VerticalPoster;
