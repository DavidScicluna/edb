import React, { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { PartialPerson } from '../../../../common/types/person';
import Empty from '../../../Empty';
import Error from '../../../Error';
import HorizontalPoster from '../../Poster/Horizontal';
import VerticalPoster from '../../Poster/Vertical';
import { GridProps } from '../types';

const VerticalPeople = ({ isLoading, isError, isSuccess, people }: GridProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.ui.displayMode);

  return isLoading && !hasOptionsDownloaded ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
      {[...Array(people ? people.length : 20)].map((_dummy, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster key={index} isLoading />
        ) : (
          <VerticalPoster key={index} width='100%' isLoading />
        )
      )}
    </SimpleGrid>
  ) : isSuccess && people && people.length > 0 ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
      {people.map((person: PartialPerson, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster key={index} isLoading={false} person={person} />
        ) : (
          <VerticalPoster key={index} width='100%' isLoading={false} person={person} />
        )
      )}
    </SimpleGrid>
  ) : isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch people list!' variant='outlined' />
  ) : (
    <Empty label='People list is currently empty!' variant='outlined' />
  );
};

export default VerticalPeople;
