import React, { ReactElement, useState, useEffect } from 'react';

import { useTheme, useColorMode, useDisclosure, useMediaQuery, VStack, HStack, Box, Fade } from '@chakra-ui/react';
import _ from 'lodash';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import { movieSortBy, tvSortBy, peopleSortBy } from '../../common/data/sort';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { MediaType, Response, SortBy, Genre } from '../../common/types/types';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import Button from '../../components/Inputs/Button';
import LoadMore from '../../components/LoadMore';
import MediaTypePicker from '../../components/MediaTypePicker';
import VerticalMovies from '../../components/Movies/Vertical';
import VerticalPeople from '../../components/People/Vertical';
import SearchForm from '../../components/SearchForm';
import VerticalTV from '../../components/TV/Vertical';
import { Theme } from '../../theme/types';
import All from './components/All';

const Search = (): ReactElement => {
  const theme = useTheme<Theme>();

  const { colorMode } = useColorMode();
  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

  const history = useHistory();

  const [query, setQuery] = useState<string>('');

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

  const [refetch, setRefetch] = useState<boolean>(false);

  const [movies, setMovies] = useState<Response<PartialMovie[]> | null>(null);
  const [tv, setTV] = useState<Response<PartialTV[]> | null>(null);
  const [people, setPeople] = useState<Response<PartialPerson[]> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSetFilters = (sortBy: SortBy[], genres: Genre[]) => {
    const active = sortBy.find((sort) => sort.isActive);

    if (active) {
      setSortBy(active);
    }

    setGenres(genres);
    setRefetch(true);
  };

  useEffect(() => {
    if (history.location.search.length > 0) {
      const params = queryString.parse(history.location.search);

      if (params) {
        if (params.mediaType) {
          switch (params.mediaType) {
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
        } else {
          setMediaType(null);
        }
      } else if (isLgUp) {
        onMediaTypePickerOpen();
      }
    }
  }, [history.location]);

  return (
    <>
      <VStack
        width='100%'
        backgroundColor={!mediaType ? (colorMode === 'light' ? 'gray.100' : 'gray.800') : 'transparent'}
        spacing={0}
        pb={query ? 4 : 0}>
        <Box width='100%' backgroundColor={colorMode === 'light' ? 'white' : 'black'} px={2} pt={4} pb={2}>
          <SearchForm
            query={query}
            sortBy={sortBy}
            genres={genres}
            refetch={refetch}
            onQueryChange={(query: string) => setQuery(query)}
            onMoviesChange={(data: Response<PartialMovie[]>) => setMovies(data)}
            onTVChange={(data: Response<PartialTV[]>) => setTV(data)}
            onPeopleChange={(data: Response<PartialPerson[]>) => setPeople(data)}
            onIsLoading={(bool: boolean) => setIsLoading(bool)}
            onIsFetched={() => setRefetch(false)}
          />
        </Box>

        <VerticalGrid
          title={
            query
              ? mediaType === 'movie'
                ? `Found ${movies?.total_results || 0} movie${
                    movies && movies.total_results
                      ? movies.total_results === 0 || movies.total_results > 1
                        ? 's'
                        : ''
                      : ''
                  } with "${query}"`
                : mediaType === 'tv'
                ? `Found ${tv?.total_results || 0} TV show${
                    tv && tv.total_results ? (tv.total_results === 0 || tv.total_results > 1 ? 's' : '') : ''
                  } with "${query}"`
                : mediaType === 'person'
                ? `Found ${people?.total_results || 0} ${
                    people && people.total_results
                      ? people.total_results === 0 || people.total_results > 1
                        ? 'people'
                        : 'person'
                      : ''
                  } with "${query}"`
                : ''
              : ''
          }
          header={
            <Fade in={!!mediaType && !!query} unmountOnExit>
              <HStack spacing={2}>
                <Button onClick={() => onMediaTypePickerOpen()} variant='outlined'>
                  Change media-type
                </Button>
                {mediaType ? <Filters mediaType={mediaType} onFilter={handleSetFilters} /> : null}
              </HStack>
            </Fade>
          }>
          {mediaType === 'movie' && movies ? (
            <VStack width='100%' spacing={4} px={2}>
              <>
                <VerticalMovies isLoading={isLoading} isError={false} isSuccess={true} movies={movies.results || []} />

                <LoadMore
                  amount={movies.results.length}
                  total={movies.total_results}
                  mediaType={`movies for "${query}"`}
                  isLoading={isLoading}
                  onFetch={() =>
                    history.push({
                      pathname: history.location.pathname,
                      search: queryString.stringify({
                        ...queryString.parse(history.location.search),
                        page: movies.page + 1
                      })
                    })
                  }
                />
              </>
            </VStack>
          ) : mediaType === 'tv' && tv ? (
            <VStack width='100%' spacing={4} px={2}>
              <>
                <VerticalTV isLoading={isLoading} isError={false} isSuccess={true} tv={tv.results || []} />

                <LoadMore
                  amount={tv.results.length}
                  total={tv.total_results}
                  mediaType={`tv shows for "${query}"`}
                  isLoading={isLoading}
                  onFetch={() =>
                    history.push({
                      pathname: history.location.pathname,
                      search: queryString.stringify({
                        ...queryString.parse(history.location.search),
                        page: tv.page + 1
                      })
                    })
                  }
                />
              </>
            </VStack>
          ) : mediaType === 'person' && people ? (
            <VStack width='100%' spacing={4} px={2}>
              <>
                <VerticalPeople isLoading={isLoading} isError={false} isSuccess={true} people={people.results || []} />

                <LoadMore
                  amount={people.results.length}
                  total={people.total_results}
                  mediaType={`people for "${query}"`}
                  isLoading={isLoading}
                  onFetch={() =>
                    history.push({
                      pathname: history.location.pathname,
                      search: queryString.stringify({
                        ...queryString.parse(history.location.search),
                        page: people.page + 1
                      })
                    })
                  }
                />
              </>
            </VStack>
          ) : (
            <All query={query} movies={movies} tv={tv} people={people} />
          )}
        </VerticalGrid>
      </VStack>

      <MediaTypePicker
        mediaType={mediaType}
        isOpen={isMediaTypePickerOpen}
        onClose={onMediaTypePickerClose}
        onSetType={(mediaType: MediaType) => {
          const search = { ...queryString.parse(history.location.search), page: 1, mediaType };

          history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(_.omit(search, 'page'))
          });

          setMediaType(mediaType);
        }}
      />
    </>
  );
};

export default Search;
