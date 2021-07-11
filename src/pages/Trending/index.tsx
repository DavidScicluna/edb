import React, { ReactElement, useEffect, useState } from 'react';

import { useDisclosure, VStack, HStack, Box, Fade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

import { Department } from '../../common/data/departments';
import defaultResponse from '../../common/data/response';
import { movieSortBy, tvSortBy, peopleSortBy } from '../../common/data/sort';
import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { MediaType, Response, SortBy, Genre } from '../../common/types/types';
import Button from '../../components/Clickable/Button';
import Empty from '../../components/Empty';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import LoadMore from '../../components/LoadMore';
import MediaTypePicker from '../../components/MediaTypePicker';
import MediaTypes from '../../components/MediaTypePicker/components/MediaTypes';
import VerticalMovies from '../../components/Movies/Grid/Vertical';
import VerticalPeople from '../../components/People/Grid/Vertical';
import VerticalTV from '../../components/TV/Grid/Vertical';

const Trending = (): ReactElement => {
  const source = axios.CancelToken.source();

  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();

  const history = useHistory();
  const { mediaType: paramMediaType } = useParams<{ mediaType: MediaType }>();

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [mediaType, setMediaType] = useState<MediaType | null>(null);

  const [sortBy, setSortBy] = useState<SortBy | undefined>(
    mediaType === 'movie'
      ? movieSortBy.find((sort) => sort.isActive)
      : mediaType === 'tv'
      ? tvSortBy.find((sort) => sort.isActive)
      : mediaType === 'person'
      ? peopleSortBy.find((sort) => sort.isActive)
      : undefined
  );
  const [genres, setGenres] = useState<Genre[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [movies, setMovies] = useState<Response<PartialMovie[]>>(defaultResponse);
  const [tv, setTV] = useState<Response<PartialTV[]>>(defaultResponse);
  const [people, setPeople] = useState<Response<PartialPerson[]>>(defaultResponse);

  // Fetching trending
  const trending = useInfiniteQuery(
    'trending',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<any[]>>(`/trending/${mediaType}/day`, {
        params: { page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (mediaType && mediaType.length > 0) || false,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        switch (mediaType) {
          case 'person': {
            let people: PartialPerson[] = [];

            data.pages.forEach((page) => {
              people = [...people, ...page.results];
            });

            setPeople({
              page: data.pages[data.pages.length - 1].page,
              results: sort(
                departments && departments.length > 0
                  ? people.filter((person) =>
                      departments.some((department) => person.known_for_department === department.value)
                    )
                  : [...people],
                sortBy?.value || '',
                { reverse: sortDirection === 'desc' }
              ),
              total_pages: data.pages[data.pages.length - 1].total_pages,
              total_results: data.pages[data.pages.length - 1].total_results
            });
            return;
          }
          case 'tv': {
            let tv: PartialTV[] = [];

            data.pages.forEach((page) => {
              tv = [...tv, ...page.results];
            });

            setTV({
              page: data.pages[data.pages.length - 1].page,
              results: sort(
                genres && genres.length > 0
                  ? tv.filter((show) => genres.some((genre) => _.includes(show.genre_ids, genre.id)))
                  : [...tv],
                sortBy?.value || '',
                { reverse: sortDirection === 'desc' }
              ),
              total_pages: data.pages[data.pages.length - 1].total_pages,
              total_results: data.pages[data.pages.length - 1].total_results
            });
            return;
          }
          default: {
            let movies: PartialMovie[] = [];

            data.pages.forEach((page) => {
              movies = [...movies, ...page.results];
            });

            setMovies({
              page: data.pages[data.pages.length - 1].page,
              results: sort(
                genres && genres.length > 0
                  ? movies.filter((movie) => genres.some((genre) => _.includes(movie.genre_ids, genre.id)))
                  : [...movies],
                sortBy?.value || '',
                { reverse: sortDirection === 'desc' }
              ),
              total_pages: data.pages[data.pages.length - 1].total_pages,
              total_results: data.pages[data.pages.length - 1].total_results
            });
            return;
          }
        }
      }
    }
  );

  const handleSetFilters = (sortBy: SortBy[], genres: Genre[], departments: Department[]) => {
    const active = sortBy.find((sort) => sort.isActive);

    if (active) {
      setSortBy(active);
    }

    setGenres(genres);
    setDepartments(departments);

    setTimeout(() => {
      trending.refetch();
    }, 0);
  };

  const handleResetState = (): void => {
    setMediaType(null);
    setMovies(defaultResponse);
    setTV(defaultResponse);
    setPeople(defaultResponse);
  };

  useEffect(() => {
    handleResetState();

    if (paramMediaType) {
      trending.remove();

      switch (paramMediaType) {
        case 'person':
          setMediaType('person');
          break;
        case 'tv':
          setMediaType('tv');
          break;
        case 'movie':
          setMediaType('movie');
          break;
        default:
          break;
      }
    }
  }, [history.location.pathname]);

  useEffect(() => {
    return () => source.cancel();
  }, []);

  console.log(trending);

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
              {mediaType ? <Filters mediaType={mediaType} onFilter={handleSetFilters} /> : null}
            </HStack>
          </Fade>
        }>
        {mediaType ? (
          <VStack width='100%' spacing={4} px={2}>
            {mediaType === 'movie' ? (
              <>
                <VerticalMovies
                  isLoading={trending.isFetching || trending.isLoading}
                  isError={trending.isError}
                  isSuccess={trending.isSuccess}
                  movies={movies.results || []}
                />

                {trending.hasNextPage && movies ? (
                  <LoadMore
                    amount={movies.results.length}
                    total={movies.total_results}
                    mediaType='movies'
                    isLoading={trending.isFetching || trending.isLoading}
                    onFetch={trending.fetchNextPage}
                  />
                ) : null}
              </>
            ) : mediaType === 'tv' ? (
              <>
                <VerticalTV
                  isLoading={trending.isFetching || trending.isLoading}
                  isError={trending.isError}
                  isSuccess={trending.isSuccess}
                  tv={tv.results || []}
                />

                {trending.hasNextPage && tv ? (
                  <LoadMore
                    amount={tv.results.length}
                    total={tv.total_results}
                    mediaType='tv shows'
                    isLoading={trending.isFetching || trending.isLoading}
                    onFetch={trending.fetchNextPage}
                  />
                ) : null}
              </>
            ) : mediaType === 'person' ? (
              <>
                <VerticalPeople
                  isLoading={trending.isFetching || trending.isLoading}
                  isError={trending.isError}
                  isSuccess={trending.isSuccess}
                  people={people.results || []}
                />

                {trending.hasNextPage && people ? (
                  <LoadMore
                    amount={people.results.length}
                    total={people.total_results}
                    mediaType='people'
                    isLoading={trending.isFetching || trending.isLoading}
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
                <MediaTypes
                  mediaType={mediaType}
                  onSetType={(mediaType: MediaType) =>
                    history.push({
                      pathname: `${history.location.pathname === '/trending' ? '/trending/' : ''}${mediaType}`
                    })
                  }
                />
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
