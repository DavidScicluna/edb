import React, { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { PartialTV } from '../../../../common/types/tv';
import Empty from '../../../Empty';
import Error from '../../../Error';
import HorizontalPoster from '../../Poster/Horizontal';
import VerticalPoster from '../../Poster/Vertical';
import { GridProps } from '../types';

const VerticalTV = ({ isLoading, isError, isSuccess, tv }: GridProps): ReactElement => {
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.data.displayMode);

  return isLoading && hasOptionsDownloaded ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
      {[...Array(tv ? tv.length : 20)].map((_dummy, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster key={index} isLoading />
        ) : (
          <VerticalPoster key={index} width='100%' isLoading />
        )
      )}
    </SimpleGrid>
  ) : isError ? (
    <Error label='Oh no! Something went wrong' description='Failed to fetch TV list!' variant='outlined' />
  ) : isSuccess && tv ? (
    <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
      {tv.map((show: PartialTV, index: number) =>
        displayMode === 'list' ? (
          <HorizontalPoster key={index} isLoading={false} show={show} />
        ) : (
          <VerticalPoster key={index} width='100%' isLoading={false} show={show} />
        )
      )}
    </SimpleGrid>
  ) : (
    <Empty label='TV list is currently empty!' variant='outlined' />
  );
};

export default VerticalTV;
