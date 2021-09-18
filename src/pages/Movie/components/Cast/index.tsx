import React, { ReactElement } from 'react';

import _ from 'lodash';

import { Cast as CastType } from '../../../../common/types/movie';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../components/Poster/Vertical';
import { CastProps } from './types';

const Cast = (props: CastProps): ReactElement => {
  const { cast, isError = false, isSuccess = false, isLoading = false } = props;

  return (
    <HorizontalGrid
      title='Cast'
      // TODO: Once tabs are implemented add logic to re-direct to cast/crew tab
      // footer={
      // }
      isLoading={isLoading}
      hasDivider
      variant='outlined'>
      {!isLoading && isError ? (
        <Error label='Oh no! Something went wrong' description='Failed to fetch people list!' variant='transparent' />
      ) : !isLoading && isSuccess && cast && cast.length === 0 ? (
        <Empty label='People list is currently empty!' variant='transparent' />
      ) : !isLoading && isSuccess && cast && cast.length > 0 ? (
        <>
          {cast.map((person: CastType) => (
            <VerticalPoster
              key={person.id}
              width={['185px', '205px', '230px']}
              mediaItem={person ? { ...person } : undefined}
              mediaType='person'
              image={{
                alt: `${person?.name || ''} person poster`,
                src: person?.profile_path || '',
                size: {
                  thumbnail: 'w45',
                  full: 'original'
                }
              }}
              title={person?.name || ''}
              subtitle={`As ${person.character}`}
              isLoading={isLoading}
            />
          ))}
        </>
      ) : (
        <>
          {_.range(0, 20).map((_dummy, index: number) => (
            <VerticalPoster
              key={index}
              width={['185px', '205px', '230px']}
              mediaType='person'
              title='Lorem ipsum'
              subtitle='2021 • Lorem ipsum dolor sit amet'
              isLoading
            />
          ))}
        </>
      )}
    </HorizontalGrid>
  );
};

export default Cast;
