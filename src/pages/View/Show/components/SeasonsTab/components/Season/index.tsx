import { ReactElement, useState, useEffect } from 'react';

import { useTheme, useColorMode, VStack, VisuallyHidden, Text, Collapse } from '@chakra-ui/react';
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
import useStyles from './styles';
import { SeasonProps } from './types';

const incrementBy = 10;

const Season = (props: SeasonProps): ReactElement => {
  const source = axios.CancelToken.source();

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { tvId, season, isOpen = true, onToggle } = props;
  const { name, air_date, episode_count, season_number, overview } = season;

  const style = useStyles(theme, isOpen);

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  // Fetching tv show season
  const seasonQuery = useQuery(
    [`tv-show-${tvId}-season-${season_number}`, tvId],
    async () => {
      const { data } = await axiosInstance.get<FullSeason>(`/tv/${tvId}/season/${season_number}`, {
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

          <VStack width='100%' maxWidth='100%' spacing={2}>
            {overview ? (
              <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
                {overview}
              </Text>
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
                  <Episode
                    key={episode.id}
                    image={{
                      alt: `${episode?.name || ''} episode poster`,
                      src: episode?.still_path || '',
                      size: {
                        thumbnail: 'w92',
                        full: 'original'
                      }
                    }}
                    rating={{
                      rating: episode?.vote_average || null,
                      count: episode?.vote_count || null
                    }}
                    name={episode?.name || ''}
                    date={episode.air_date}
                    overview={episode?.overview || ''}
                    number={episode.episode_number}
                    isLoading={isLoading}
                  />
                ))
            ) : (
              _.range(0, 5).map((_dummy, index: number) => (
                <Episode
                  key={index}
                  image={{
                    alt: 'Episode poster',
                    src: '',
                    size: {
                      thumbnail: 'w92',
                      full: 'original'
                    }
                  }}
                  name='Lorem ipsum'
                  date='Lorem ipsum'
                  overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                  isLoading
                />
              ))
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
