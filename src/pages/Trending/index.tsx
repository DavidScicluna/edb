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
            {mediaType === 'movie' ? (
              <>
                <VerticalMovies
                  isLoading={trending.isLoading || trending.isFetching}
                  isError={trending.isError}
                  isSuccess={trending.isSuccess}
                  movies={movies.results || []}
                />

                {trending.hasNextPage && movies ? (
                  <LoadMore
                    amount={movies.results.length}
                    total={movies.total_results}
                    mediaType='movies'
                    isLoading={trending.isLoading || trending.isFetching}
                    onFetch={trending.fetchNextPage}
                  />
                ) : null}
              </>
            ) : mediaType === 'tv' ? (
              <>
                <VerticalTV
                  isLoading={trending.isLoading || trending.isFetching}
                  isError={trending.isError}
                  isSuccess={trending.isSuccess}
                  tv={tv.results || []}
                />

                {trending.hasNextPage && tv ? (
                  <LoadMore
                    amount={tv.results.length}
                    total={tv.total_results}
                    mediaType='tv shows'
                    isLoading={trending.isLoading || trending.isFetching}
                    onFetch={trending.fetchNextPage}
                  />
                ) : null}
              </>
            ) : mediaType === 'person' ? (
              <>
                <VerticalPeople
                  isLoading={trending.isLoading || trending.isFetching}
                  isError={trending.isError}
                  isSuccess={trending.isSuccess}
                  people={people.results || []}
                />

                {trending.hasNextPage && people ? (
                  <LoadMore
                    amount={people.results.length}
                    total={people.total_results}
                    mediaType='people'
                    isLoading={trending.isLoading || trending.isFetching}
                    onFetch={trending.fetchNextPage}
                  />
                ) : null}
              </>
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
