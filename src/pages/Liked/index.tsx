import { ReactElement, useState, useEffect } from 'react';

import { useColorMode, useDisclosure, useMediaQuery, HStack, Box, Center, Text, ScaleFade } from '@chakra-ui/react';
import sort from 'array-sort';
import { useHistory, useParams } from 'react-router-dom';

import { Department } from '../../common/data/departments';
import { useSelector } from '../../common/hooks';
import { Genre, MediaType, SortBy } from '../../common/types';
import Badge from '../../components/Badge';
import Button from '../../components/Clickable/Button';
import Empty from '../../components/Empty';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import MediaTypePicker from '../../components/MediaTypePicker';
import Page from '../../containers/Page';
import { home, liked as likedBreadcrumb } from '../../containers/Page/common/data/breadcrumbs';
import { Breadcrumb } from '../../containers/Page/types';
import { MediaItem } from '../../store/slices/User/types';
import VerticalMovies from '../Movies/components/VerticalMovies';
import VerticalPeople from '../People/components/VerticalPeople';
import VerticalTV from '../TV/components/VerticalTV';
import All from './components/All';

const Liked = (): ReactElement => {
  const { colorMode } = useColorMode();
  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const history = useHistory();
  const { mediaType: paramMediaType } = useParams<{ mediaType: MediaType }>();

  const liked = useSelector((state) => state.user.data.liked);

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
      filteredMovies = sort(filteredMovies, sortBy.find((sort) => sort.isActive)?.value, {
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
      filteredTV = sort(filteredTV, sortBy.find((sort) => sort.isActive)?.value, {
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
      filteredPeople = sort(filteredPeople, sortBy.find((sort) => sort.isActive)?.value, {
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
              fontWeight='bold'
            >
              {mediaType === 'movie'
                ? 'Movies'
                : mediaType === 'tv'
                ? 'TV shows'
                : mediaType === 'person'
                ? 'People'
                : 'Liked'}
              <Badge color={mediaType ? color : 'gray'} size='lg' ml={2}>
                {mediaType === 'movie'
                  ? String(movies.length)
                  : mediaType === 'tv'
                  ? String(tv.length)
                  : mediaType === 'person'
                  ? String(people.length)
                  : String(movies.length + tv.length + people.length)}
              </Badge>
            </Text>
          </Center>
        }
      >
        {{
          actions: (
            <ScaleFade in={!!mediaType} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
              <HStack width={isSm ? '100%' : 'auto'} spacing={2}>
                <ScaleFade in={handleHasMediaTypes()} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
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
                  <VerticalMovies isError={false} isSuccess isLoading={false} movies={movies} />
                ) : mediaType === 'tv' ? (
                  <VerticalTV isError={false} isSuccess isLoading={false} tv={tv} />
                ) : mediaType === 'person' ? (
                  <VerticalPeople isError={false} isSuccess isLoading={false} people={people} />
                ) : (
                  <All movies={movies} tv={tv} people={people} />
                )
              ) : (
                <Box width='100%' px={2} pt={2}>
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
