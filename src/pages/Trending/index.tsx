import React, { ReactElement, useEffect, useState } from 'react';

import { useDisclosure, useMediaQuery, SimpleGrid, VStack, HStack, Box, Fade, useTheme } from '@chakra-ui/react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import { PeopleSortBy, MovieTVSortBy } from '../../common/data/sort';
import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { onSortChange } from '../../common/scripts/sortBy';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { Response, SortBy, MediaType } from '../../common/types/types';
import utils from '../../common/utils/utils';
import DisplayOptions from '../../components/DisplayOptions';
import Empty from '../../components/Empty';
import Error from '../../components/Error';
import VerticalGrid from '../../components/Grid/Vertical';
import Button from '../../components/Inputs/Button';
import LoadMore from '../../components/LoadMore';
import MediaTypePicker from '../../components/MediaTypePicker';
import HorizontalPoster from '../../components/Poster/Horizontal';
import VerticalPoster from '../../components/Poster/Vertical';
import { Theme } from '../../theme/types';

const size = utils.handleReturnImageSize('poster', 'sm');

const Trending = (): ReactElement => {
  const source = axios.CancelToken.source();

  const theme = useTheme<Theme>();
  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');
  const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.data.displayMode);
  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const history = useHistory();

  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [sortBy, setSortBy] = useState<SortBy[]>([]);

  const [movies, setMovies] = useState<PartialMovie[]>([]);
  const [tv, setTV] = useState<PartialTV[]>([]);
  const [people, setPeople] = useState<PartialPerson[]>([]);

  // Fetching trending
  const trending = useInfiniteQuery(
    'trending',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<any[]>>(`/trending/${mediaType}/day`, {
        params: { page: pageParam, sort_by: `${sortBy.find((sort) => sort.isActive)?.value}.${sortDirection}` },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (sortBy && sortBy.length > 0 && mediaType && mediaType.length > 0) || false,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false)
    }
  );

  const handleSortChange = (paramSort: SortBy): void => {
    setSortBy(onSortChange(paramSort, sortBy));
  };

  const handleResetState = (): void => {
    setMediaType(null);
    setSortBy([]);
    setMovies([]);
    setTV([]);
    setPeople([]);
  };

  useEffect(() => {
    trending.refetch();
  }, [sortDirection]);

  useEffect(() => {
    if (trending.isSuccess && trending.data && trending.data.pages) {
      switch (mediaType) {
        case 'person': {
          let people: PartialPerson[] = [];

          trending.data.pages.forEach((page) => {
            people = [...people, ...page.results];
          });

          setPeople([...people]);
          return;
        }
        case 'tv': {
          let tv: PartialTV[] = [];

          trending.data.pages.forEach((page) => {
            tv = [...tv, ...page.results];
          });

          setTV([...tv]);
          return;
        }
        default: {
          let movies: PartialMovie[] = [];

          trending.data.pages.forEach((page) => {
            movies = [...movies, ...page.results];
          });

          setMovies([...movies]);
          return;
        }
      }
    }
  }, [trending.dataUpdatedAt]);

  useEffect(() => {
    handleResetState();

    if (history.location.pathname !== '/trending') {
      trending.remove();

      switch (history.location.pathname) {
        case '/trending/person':
          setMediaType('person');
          setSortBy(PeopleSortBy);
          break;
        case '/trending/tv':
          setMediaType('tv');
          setSortBy(MovieTVSortBy);
          break;
        case '/trending/movie':
          setMediaType('movie');
          setSortBy(MovieTVSortBy);
          break;
        default:
          break;
      }
    } else {
      if (isLgUp) {
        onMediaTypePickerOpen();
      }
    }
  }, [history.location.pathname]);

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <>
      <VerticalGrid
        title={
          mediaType
            ? `Trending ${mediaType === 'movie' ? 'Movies' : mediaType === 'person' ? 'People' : 'TV Shows' || ''}`
            : 'Select media-type'
        }
        header={
          <Fade in={!!mediaType} unmountOnExit>
            <HStack spacing={2}>
              <Button onClick={() => onMediaTypePickerOpen()} variant='outlined'>
                Change media-type
              </Button>
              <DisplayOptions sortBy={sortBy} onSortChange={handleSortChange} />
            </HStack>
          </Fade>
        }>
        {mediaType ? (
          <VStack width='100%' spacing={4} px={2}>
            {trending.isLoading || trending.isFetching || !hasOptionsDownloaded ? (
              <SimpleGrid
                width='100%'
                columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]}
                spacing={2}>
                {[
                  ...Array(mediaType === 'movie' ? movies.length : mediaType === 'tv' ? tv.length : people.length || 20)
                ].map((_dummy, index: number) =>
                  displayMode === 'list' ? (
                    <HorizontalPoster
                      key={index}
                      mediaType={mediaType}
                      image={{
                        alt: `${mediaType} poster`,
                        src: '',
                        size
                      }}
                      rating={{
                        rating: null,
                        count: null
                      }}
                      title='Lorem ipsum'
                      subtitle='Lorem ipsum'
                      description='Lorem ipsum'
                      isLoaded={false}
                    />
                  ) : (
                    <VerticalPoster
                      key={index}
                      width='100%'
                      mediaType={mediaType}
                      image={{
                        alt: `${mediaType} poster`,
                        src: '',
                        size
                      }}
                      rating={{
                        rating: null,
                        count: null
                      }}
                      title='Lorem ipsum'
                      subtitle='Lorem ipsum'
                      isLoaded={false}
                    />
                  )
                )}
              </SimpleGrid>
            ) : trending.isError ? (
              <Error
                label={`Failed to fetch trending ${
                  mediaType === 'movie' ? 'movies' : mediaType === 'person' ? 'people' : 'tv'
                } list!`}
                variant='outlined'
              />
            ) : trending.isSuccess ? (
              <SimpleGrid
                width='100%'
                columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]}
                spacing={2}>
                {mediaType === 'movie'
                  ? movies.map((movie: PartialMovie, index: number) =>
                      displayMode === 'list' ? (
                        <HorizontalPoster
                          key={index}
                          mediaType='movie'
                          image={{
                            alt: `${movie?.title || ''} movie poster`,
                            src: movie?.poster_path || '',
                            size
                          }}
                          rating={{
                            rating: movie?.vote_average || null,
                            count: movie?.vote_count || null
                          }}
                          title={movie?.title || ''}
                          subtitle={`${utils.handleReturnDate(
                            movie?.release_date || '',
                            'full'
                          )} • ${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`}
                          description={movie?.overview || ''}
                          isLoaded={true}
                        />
                      ) : (
                        <VerticalPoster
                          key={index}
                          width='100%'
                          mediaType='movie'
                          image={{
                            alt: `${movie?.title || ''} movie poster`,
                            src: movie?.poster_path || '',
                            size
                          }}
                          rating={{
                            rating: movie?.vote_average || null,
                            count: movie?.vote_count || null
                          }}
                          title={movie?.title || ''}
                          subtitle={`${utils.handleReturnDate(
                            movie?.release_date || '',
                            'year'
                          )} • ${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`}
                          isLoaded={true}
                        />
                      )
                    )
                  : mediaType === 'tv'
                  ? tv.map((show: PartialTV, index: number) =>
                      displayMode === 'list' ? (
                        <HorizontalPoster
                          key={index}
                          mediaType='tv'
                          image={{
                            alt: `${show?.name || ''} tv show poster`,
                            src: show?.poster_path || '',
                            size
                          }}
                          rating={{
                            rating: show?.vote_average || null,
                            count: show?.vote_count || null
                          }}
                          title={show?.name || ''}
                          subtitle={`${utils.handleReturnDate(
                            show?.first_air_date || '',
                            'full'
                          )} • ${utils.handleReturnGenresByID(show?.genre_ids || [], 'tv')}`}
                          description={show?.overview || ''}
                          isLoaded={true}
                        />
                      ) : (
                        <VerticalPoster
                          key={index}
                          width='100%'
                          mediaType='tv'
                          image={{
                            alt: `${show?.name || ''} tv show poster`,
                            src: show?.poster_path || '',
                            size
                          }}
                          rating={{
                            rating: show?.vote_average || null,
                            count: show?.vote_count || null
                          }}
                          title={show?.name || ''}
                          subtitle={`${utils.handleReturnDate(
                            show?.first_air_date || '',
                            'year'
                          )} • ${utils.handleReturnGenresByID(show?.genre_ids || [], 'tv')}`}
                          isLoaded={true}
                        />
                      )
                    )
                  : people.map((person: PartialPerson, index: number) =>
                      displayMode === 'list' ? (
                        <HorizontalPoster
                          key={index}
                          mediaType='person'
                          image={{
                            alt: `${person?.name || ''} person poster`,
                            src: person?.profile_path || '',
                            size
                          }}
                          title={person?.name || ''}
                          subtitle={person.known_for_department}
                          description={person?.known_for.map((item) => item.name || item.title || '').join(', ') || ''}
                          isLoaded={true}
                        />
                      ) : (
                        <VerticalPoster
                          key={index}
                          width='100%'
                          mediaType='person'
                          image={{
                            alt: `${person?.name || ''} person poster`,
                            src: person?.profile_path || '',
                            size
                          }}
                          title={person?.name || ''}
                          subtitle={person.known_for_department}
                          isLoaded={true}
                        />
                      )
                    )}
              </SimpleGrid>
            ) : (
              <Empty
                label={`Trending ${
                  mediaType === 'movie' ? 'movies' : mediaType === 'person' ? 'people' : 'tv shows'
                } list is empty!`}
                variant='outlined'
              />
            )}

            {trending.data && trending.data.pages && trending.hasNextPage ? (
              <LoadMore
                amount={
                  mediaType === 'movie'
                    ? movies.length
                    : mediaType === 'tv'
                    ? tv.length
                    : mediaType === 'person'
                    ? people.length
                    : 0
                }
                total={trending.data.pages[trending.data.pages.length - 1].total_results}
                mediaType={`trending ${
                  mediaType === 'movie' ? 'movies' : mediaType === 'person' ? 'people' : 'tv shows'
                }`}
                isLoading={trending.isLoading || trending.isFetching}
                onFetch={trending.fetchNextPage}
              />
            ) : null}
          </VStack>
        ) : (
          <Box width='100%' px={2}>
            <Empty
              button={
                <Button color='blue' onClick={() => onMediaTypePickerOpen()}>
                  Select media type
                </Button>
              }
              hasIllustration={false}
              label='Select media type to view data!'
              size='xl'
              variant='outlined'
            />
          </Box>
        )}
      </VerticalGrid>

      <MediaTypePicker
        mediaType={mediaType}
        isOpen={isMediaTypePickerOpen}
        onClose={onMediaTypePickerClose}
        onSetType={(mediaType: MediaType) =>
          history.push({ pathname: `${history.location.pathname === '/trending' ? '/trending/' : ''}${mediaType}` })
        }
      />
    </>
  );
};

export default Trending;
