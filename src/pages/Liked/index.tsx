import React, { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, useMediaQuery, HStack, SimpleGrid, Box, ScaleFade } from '@chakra-ui/react';
import arraySort from 'array-sort';
import { useHistory, useParams } from 'react-router-dom';

import { Department } from '../../common/data/departments';
import useSelector from '../../common/hooks/useSelectorTyped';
import { Genre, MediaType, SortBy } from '../../common/types/types';
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
import { MediaItem } from '../../store/slices/User/types';
import All from './components/All';

const Liked = (): ReactElement => {
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

  useEffect(() => {
    setMediaType(null);

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
    }
  }, [history.location.pathname]);

  return (
    <>
      <VerticalGrid
        title={
          mediaType === 'movie'
            ? `${movies.length || 0} liked movie${movies && (movies.length === 0 || movies.length > 1) ? 's' : ''}`
            : mediaType === 'tv'
            ? `${tv.length || 0} liked TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`
            : mediaType === 'person'
            ? `${people.length || 0} liked ${
                (people && people.length === 0) || people.length > 1 ? 'people' : 'person'
              }`
            : `You have liked ${[
                `${movies.length || 0} movie${movies && (movies.length === 0 || movies.length > 1) ? 's' : ''}`,
                `${tv.length || 0} TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`,
                `${people.length || 0} ${(people && people.length === 0) || people.length > 1 ? 'people' : 'person'}`
              ].join(' • ')}`
        }
        header={
          <ScaleFade in={!!mediaType} unmountOnExit>
            <HStack spacing={2}>
              <ScaleFade in={handleHasMediaTypes()} unmountOnExit>
                <Button onClick={() => onMediaTypePickerOpen()} isFullWidth={isSm} variant='outlined'>
                  Change media-type
                </Button>
              </ScaleFade>
              {mediaType ? <Filters mediaType={mediaType} isLikedLists onFilter={handleSetFilters} /> : null}
            </HStack>
          </ScaleFade>
        }>
        {(movies && movies.length > 0) || (tv && tv.length > 0) || (people && people.length > 0) ? (
          mediaType === 'movie' ? (
            movies.length > 0 ? (
              <SimpleGrid
                width='100%'
                columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]}
                spacing={2}
                px={2}>
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
                px={2}>
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
                px={2}>
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
