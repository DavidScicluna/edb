import { ReactElement, useState, useEffect } from 'react';

import { useTheme, useColorMode, VStack, VisuallyHidden, Collapse } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import { useQuery } from 'react-query';

import axiosInstance from '../../../../../../../common/scripts/axios';
import { FullSeason } from '../../../../../../../common/types/tv';
import LoadMore from '../../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../../components/Empty';
import Error from '../../../../../../../components/Error';
import { Theme } from '../../../../../../../theme/types';
import Divider from './components/Divider';
import Episode from './components/Episode';
import Footer from './components/Footer';
import Header from './components/Header';
import Overview from './components/Overview';
import useStyles from './styles';
import { SeasonProps } from './types';

const incrementBy = 10;

const Season = (props: SeasonProps): ReactElement => {
  const source = axios.CancelToken.source();

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { tvId, season, isOpen = true, onToggle } = props;
  const { name, air_date, episode_count, season_number: number, overview } = season;

  const style = useStyles(theme, isOpen);

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  // Fetching tv show season
  const seasonQuery = useQuery(
    [`tv-show-${tvId}-season-${number}`, tvId],
    async () => {
      const { data } = await axiosInstance.get<FullSeason>(`/tv/${tvId}/season/${number}`, {
        cancelToken: source.token
      });
      return data;
    },
    { enabled: isOpen }
  );

  const isLoading = seasonQuery.isFetching || seasonQuery.isLoading || false;
  const episodes = seasonQuery.data?.episodes || [];

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VStack spacing={0} sx={{ ..._.merge(style.season, style[colorMode]) }}>
      <VisuallyHidden>
        <span id={name.toLowerCase()} />
      </VisuallyHidden>

      <Header title={name} date={air_date} episodes={episode_count} isOpen={isOpen} onToggle={onToggle} />

      <Collapse in={isOpen} unmountOnExit style={{ width: '100%' }}>
        <VStack width='100%' spacing={2} px={2} pb={2}>
          <Divider />

          <VStack width='100%' maxWidth='100%' alignItems='flex-start' spacing={2}>
            {overview ? (
              <Overview overview={overview} isLoading={seasonQuery.isFetching || seasonQuery.isLoading} />
            ) : null}

            {!isLoading && seasonQuery.isError ? (
              <Error
                label='Oh no! Something went wrong'
                description={`Failed to fetch ${name ? `"${name}"` : ''} episodes list!`}
                variant='outlined'
              />
            ) : !isLoading && seasonQuery.isSuccess && episodes && episodes.length === 0 ? (
              <Empty label={`${name ? `"${name}"` : ''} episodes list is currently empty!`} variant='outlined' />
            ) : !isLoading && seasonQuery.isSuccess && episodes && episodes.length > 0 ? (
              episodes
                .filter((_person, index) => index < totalVisible)
                .map((episode) => (
                  <Episode key={episode.id} tvId={tvId} seasonNumber={number} episode={episode} isLoading={isLoading} />
                ))
            ) : (
              _.range(0, 5).map((_dummy, index: number) => <Episode key={index} isLoading />)
            )}
          </VStack>

          {(episodes?.length || 0) > incrementBy ? (
            <Footer>
              <LoadMore
                amount={totalVisible}
                total={episodes?.length || 0}
                label='Episodes'
                onClick={() => setTotalVisible(totalVisible + incrementBy)}
              />
            </Footer>
          ) : undefined}
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default Season;
