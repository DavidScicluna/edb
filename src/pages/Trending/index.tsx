import React, { ReactElement, useEffect, useState } from 'react';

import { useDisclosure, useMediaQuery, SimpleGrid, VStack, HStack, Fade, useTheme } from '@chakra-ui/react';
import axios from 'axios';
import queryString from 'query-string';
import { useInfiniteQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

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
import HorizontalPoster from '../../components/Poster/Horizontal';
import VerticalPoster from '../../components/Poster/Vertical';
import { Theme } from '../../theme/types';
import Label from './components/Label';
import TypePicker from './components/TypePicker';

const MovieTVSortBy: SortBy[] = [
  {
    label: 'Popularity',
    value: 'popularity',
    isActive: false
  },
  {
    label: 'Rating',
    value: 'vote_average',
    isActive: true
  },
  {
    label: 'Release Date',
    value: 'release_date',
    isActive: false
  },
  {
    label: 'Title',
    value: 'title',
    isActive: false
  }
];

const PeopleSortBy: SortBy[] = [
  {
    label: 'Popularity',
    value: 'popularity',
    isActive: true
  },
  {
    label: 'Gender',
    value: 'gender',
    isActive: false
  },
  {
    label: 'Name',
    value: 'name',
    isActive: false
  }
];

const Trending = (): ReactElement => {
  const source = axios.CancelToken.source();

  const theme = useTheme<Theme>();
  const { isOpen: isTypePickerOpen, onOpen: onTypePickerOpen, onClose: onTypePickerClose } = useDisclosure();
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');
  const [isMob] = useMediaQuery('(max-width: 600px)');
  const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.data.displayMode);
  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const location = useLocation();

  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [sortBy, setSortBy] = useState<SortBy[]>([]);

  const [movies, setMovies] = useState<PartialMovie[]>([]);
  const [tv, setTV] = useState<PartialTV[]>([]);
  const [people, setPeople] = useState<PartialPerson[]>([]);

  const size = utils.handleReturnImageSize('poster', 'sm');

  // Fetching trending
  const trending = useInfiniteQuery(
    ['trending', sortBy, mediaType],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<any[]>>(`/trending/${mediaType}/day`, {
        params: { page: pageParam, sort_by: `${sortBy.find((sort) => sort.isActive)?.value}.${sortDirection}` },
        cancelToken: source.token
      });
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false)
    }
  );

  const handleSortChange = (paramSort: SortBy): void => {
    setSortBy(onSortChange(paramSort, sortBy));
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
    // setType(null);

    if (location.search.length > 0) {
      const param = queryString.parse(location.search);

      if (param && param.mediaType) {
        switch (param.mediaType) {
          case 'person':
            setMediaType('person');
            setSortBy(PeopleSortBy);
            break;
          case 'tv':
            setMediaType('tv');
            setSortBy(MovieTVSortBy);
            break;
          default:
            setMediaType('movie');
            setSortBy(MovieTVSortBy);
            break;
        }
      }
    } else {
      if (isLgUp) {
        onTypePickerOpen();
      }
    }
  }, [location]);

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <>
      <VerticalGrid
        title={
          isMob
            ? `Trending ${mediaType === 'movie' ? 'movies' : mediaType === 'person' ? 'people' : 'tv' || ''}`
            : mediaType
            ? `Media-type: ${mediaType === 'movie' ? 'movies' : mediaType === 'person' ? 'people' : 'TV'}`
            : ''
        }
        header={
          <Fade in={!!mediaType} unmountOnExit>
            <HStack spacing={2}>
              <Button onClick={() => onTypePickerOpen()} variant='outlined'>
                Change media-type
              </Button>
              <DisplayOptions sortBy={sortBy} onSortChange={handleSortChange} />
            </HStack>
          </Fade>
        }>
        {mediaType ? (
          <VStack width='100%' spacing={4}>
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
                  mediaType === 'movie' ? 'movies' : mediaType === 'person' ? 'people' : 'tv'
                } list is empty!`}
                variant='outlined'
              />
            )}

            {trending.data && trending.data.pages ? (
              <LoadMore
                amount={trending.data.pages[trending.data.pages.length - 1].page * 20}
                total={trending.data.pages[trending.data.pages.length - 1].total_results}
                mediaType='popular movies'
                isLoading={trending.isLoading || trending.isFetching}
                onFetch={trending.fetchNextPage}
              />
            ) : null}
          </VStack>
        ) : (
          <Label handleOpenModal={() => onTypePickerOpen()} />
        )}
      </VerticalGrid>

      <TypePicker
        mediaType={mediaType}
        isOpen={isTypePickerOpen}
        onClose={onTypePickerClose}
        onSetType={(mediaType: MediaType) => setMediaType(mediaType)}
      />
    </>
  );
};

export default Trending;
