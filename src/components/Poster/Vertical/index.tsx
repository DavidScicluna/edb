import React, { ReactElement } from 'react';

import { useBreakpointValue, VStack, HStack } from '@chakra-ui/react';

import Card from '../../../components/Clickable/Card';
import Bookmark from '../../Bookmark';
import Image from '../../Image';
import Like from '../../Like';
import Rating from '../../Rating';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { VerticalPosterProps } from './types';

const VerticalPoster = (props: VerticalPosterProps): ReactElement => {
  const size = useBreakpointValue({
    'base': 'xs',
    'sm': 'xs',
    'md': 'xs',
    'lg': 'md',
    'xl': 'md',
    '2xl': 'md'
  });

  const { width, mediaItemID, mediaType, image, rating, title, subtitle, isLoaded } = props;

  return (
    <Card isDisabled={!isLoaded} isLightGray>
      <VStack
        width={width}
        position='relative'
        spacing={mediaType !== 'person' ? (size === 'sm' ? 0.25 : 0.5) : 1}
        p={1}>
        {/* Image */}
        <Image
          orientation='vertical'
          mediaType={mediaType}
          alt={image.alt}
          src={image.src}
          size={image.size}
          isLoaded={isLoaded}
        />
        <VStack width='100%' spacing={mediaType === 'person' ? 1 : 0}>
          {/* Header */}
          {mediaType !== 'person' ? (
            <HStack width='100%' justify='space-between' spacing={0}>
              {/* Rating component */}
              <Rating rating={rating} isLoaded={isLoaded} />

              <HStack spacing={0}>
                {/* Like component */}
                <Like isDisabled={!isLoaded} mediaItem={{ id: mediaItemID, title, mediaType }} size='xs' />
                {/* List component */}
                <Bookmark isDisabled={!isLoaded} mediaItem={{ id: mediaItemID, title, mediaType }} size='xs' />
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
              top: 0,
              right: 1
            }}>
            <Like isDisabled={!isLoaded} mediaItem={{ id: mediaItemID, title, mediaType }} size='xs' />
          </HStack>
        ) : null}
      </VStack>
    </Card>
  );
};

export default VerticalPoster;
