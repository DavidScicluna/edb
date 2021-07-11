import React, { ReactElement } from 'react';

import { HStack, VStack, Box } from '@chakra-ui/react';

import Card from '../../../components/Clickable/Card';
import Bookmark from '../../Bookmark';
import Image from '../../Image';
import Like from '../../Like';
import Rating from '../../Rating';
import Description from './components/Description';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { HorizontalPosterProps } from './types';

const HorizontalPoster = (props: HorizontalPosterProps): ReactElement => {
  const { mediaItemID, mediaType, image, rating, title, subtitle, description, isLoaded } = props;

  return (
    <Card isFullWidth isDisabled={!isLoaded} isLightGray>
      <HStack width='100%' position='relative' spacing={[1, 1, 1.5, 1.5, 2, 2]} p={[1, 1, 1.5, 1.5, 2, 2]}>
        {/* Image */}
        <Image
          width={['96px', '120px', '144px', '168px']}
          orientation='vertical'
          mediaType={mediaType}
          alt={image.alt}
          src={image.src}
          size={image.size}
          isLoaded={isLoaded}
        />
        <VStack
          width={['calc(100% - 96px)', 'calc(100% - 120px)', 'calc(100% - 144px)', 'calc(100% - 168px)']}
          alignItems='flex-start'
          spacing={[0.5, 0.5, 1, 1.5, 1.5, 2]}>
          {/* Rating component */}
          {mediaType !== 'person' ? <Rating rating={rating} isLoaded={isLoaded} /> : null}

          {/* Text */}
          <VStack width='100%' alignItems='flex-start' spacing={isLoaded ? 0 : 1}>
            <Title title={title} isLoaded={isLoaded} />
            <Subtitle subtitle={subtitle} isLoaded={isLoaded} />
          </VStack>

          <Box width='100%'>
            <Description title={title} description={description} isLoaded={isLoaded} />
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
          <Like isDisabled={!isLoaded} mediaItem={{ id: mediaItemID, title, mediaType }} size='md' />
          {/* List component */}
          {mediaType !== 'person' ? (
            <Bookmark isDisabled={!isLoaded} mediaItem={{ id: mediaItemID, title, mediaType }} size='md' />
          ) : null}
        </HStack>
      </HStack>
    </Card>
  );
};

export default HorizontalPoster;
