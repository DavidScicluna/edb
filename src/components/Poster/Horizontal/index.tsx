import React, { ReactElement } from 'react';

import { useColorMode, HStack, VStack, Box } from '@chakra-ui/react';

import Bookmark from '../../Bookmark';
import Image from '../../Image';
import Like from '../../Like';
import Rating from '../../Rating';
import Description from './components/Description';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { HorizontalPosterProps } from './types';

const HorizontalPoster = (props: HorizontalPosterProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { mediaType, image, rating, title, subtitle, description, isLoaded } = props;

  return (
    <HStack
      background='transparent'
      borderRadius='lg'
      border='solid2'
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      spacing={[1, 2]}
      p={[1, 2]}
      sx={{ position: 'relative' }}>
      {/* Image */}
      <Image
        width={['96px', '120px', '144px', '168px']}
        orientation='vertical'
        mediaType={mediaType}
        alt={image.alt}
        src={image.src}
        // fallbackSrc={image.fallbackSrc}
        size={image.size}
        isLoaded={isLoaded}
      />
      <VStack
        width={['calc(100% - 96px)', 'calc(100% - 120px)', 'calc(100% - 144px)', 'calc(100% - 168px)']}
        alignItems='flex-start'
        spacing={isLoaded ? 1 : 2}>
        {/* Rating component */}
        {mediaType !== 'person' ? <Rating rating={rating} isLoaded={isLoaded} /> : null}

        {/* Text */}
        <VStack width='100%' alignItems='flex-start' spacing={isLoaded ? 0 : 1}>
          <Title title={title} isLoaded={isLoaded} />
          <Subtitle subtitle={subtitle} isLoaded={isLoaded} />
        </VStack>

        <Box width='100%'>
          <Description description={description} isLoaded={isLoaded} />
        </Box>
      </VStack>

      {/* Like / List Icon buttons */}
      <HStack
        spacing={0}
        sx={{
          position: 'absolute',
          top: 1,
          right: 1
        }}>
        {/* Like component */}
        <Like isLiked={false} isDisabled={!isLoaded} title={title} mediaType={mediaType} />
        {/* List component */}
        {mediaType !== 'person' ? (
          <Bookmark isBookmarked={false} isDisabled={!isLoaded} title={title} mediaType={mediaType} />
        ) : null}
      </HStack>
    </HStack>
  );
};

export default HorizontalPoster;
