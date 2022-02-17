import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import LoadMore from '../../../../../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../../../../../components/Empty';
import Error from '../../../../../../../../../../components/Error';
import Episode from './components/Episode';
import { EpisodesProps } from './types';

const incrementBy = 10;

const Episodes = (props: EpisodesProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { showId, title, episodes, isError = false, isSuccess = false, isLoading = true } = props;

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <VStack width='100%' spacing={4}>
      <VStack width='100%' spacing={2}>
        {!isLoading && isError ? (
          <Error
            label='Oh no! Something went wrong'
            description={`Failed to fetch ${title ? `"${title}"` : 'season'} episodes list!`}
            variant='outlined'
          />
        ) : !isLoading && isSuccess && episodes && episodes.length === 0 ? (
          <Empty label={`${title ? `"${title}"` : 'Season'} episodes list is currently empty!`} variant='outlined' />
        ) : !isLoading && isSuccess && episodes && episodes.length > 0 ? (
          episodes
            .filter((_episode, index) => index < totalVisible)
            .map((episode) => <Episode key={episode.id} showId={showId} episode={episode} isLoading={false} />)
        ) : (
          _.range(0, 5).map((_dummy, index: number) => <Episode key={index} isLoading />)
        )}
      </VStack>

      <ScaleFade
        in={(episodes?.length || 0) > 0 && (episodes?.length || 0) > incrementBy}
        unmountOnExit
        style={{ width: isSm ? '100%' : 'auto' }}
      >
        <LoadMore
          amount={totalVisible}
          total={episodes?.length || 0}
          label={`${title ? `"${title}"` : 'Season'} Episodes`}
          onClick={() => setTotalVisible(totalVisible + incrementBy)}
        />
      </ScaleFade>
    </VStack>
  );
};

export default Episodes;
