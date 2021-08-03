import React, { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import utils from '../../../../common/utils/utils';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { KnownForProps } from './types';

const KnownFor = (props: KnownForProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { knownFor, name, isError = false, isSuccess = false, isLoading = false } = props;

  return (
    <HorizontalGrid
      title={
        <Text
          width='100%'
          align='left'
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          fontSize='md'
          fontWeight='medium'>
          Known for
        </Text>
      }
      isLoading={isLoading}
      variant='outlined'>
      {isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} known for list!`}
          variant='transparent'
        />
      ) : isSuccess && knownFor && knownFor.length === 0 ? (
        <Empty label={`${name ? `"${name}"` : ''} has no known for credits`} variant='transparent' />
      ) : isSuccess && knownFor && knownFor.length > 0 ? (
        <>
          {knownFor.map((mediaItem) => (
            <VerticalPoster
              key={mediaItem.id}
              width={['185px', '205px', '230px']}
              mediaItem={mediaItem ? { ...mediaItem } : undefined}
              mediaType={mediaItem ? 'movie' : 'tv'}
              image={{
                alt: `${mediaItem?.title || mediaItem?.name || ''} ${mediaItem?.title ? 'movie' : 'tv'} poster`,
                src: mediaItem?.poster_path || '',
                size: '780'
              }}
              rating={{
                rating: mediaItem?.vote_average || null,
                count: mediaItem?.vote_count || null
              }}
              title={mediaItem?.title || mediaItem?.name || ''}
              subtitle={`${[
                `${mediaItem?.job || mediaItem?.character ? `As ${mediaItem.character}` : 'Unknown'}`,
                `${utils.handleReturnDate(mediaItem?.release_date || mediaItem?.first_air_date || '', 'year')}`
              ].join(' • ')}`}
              isLoading={false}
            />
          ))}
        </>
      ) : (
        <>
          {[...Array(knownFor ? knownFor.length : 10)].map((_dummy, index: number) => (
            <VerticalPoster
              key={index}
              width={['185px', '205px', '230px']}
              mediaType='movie'
              image={{
                alt: 'Movie poster',
                src: '',
                size: '780'
              }}
              title='Lorem ipsum'
              subtitle='Lorem ipsum'
              isLoading
            />
          ))}
        </>
      )}
    </HorizontalGrid>
  );
};

export default KnownFor;
