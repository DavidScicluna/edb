import React, { ReactElement } from 'react';

import { useColorMode, Box, Flex, Spacer, VStack } from '@chakra-ui/react';

import { Type, Image as ImageProps, Rating as RatingProps } from '../../../common/types/types';
import Image from '../../Image';
import Like from '../../Like';
import List from '../../List';
import Rating from '../../Rating';
import Subtitle from './components/Subtitle';
import Title from './components/Title';

interface VerticalPosterProps {
  type: Type;
  image: ImageProps;
  rating?: RatingProps;
  title: string;
  subtitle: string;
  isLoaded: boolean;
}

const maxWidth: string[] = ['185px'];

const VerticalPoster = (props: VerticalPosterProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { type, image, rating, title, subtitle, isLoaded } = props;

  return (
    <Box
      // isExternal={false}
      background='transparent'
      borderRadius='lg'
      border='solid2'
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p='1'>
      {/* Image */}
      <Image
        maxWidth={maxWidth}
        orientation='vertical'
        alt={image.alt}
        src={image.src}
        // fallbackSrc={image.fallbackSrc}
        size={image.size}
        isLoaded={isLoaded}
      />
      <Box maxWidth={maxWidth} mt='1'>
        {/* Header */}
        <Flex direction='row' alignItems='center' justify='space-between' mb='0.5'>
          {/* Rating component */}
          {type !== 'person' ? (
            <>
              <Rating rating={rating} isLoaded={isLoaded} />
              <Spacer />
            </>
          ) : null}

          {/* Like / List Icon buttons */}
          <Flex direction='row' alignItems='center' justify='center'>
            {/* Like component */}
            <Like isLiked={false} isDisabled={!isLoaded} title={title} type={type} />
            {/* List component */}
            {type !== 'person' ? <List isListed={false} isDisabled={!isLoaded} title={title} type={type} /> : null}
          </Flex>
        </Flex>
        {/* Text */}
        <VStack spacing={0} mt='0.5'>
          <Title title={title} isLoaded={isLoaded} maxWidth={maxWidth} />
          <Subtitle subtitle={subtitle} isLoaded={isLoaded} maxWidth={maxWidth} />
        </VStack>
      </Box>
    </Box>
  );
};

export default VerticalPoster;
