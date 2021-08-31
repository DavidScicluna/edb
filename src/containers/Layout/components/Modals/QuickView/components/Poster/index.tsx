import React, { ReactElement } from 'react';

import { useMediaQuery, AspectRatio } from '@chakra-ui/react';

import Image from '../../../../../../../components/Image';
import Skeleton from '../../../../../../../components/Skeleton';
import { PosterProps } from './types';

const Poster = (props: PosterProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const { name, path, mediaType, isLoading = false } = props;

  return (
    <AspectRatio width='100%' borderRadius='lg' ratio={isSm ? 1 / 1 : 2 / 3}>
      <Skeleton isLoaded={!isLoading} borderRadius='lg'>
        <Image
          alt={`${name ? `"${name}"` : ''} ${
            mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv show' : 'profile'
          } poster`}
          mediaType={mediaType}
          maxWidth='none'
          height='100%'
          borderRadius='lg'
          src={path || ''}
          size={{
            thumbnail: mediaType === 'person' ? 'w45' : 'w92',
            full: 'original'
          }}
        />
      </Skeleton>
    </AspectRatio>
  );
};

export default Poster;
