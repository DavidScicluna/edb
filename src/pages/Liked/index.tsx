import React, { ReactElement, useState, useEffect } from 'react';

import {
  useColorMode,
  useDisclosure,
  useMediaQuery,
  HStack,
  SimpleGrid,
  Box,
  Center,
  Text,
  ScaleFade
} from '@chakra-ui/react';
import arraySort from 'array-sort';
import { useHistory, useParams } from 'react-router-dom';

import { Department } from '../../common/data/departments';
import { useSelector } from '../../common/hooks';
import { Genre, MediaType, SortBy } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Badge from '../../components/Badge';
import Button from '../../components/Clickable/Button';
import Empty from '../../components/Empty';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import MediaTypePicker from '../../components/MediaTypePicker';
import HorizontalMoviePoster from '../../components/Movies/Poster/Horizontal';
import VerticalMoviePoster from '../../components/Movies/Poster/Vertical';
import HorizontalPersonPoster from '../../components/People/Poster/Horizontal';
import VerticalPersonPoster from '../../components/People/Poster/Vertical';
import HorizontalShowPoster from '../../components/TV/Poster/Horizontal';
import VerticalShowPoster from '../../components/TV/Poster/Vertical';
import Page from '../../containers/Page';
import { home, liked as likedBreadcrumb } from '../../containers/Page/common/data/breadcrumbs';
import { Breadcrumb } from '../../containers/Page/types';
import { MediaItem } from '../../store/slices/User/types';
import All from './components/All';

