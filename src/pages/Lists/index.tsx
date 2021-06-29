import React, { ReactElement, useState, useEffect } from 'react';

import { useTheme, useDisclosure, useMediaQuery, VStack, HStack, SimpleGrid, Box, ScaleFade } from '@chakra-ui/react';
import axios from 'axios';
import queryString from 'query-string';
import { useHistory, useParams } from 'react-router-dom';

import useSelector from '../../common/hooks/useSelectorTyped';
import { MediaType } from '../../common/types/types';
import DisplayMode from '../../components/DisplayMode';
import Empty from '../../components/Empty';
import VerticalGrid from '../../components/Grid/Vertical';
import Button from '../../components/Inputs/Button';
import MediaTypePicker from '../../components/MediaTypePicker';
import { List as ListType, MediaItem } from '../../store/slices/User/types';
import { Theme } from '../../theme/types';
import All from './components/All';
import ListPicker from './components/ListPicker';
import List from './components/ListPicker/components/ListItem';
import Movie from './components/Movie';
import Show from './components/Show';
import { Param } from './types';

const Lists = (): ReactElement => {
  const source = axios.CancelToken.source();

  const theme = useTheme<Theme>();
  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const { isOpen: isListPickerOpen, onOpen: onListPickerOpen, onClose: onListPickerClose } = useDisclosure();
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');
  const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

  const { id } = useParams<Param>();
  const history = useHistory();

  const lists = useSelector((state) => state.user.data.lists);
  const displayMode = useSelector((state) => state.app.data.displayMode);

  const [mediaType, setMediaType] = useState<MediaType | null>(null);

  const [list, setList] = useState<ListType | null>(null);

  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [tv, setTV] = useState<MediaItem[]>([]);

  useEffect(() => {
    const activeList = lists.find((list) => list.id === id);

    setList(null);
    setMediaType(null);

    if (id && activeList) {
      setList(activeList);

      setMovies(activeList.results.filter((like) => like.mediaType === 'movie'));
      setTV(activeList.results.filter((like) => like.mediaType === 'tv'));
    }

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
      <VStack width='100%' spacing={0} pb={mediaType ? 4 : 0}>
        <VerticalGrid
          title={
            list
              ? mediaType
                ? mediaType === 'movie'
                  ? `${movies.length || 0} movie${
                      movies && (movies.length === 0 || movies.length > 1) ? 's' : ''
                    } in "${list.label}" list`
                  : mediaType === 'tv'
                  ? `${tv.length || 0} TV show${tv && (tv.length === 0 || tv.length > 1 ? 's' : '')} in "${
                      list.label
                    }" list`
                  : `${[
                      `${movies.length} movie${movies.length === 0 || movies.length > 1 ? 's' : ''}`,
                      `${tv.length} TV show${tv.length === 0 || tv.length > 1 ? 's' : ''}`
                    ].join(' • ')} results in "${list.label}" list`
                : ''
              : `${lists.length} list${lists.length === 0 || lists.length > 1 ? 's' : ''}`
          }
          header={
            <ScaleFade in={Boolean(list) && Boolean(mediaType)} unmountOnExit>
              <HStack spacing={2}>
                <Button onClick={() => onMediaTypePickerOpen()} variant='outlined'>
                  Change media-type
                </Button>
                <ScaleFade in={Boolean(list) && lists.length > 0} unmountOnExit>
                  <Button onClick={() => onListPickerOpen()} variant='outlined'>
                    Change list
                  </Button>
                </ScaleFade>
                <DisplayMode />
              </HStack>
            </ScaleFade>
          }>
          {list ? (
            movies.length > 0 || tv.length > 0 ? (
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
                    <Empty
                      label={`You have no items in "${list.label}" list!`}
                      description={`No movies found in "${list.label}" list!`}
                      variant='outlined'
                    />
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
                    <Empty
                      label={`You have no items in "${list.label}" list!`}
                      description={`No tv shows found in "${list.label}" list!`}
                      variant='outlined'
                    />
                  </Box>
                )
              ) : (
                <All movies={movies} tv={tv} />
              )
            ) : (
              <Box width='100%' p={2}>
                <Empty label={`You have no items in "${list.label}" list!`} variant='outlined' size='xl' />
              </Box>
            )
          ) : lists && lists.length > 0 ? (
            <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 4]} spacing={2} px={2}>
              {lists.map((list) => (
                <List
                  key={list.id}
                  {...list}
                  onClick={(id: ListType['id']) =>
                    history.push({
                      pathname: `/bookmarks/${id}`,
                      search: queryString.stringify({ ...queryString.parse(history.location.search) })
                    })
                  }
                />
              ))}
            </SimpleGrid>
          ) : (
            <Box width='100%' p={2}>
              <Empty label='You have no lists!' variant='outlined' size='xl' />
            </Box>
          )}
        </VerticalGrid>
      </VStack>

      <ListPicker activeList={list} isOpen={isListPickerOpen} onClose={onListPickerClose} />

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

export default Lists;
