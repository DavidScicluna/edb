import React, { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, useMediaQuery, HStack, SimpleGrid, Box } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';

import useSelector from '../../common/hooks/useSelectorTyped';
import { MediaType } from '../../common/types/types';
import Button from '../../components/Clickable/Button';
import DisplayMode from '../../components/DisplayMode';
import Empty from '../../components/Empty';
import VerticalGrid from '../../components/Grid/Vertical';
import MediaTypePicker from '../../components/MediaTypePicker';
import { MediaItem } from '../../store/slices/User/types';
import All from './components/All';
import Movie from './components/Movie';
import Person from './components/Person';
import Show from './components/Show';

const Liked = (): ReactElement => {
  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');

  const history = useHistory();
  const { mediaType: paramMediaType } = useParams<{ mediaType: MediaType }>();

  const liked = useSelector((state) => state.user.data.liked);
  const displayMode = useSelector((state) => state.app.ui.displayMode);

  const [mediaType, setMediaType] = useState<MediaType | null>(null);

  const movies: MediaItem[] = liked.filter((like) => like.mediaType === 'movie') || [];
  const tv: MediaItem[] = liked.filter((like) => like.mediaType === 'tv') || [];
  const people: MediaItem[] = liked.filter((like) => like.mediaType === 'person') || [];

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
            : ''
        }
        header={
          mediaType ? (
            <HStack spacing={2}>
              <Button onClick={() => onMediaTypePickerOpen()} variant='outlined'>
                Change media-type
              </Button>
              <DisplayMode />
            </HStack>
          ) : null
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

      <MediaTypePicker
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
