import React, { ReactElement, useState, useEffect } from 'react';

import { useTheme, useMediaQuery, useDisclosure, VStack, HStack, Box, Fade } from '@chakra-ui/react';
import _ from 'lodash';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import { MovieTVSortBy, PeopleSortBy } from '../../common/data/sort';
import { onSortChange } from '../../common/scripts/sortBy';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { MediaType, SortBy, Response } from '../../common/types/types';
import DisplayOptions from '../../components/DisplayOptions';
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
  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

  const history = useHistory();

  const [query, setQuery] = useState<string>('');

  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [sortBy, setSortBy] = useState<SortBy[]>([]);

  const [movies, setMovies] = useState<Response<PartialMovie[]> | null>(null);
  const [tv, setTV] = useState<Response<PartialTV[]> | null>(null);
  const [people, setPeople] = useState<Response<PartialPerson[]> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSortChange = (paramSort: SortBy): void => {
    setSortBy(onSortChange(paramSort, sortBy));
  };

  useEffect(() => {
    if (history.location.search.length > 0) {
      const params = queryString.parse(history.location.search);

      if (params) {
        if (params.mediaType) {
          switch (params.mediaType) {
            case 'person':
              setMediaType('person');
              setSortBy(PeopleSortBy);
              break;
            case 'tv':
              setMediaType('tv');
              setSortBy(MovieTVSortBy);
              break;
            case 'movie':
              setMediaType('movie');
              setSortBy(MovieTVSortBy);
              break;
            default:
              break;
          }
        } else {
          setMediaType(null);
          setSortBy([]);
        }
      } else if (isLgUp) {
        onMediaTypePickerOpen();
      }
    }
  }, [history.location]);

  return (
    <>
      <VStack width='100%' spacing={0}>
        <Box width='100%' px={2} pt={4} pb={2}>
          <SearchForm
            query={query}
            sortBy={sortBy}
            onQueryChange={(query: string) => setQuery(query)}
            onMoviesChange={(data: Response<PartialMovie[]>) => setMovies(data)}
            onTVChange={(data: Response<PartialTV[]>) => setTV(data)}
            onPeopleChange={(data: Response<PartialPerson[]>) => setPeople(data)}
            onIsLoading={(bool: boolean) => setIsLoading(bool)}
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
                <DisplayOptions sortBy={sortBy} onSortChange={handleSortChange} />
              </HStack>
            </Fade>
          }>
          {mediaType === 'movie' && movies ? (
            <VStack width='100%' spacing={4} px={2}>
              <>
                <VerticalMovies isLoading={isLoading} isError={false} isSuccess={true} movies={movies?.results} />

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
                <VerticalTV isLoading={isLoading} isError={false} isSuccess={true} tv={tv?.results} />

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
                <VerticalPeople isLoading={isLoading} isError={false} isSuccess={true} people={people?.results} />

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
