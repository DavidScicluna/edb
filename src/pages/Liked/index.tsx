import React, { ReactElement, useState, useEffect } from 'react';

import {
  useTheme,
  useColorMode,
  useDisclosure,
  useMediaQuery,
  VStack,
  HStack,
  SimpleGrid,
  Box
} from '@chakra-ui/react';
import axios from 'axios';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import useSelector from '../../common/hooks/useSelectorTyped';
import { MediaType } from '../../common/types/types';
import DisplayMode from '../../components/DisplayMode';
import Empty from '../../components/Empty';
import VerticalGrid from '../../components/Grid/Vertical';
import Button from '../../components/Inputs/Button';
import MediaTypePicker from '../../components/MediaTypePicker';
import { MediaItem } from '../../store/slices/User/types';
import { Theme } from '../../theme/types';
import All from './components/All';
import Movie from './components/Movie';
import Person from './components/Person';
import Show from './components/Show';

const Liked = (): ReactElement => {
  const source = axios.CancelToken.source();

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');
  const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

  const history = useHistory();

  const liked = useSelector((state) => state.user.data.liked);
  const displayMode = useSelector((state) => state.app.data.displayMode);

  const [mediaType, setMediaType] = useState<MediaType | null>(null);

  const movies: MediaItem[] = liked.filter((like) => like.mediaType === 'movie') || [];
  const tv: MediaItem[] = liked.filter((like) => like.mediaType === 'tv') || [];
  const people: MediaItem[] = liked.filter((like) => like.mediaType === 'person') || [];

  useEffect(() => {
    setMediaType(null);

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
        }
      } else if (isLgUp) {
        onMediaTypePickerOpen();
      }
    }
  }, [history.location]);

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <>
      <VStack
        width='100%'
        backgroundColor={!mediaType ? (colorMode === 'light' ? 'gray.100' : 'gray.800') : 'transparent'}
        spacing={0}
        pb={mediaType ? 4 : 0}>
        <VerticalGrid
          title={
            mediaType === 'movie'
              ? `${movies.length || 0} movie${movies && (movies.length === 0 || movies.length > 1) ? 's' : ''}`
              : mediaType === 'tv'
              ? `${tv.length || 0} TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')}`
              : mediaType === 'person'
              ? `${people.length || 0} ${(people && people.length === 0) || people.length > 1 ? 'people' : 'person'}`
              : ''
          }
          header={
            <HStack spacing={2}>
              <Button onClick={() => onMediaTypePickerOpen()} variant='outlined'>
                Change media-type
              </Button>
              <DisplayMode />
            </HStack>
          }>
          {(movies && movies.length > 0) || (tv && tv.length > 0) || (people && people.length > 0) ? (
            mediaType === 'movie' ? (
              movies.length > 0 ? (
                <SimpleGrid
                  width='100%'
                  columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]}
                  spacing={2}
                  px={2}>
                  {movies.map((movie) => (
                    <Movie key={movie.id} id={movie.id} />
                  ))}
                </SimpleGrid>
              ) : (
                <Box width='100%' px={2}>
                  <Empty label='You have liked no movie!' variant='outlined' />
                </Box>
              )
            ) : mediaType === 'tv' ? (
              tv.length > 0 ? (
                <SimpleGrid
                  width='100%'
                  columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]}
                  spacing={2}
                  px={2}>
                  {tv.map((show) => (
                    <Show key={show.id} id={show.id} />
                  ))}
                </SimpleGrid>
              ) : (
                <Box width='100%' px={2}>
                  <Empty label='You have no liked no tv show!' variant='outlined' />
                </Box>
              )
            ) : mediaType === 'person' ? (
              people.length > 0 ? (
                <SimpleGrid
                  width='100%'
                  columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]}
                  spacing={2}
                  px={2}>
                  {people.map((person) => (
                    <Person key={person.id} id={person.id} />
                  ))}
                </SimpleGrid>
              ) : (
                <Box width='100%' px={2}>
                  <Empty label='You have no liked nobody!' variant='outlined' />
                </Box>
              )
            ) : (
              <All movies={movies} tv={tv} people={people} />
            )
          ) : (
            <Box width='100%' px={2}>
              <Empty label='You have no liked items!' variant='outlined' size='xl' />
            </Box>
          )}
        </VerticalGrid>
      </VStack>

      <MediaTypePicker
        mediaType={mediaType}
        isOpen={isMediaTypePickerOpen}
        onClose={onMediaTypePickerClose}
        onSetType={(mediaType: MediaType) => {
          history.push({
            pathname: history.location.pathname,
            search: queryString.stringify({ ...queryString.parse(history.location.search), mediaType })
          });

          setMediaType(mediaType);
        }}
      />
    </>
  );
};

export default Liked;
