import React, { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, useMediaQuery, VStack, HStack, SimpleGrid, Box, Text, ScaleFade } from '@chakra-ui/react';
import arraySort from 'array-sort';
import axios from 'axios';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';

import useSelector from '../../common/hooks/useSelectorTyped';
import { Genre, MediaType, SortBy } from '../../common/types/types';
import utils from '../../common/utils/utils';
import Button from '../../components/Clickable/Button';
import Empty from '../../components/Empty';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import MediaTypePicker from '../../components/MediaTypePicker';
import HorizontalMoviePoster from '../../components/Movies/Poster/Horizontal';
import VerticalMoviePoster from '../../components/Movies/Poster/Vertical';
import HorizontalShowPoster from '../../components/TV/Poster/Horizontal';
import VerticalShowPoster from '../../components/TV/Poster/Vertical';
import { List as ListType, MediaItem } from '../../store/slices/User/types';
import All from './components/All';
import ListPicker from './components/ListPicker';
import List from './components/ListPicker/components/ListItem';
import { Param } from './types';

const Lists = (): ReactElement => {
  const source = axios.CancelToken.source();

  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const { isOpen: isListPickerOpen, onOpen: onListPickerOpen, onClose: onListPickerClose } = useDisclosure();
  const [isSmallMob] = useMediaQuery('(max-width: 350px)');

  const { id, mediaType: paramMediaType } = useParams<Param>();
  const history = useHistory();

  const lists = useSelector((state) => state.user.data.lists);
  const displayMode = useSelector((state) => state.app.ui.displayMode);
  const color = useSelector((state) => state.user.ui.theme.color);

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [mediaType, setMediaType] = useState<MediaType | null>(null);

  const [list, setList] = useState<ListType | null>(null);

  const [movies, setMovies] = useState<MediaItem<'movie'>[]>([]);
  const [tv, setTV] = useState<MediaItem<'tv'>[]>([]);

  const handleFilterMovies = (sortBy: SortBy[], genres: Genre[]): void => {
    if (list && list.results.movies) {
      let filteredMovies: MediaItem<'movie'>[] = [...list.results.movies];

      if (genres && genres.length > 0) {
        filteredMovies = filteredMovies.filter((movie) => genres.some((genre) => movie.genre_ids.includes(genre.id)));
      }
      if (sortBy && sortBy.find((sort) => sort.isActive)) {
        filteredMovies = arraySort(filteredMovies, sortBy.find((sort) => sort.isActive)?.value, {
          reverse: sortDirection === 'desc'
        });
      }

      setMovies([...filteredMovies]);
    }
  };

  const handleFilterTV = (sortBy: SortBy[], genres: Genre[]): void => {
    if (list && list.results.tv) {
      let filteredTV: MediaItem<'tv'>[] = [...list.results.tv];

      if (genres && genres.length > 0) {
        filteredTV = filteredTV.filter((show) => genres.some((genre) => show.genre_ids.includes(genre.id)));
      }

      if (sortBy && sortBy.find((sort) => sort.isActive)) {
        filteredTV = arraySort(filteredTV, sortBy.find((sort) => sort.isActive)?.value, {
          reverse: sortDirection === 'desc'
        });
      }

      setTV([...filteredTV]);
    }
  };

  const handleSetFilters = (sortBy: SortBy[], genres: Genre[]): void => {
    switch (mediaType) {
      case 'movie':
        handleFilterMovies(sortBy, genres);
        break;
      case 'tv':
        handleFilterTV(sortBy, genres);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const activeList = lists.find((list) => list.id === id);

    setList(null);
    setMediaType(null);

    if (id && activeList) {
      setList(activeList);

      setMovies([...activeList.results.movies]);
      setTV([...activeList.results.tv]);
    }

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
  }, [history.location]);

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <>
      <VStack width='100%' spacing={0} pb={mediaType ? 4 : 0}>
        <VerticalGrid
          title={
            lists
              ? list
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
                  : `"${list.label}" list • Updated ${moment(list.date).fromNow()}`
                : `${lists.length} list${lists.length === 0 || lists.length > 1 ? 's' : ''}`
              : ''
          }
          header={
            mediaType || (list && lists.length > 1) ? (
              <HStack spacing={2}>
                <ScaleFade in={!!list && lists.length > 1} unmountOnExit>
                  <Button onClick={() => onListPickerOpen()} variant='outlined'>
                    Change list
                  </Button>
                </ScaleFade>
                <ScaleFade in={!!mediaType} unmountOnExit>
                  <HStack spacing={2}>
                    {movies.length > 0 && tv.length > 0 ? (
                      <Button onClick={() => onMediaTypePickerOpen()} variant='outlined'>
                        Change media-type
                      </Button>
                    ) : null}
                    {mediaType ? <Filters mediaType={mediaType} isLikedLists onFilter={handleSetFilters} /> : null}
                  </HStack>
                </ScaleFade>
              </HStack>
            ) : null
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
                    {movies.map((movie) =>
                      displayMode === 'list' ? (
                        <HorizontalMoviePoster key={movie.id} isLoading={false} movie={movie} />
                      ) : (
                        <VerticalMoviePoster key={movie.id} width='100%' isLoading={false} movie={movie} />
                      )
                    )}
                  </SimpleGrid>
                ) : (
                  <Box width='100%' px={2}>
                    <Empty
                      button={
                        <HStack spacing={1}>
                          <Button
                            color={utils.handleReturnColor(color)}
                            onClick={() => history.push({ pathname: `/lists/${list.id}` })}
                            size='xs'
                            variant='outlined'>
                            {`Back to "${list.label}" list`}
                          </Button>
                          <Text align='center' fontSize='xs' fontWeight='medium'>
                            OR
                          </Text>
                          <Button
                            color={utils.handleReturnColor(color)}
                            onClick={() => history.push({ pathname: '/lists' })}
                            size='xs'
                            variant='outlined'>
                            Back to lists
                          </Button>
                        </HStack>
                      }
                      label={`No movies found in "${list.label}" list!`}
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
                    {tv.map((show) =>
                      displayMode === 'list' ? (
                        <HorizontalShowPoster key={show.id} isLoading={false} show={show} />
                      ) : (
                        <VerticalShowPoster key={show.id} width='100%' isLoading={false} show={show} />
                      )
                    )}
                  </SimpleGrid>
                ) : (
                  <Box width='100%' px={2}>
                    <Empty
                      button={
                        <HStack spacing={1}>
                          <Button
                            color={utils.handleReturnColor(color)}
                            onClick={() => history.push({ pathname: `/lists/${list.id}` })}
                            size='xs'
                            variant='outlined'>
                            {`Back to "${list.label}" list`}
                          </Button>
                          <Text align='center' fontSize='xs' fontWeight='medium'>
                            OR
                          </Text>
                          <Button
                            color={utils.handleReturnColor(color)}
                            onClick={() => history.push({ pathname: '/lists' })}
                            size='xs'
                            variant='outlined'>
                            Back to lists
                          </Button>
                        </HStack>
                      }
                      label={`No tv shows found in "${list.label}" list!`}
                      variant='outlined'
                    />
                  </Box>
                )
              ) : (
                <All list={list} movies={movies} tv={tv} />
              )
            ) : (
              <Box width='100%' px={2}>
                <Empty
                  button={
                    <Button
                      color={utils.handleReturnColor(color)}
                      onClick={() => history.push({ pathname: '/lists' })}
                      size='xs'
                      variant='outlined'>
                      Back to lists
                    </Button>
                  }
                  label={`You have no items in "${list.label}" list!`}
                  variant='outlined'
                  size='xl'
                />
              </Box>
            )
          ) : lists && lists.length > 0 ? (
            <SimpleGrid width='100%' columns={[isSmallMob ? 1 : 2, 2, 3, 4, 4]} spacing={2} px={2}>
              {lists.map((list) => (
                <List
                  key={list.id}
                  {...list}
                  onClick={(id: ListType['id']) => history.push({ pathname: `/lists/${id}` })}
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

      {!!mediaType && list ? (
        <MediaTypePicker
          mediaTypes={['movie', 'tv']}
          mediaType={mediaType}
          isOpen={isMediaTypePickerOpen}
          onClose={onMediaTypePickerClose}
          onSetType={(mediaType: MediaType) => history.push({ pathname: `/lists/${list.id}/${mediaType}` })}
        />
      ) : null}
    </>
  );
};

export default Lists;