const Liked = (): ReactElement => {
  const { colorMode } = useColorMode();
  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const history = useHistory();
  const { mediaType: paramMediaType } = useParams<{ mediaType: MediaType }>();

  const liked = useSelector((state) => state.user.data.liked);
  const displayMode = useSelector((state) => state.app.ui.displayMode);

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const color = useSelector((state) => state.user.ui.theme.color);

  const [mediaType, setMediaType] = useState<MediaType | null>(null);

  const [movies, setMovies] = useState<MediaItem<'movie'>[]>([...liked.movies]);
  const [tv, setTV] = useState<MediaItem<'tv'>[]>([...liked.tv]);
  const [people, setPeople] = useState<MediaItem<'person'>[]>([...liked.people]);

  const handleFilterMovies = (sortBy: SortBy[], genres: Genre[]): void => {
    let filteredMovies: MediaItem<'movie'>[] = [...liked.movies];

    if (genres && genres.length > 0) {
      filteredMovies = filteredMovies.filter((movie) => genres.some((genre) => movie.genre_ids.includes(genre.id)));
    }

    if (sortBy && sortBy.find((sort) => sort.isActive)) {
      filteredMovies = arraySort(filteredMovies, sortBy.find((sort) => sort.isActive)?.value, {
        reverse: sortDirection === 'desc'
      });
    }

    setMovies([...filteredMovies]);
  };

  const handleFilterTV = (sortBy: SortBy[], genres: Genre[]): void => {
    let filteredTV: MediaItem<'tv'>[] = [...liked.tv];

    if (genres && genres.length > 0) {
      filteredTV = filteredTV.filter((show) => genres.some((genre) => show.genre_ids.includes(genre.id)));
    }

    if (sortBy && sortBy.find((sort) => sort.isActive)) {
      filteredTV = arraySort(filteredTV, sortBy.find((sort) => sort.isActive)?.value, {
        reverse: sortDirection === 'desc'
      });
    }

    setTV([...filteredTV]);
  };

  const handleFilterPeople = (sortBy: SortBy[], departments: Department[]): void => {
    let filteredPeople: MediaItem<'person'>[] = [...liked.people];

    if (departments && departments.length > 0) {
      filteredPeople = filteredPeople.filter((person) =>
        departments.some((department) => person.known_for_department === department.value)
      );
    }

    if (sortBy && sortBy.find((sort) => sort.isActive)) {
      filteredPeople = arraySort(filteredPeople, sortBy.find((sort) => sort.isActive)?.value, {
        reverse: sortDirection === 'desc'
      });
    }

    setPeople([...filteredPeople]);
  };

  const handleSetFilters = (sortBy: SortBy[], genres: Genre[], departments: Department[]): void => {
    switch (mediaType) {
      case 'movie':
        handleFilterMovies(sortBy, genres);
        break;
      case 'tv':
        handleFilterTV(sortBy, genres);
        break;
      case 'person':
        handleFilterPeople(sortBy, departments);
        break;
      default:
        break;
    }
  };

  const handleHasMediaTypes = (): boolean => {
    switch (mediaType) {
      case 'movie':
        return (tv && tv.length > 0) || (people && people.length > 0);
      case 'tv':
        return (movies && movies.length > 0) || (people && people.length > 0);
      case 'person':
        return (movies && movies.length > 0) || (tv && tv.length > 0);
      default:
        return false;
    }
  };

  const handleReturnMediaTypes = (): MediaType[] => {
    const mediaTypes: MediaType[] = [];

    if (movies && movies.length > 0) {
      mediaTypes.push('movie');
    }
    if (tv && tv.length > 0) {
      mediaTypes.push('tv');
    }
    if (people && people.length > 0) {
      mediaTypes.push('person');
    }

    return mediaTypes;
  };

  const handleReturnBreadcrumbs = (): Breadcrumb[] => {
    const breadcrumbs: Breadcrumb[] = [home, likedBreadcrumb];

    switch (mediaType) {
      case 'person':
        breadcrumbs.push({
          label: 'People',
          to: { pathname: '/liked/person' }
        });
        break;
      case 'tv':
        breadcrumbs.push({
          label: 'TV Shows',
          to: { pathname: '/liked/tv' }
        });
        break;
      case 'movie':
        breadcrumbs.push({
          label: 'Movies',
          to: { pathname: '/liked/movie' }
        });
        break;
      default:
        break;
    }

    return breadcrumbs;
  };

  useEffect(() => {
    if (paramMediaType) {
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
    } else {
      setMediaType(null);
    }
  }, [history.location.pathname]);

  return (
    <>
      <Page
        title={
          <Center>
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
              fontSize={['2xl', '2xl', '3xl', '3xl', '3xl', '3xl']}
              fontWeight='bold'>
              {mediaType === 'movie'
                ? 'Movies'
                : mediaType === 'tv'
                ? 'TV shows'
                : mediaType === 'person'
                ? 'People'
                : 'Liked'}
            </Text>
            <Badge
              label={
                mediaType === 'movie'
                  ? String(movies.length)
                  : mediaType === 'tv'
                  ? String(tv.length)
                  : mediaType === 'person'
                  ? String(people.length)
                  : String(movies.length + tv.length + people.length)
              }
              color={mediaType ? utils.handleReturnColor(color) : 'gray'}
              size='lg'
              ml={2}
            />
          </Center>
        }
        breadcrumbs={handleReturnBreadcrumbs()}>
        {{
          actions: (
            <ScaleFade in={!!mediaType} unmountOnExit>
              <HStack spacing={2}>
                <ScaleFade in={handleHasMediaTypes()} unmountOnExit>
                  <Button onClick={() => onMediaTypePickerOpen()} isFullWidth={isSm} variant='outlined'>
                    Change media type
                  </Button>
                </ScaleFade>
                {mediaType ? <Filters mediaType={mediaType} isLikedLists onFilter={handleSetFilters} /> : null}
              </HStack>
            </ScaleFade>
          ),
          body: (
            <VerticalGrid>
              {(movies && movies.length > 0) || (tv && tv.length > 0) || (people && people.length > 0) ? (
                mediaType === 'movie' ? (
                  movies.length > 0 ? (
                    <SimpleGrid
                      width='100%'
                      columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]}
                      spacing={2}
                      px={2}
                      pt={2}>
                      {movies.map((movie) =>
                        displayMode === 'list' ? (
                          <HorizontalMoviePoster key={movie.id} isLoading={false} movie={movie} />
                        ) : (
                          <VerticalMoviePoster key={movie.id} width='100%' isLoading={false} movie={movie} />
                        )
                      )}
                    </SimpleGrid>
                  ) : (
                    <Box width='100%' px={2} py={0}>
                      <Empty label='You have liked no movie!' variant='outlined' size='xl' />
                    </Box>
                  )
                ) : mediaType === 'tv' ? (
                  tv.length > 0 ? (
                    <SimpleGrid
                      width='100%'
                      columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]}
                      spacing={2}
                      px={2}
                      pt={2}>
                      {tv.map((show) =>
                        displayMode === 'list' ? (
                          <HorizontalShowPoster key={show.id} isLoading={false} show={show} />
                        ) : (
                          <VerticalShowPoster key={show.id} width='100%' isLoading={false} show={show} />
                        )
                      )}
                    </SimpleGrid>
                  ) : (
                    <Box width='100%' px={2} py={0}>
                      <Empty label='You have no liked no tv show!' variant='outlined' size='xl' />
                    </Box>
                  )
                ) : mediaType === 'person' ? (
                  people.length > 0 ? (
                    <SimpleGrid
                      width='100%'
                      columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]}
                      spacing={2}
                      px={2}
                      pt={2}>
                      {people.map((person) =>
                        displayMode === 'list' ? (
                          <HorizontalPersonPoster key={person.id} isLoading={false} person={person} />
                        ) : (
                          <VerticalPersonPoster key={person.id} width='100%' isLoading={false} person={person} />
                        )
                      )}
                    </SimpleGrid>
                  ) : (
                    <Box width='100%' px={2} py={0}>
                      <Empty label='You have no liked nobody!' variant='outlined' size='xl' />
                    </Box>
                  )
                ) : (
                  <All movies={movies} tv={tv} people={people} />
                )
              ) : (
                <Box width='100%' px={2} py={0}>
                  <Empty label='You have no liked items!' variant='outlined' size='xl' />
                </Box>
              )}
            </VerticalGrid>
          )
        }}
      </Page>

      <MediaTypePicker
        mediaTypes={handleReturnMediaTypes()}
        mediaType={mediaType}
        isOpen={isMediaTypePickerOpen}
        onClose={onMediaTypePickerClose}
        onSetType={(mediaType: MediaType) =>
          history.push({ pathname: `${history.location.pathname === '/liked' ? '/liked/' : ''}${mediaType}` })
        }
      />
    </>
  );
};

export default Liked;
