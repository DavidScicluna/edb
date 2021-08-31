import React, { ReactElement, useState, useEffect } from 'react';

import {
  useColorMode,
  useDisclosure,
  useMediaQuery,
  useToast,
  VStack,
  HStack,
  SimpleGrid,
  Box,
  Center,
  Text,
  Fade,
  ScaleFade
} from '@chakra-ui/react';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import arraySort from 'array-sort';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { useSelector } from '../../common/hooks';
import { Genre, MediaType, SortBy } from '../../common/types/types';
import Badge from '../../components/Badge';
import Button from '../../components/Clickable/Button';
import IconButton from '../../components/Clickable/IconButton';
import Empty from '../../components/Empty';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import MediaTypePicker from '../../components/MediaTypePicker';
import HorizontalMoviePoster from '../../components/Movies/Poster/Horizontal';
import VerticalMoviePoster from '../../components/Movies/Poster/Vertical';
import HorizontalShowPoster from '../../components/TV/Poster/Horizontal';
import VerticalShowPoster from '../../components/TV/Poster/Vertical';
import Page from '../../containers/Page';
import { home, lists as listsBreadcrumb } from '../../containers/Page/common/data/breadcrumbs';
import { Breadcrumb } from '../../containers/Page/types';
import { toggleConfirm } from '../../store/slices/Modals';
import { setLists } from '../../store/slices/User';
import { List as ListType, MediaItem } from '../../store/slices/User/types';
import All from './components/All';
import CreateList from './components/CreateList';
import EditList from './components/EditList';
import EmptyList from './components/Empty';
import ListInfo from './components/ListInfo';
import ListPicker from './components/ListPicker';
import List from './components/ListPicker/components/ListItem';
import Toast from './components/Toast';
import { Param } from './types';

const Lists = (): ReactElement => {
  const source = axios.CancelToken.source();

  const { colorMode } = useColorMode();
  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const { isOpen: isListPickerOpen, onOpen: onListPickerOpen, onClose: onListPickerClose } = useDisclosure();

  const { isOpen: isCreateListOpen, onOpen: onCreateListOpen, onClose: onCreateListClose } = useDisclosure();
  const { isOpen: isEditListOpen, onOpen: onEditListOpen, onClose: onEditListClose } = useDisclosure();
  const { isOpen: isListInfoOpen, onOpen: onListInfoOpen, onClose: onListInfoClose } = useDisclosure();

  const [isSmallMob] = useMediaQuery('(max-width: 350px)');
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const toast = useToast();

  const { id, mediaType: paramMediaType } = useParams<Param>();
  const history = useHistory();

  const dispatch = useDispatch();
  const lists = useSelector((state) => state.user.data.lists);
  const displayMode = useSelector((state) => state.app.ui.displayMode);
  const confirmModal = useSelector((state) => state.modals.ui.confirmModal);

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [mediaType, setMediaType] = useState<MediaType | null>(null);

  const [list, setList] = useState<ListType | null>(null);

  const [movies, setMovies] = useState<MediaItem<'movie'>[]>([]);
  const [tv, setTV] = useState<MediaItem<'tv'>[]>([]);

  const [selected, setSelected] = useState<ListType>();

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

  const handleReturnBreadcrumbs = (): Breadcrumb[] => {
    const breadcrumbs: Breadcrumb[] = [home, listsBreadcrumb];

    if (list) {
      breadcrumbs.push({
        label: list.label,
        to: { pathname: `/lists/${list.id}` }
      });

      if (mediaType) {
        switch (mediaType) {
          case 'tv':
            breadcrumbs.push({
              label: 'TV Shows',
              to: { pathname: `/lists/${list.id}/tv` }
            });
            break;
          case 'movie':
            breadcrumbs.push({
              label: 'Movies',
              to: { pathname: `/lists/${list.id}/movie` }
            });
            break;
          default:
            break;
        }
      }
    }

    return breadcrumbs;
  };

  const handleSelectList = (id: ListType['id']): void => {
    if (selected?.id === id) {
      setSelected(undefined);
    } else {
      setSelected(lists.find((list) => list.id === id));
    }
  };

  const handleCloseToast = (): void => {
    toast.closeAll();
    setSelected(undefined);
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
    toast.closeAll();

    if (selected) {
      toast({
        duration: null,
        isClosable: true,
        position: 'bottom',
        variant: 'solid',
        render: function RenderToast() {
          return (
            <Toast
              selected={selected}
              onInfo={() => onListInfoOpen()}
              onEdit={() => onEditListOpen()}
              onDelete={() =>
                dispatch(
                  toggleConfirm({
                    open: true,
                    title: isSm ? 'Delete' : `Delete ${selected?.label ? `"${selected.label}"` : ''} list`,
                    description: `Are you sure you want to delete the ${
                      selected?.label ? `"${selected.label}"` : ''
                    } list? You will not be able to retrieve this list back!`,
                    submitButton: (
                      <Button
                        color='red'
                        onClick={() => {
                          dispatch(setLists(lists.filter((paramList) => paramList.id !== selected?.id)));
                          dispatch(toggleConfirm({ ...confirmModal, open: false }));
                          handleCloseToast();
                        }}
                        size='sm'>
                        Delete
                      </Button>
                    )
                  })
                )
              }
              onClose={() => handleCloseToast()}
            />
          );
        }
      });
    }
  }, [selected]);

  useEffect(() => {
    return () => source.cancel();
  }, []);

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
              {list
                ? `"${list.label}" list ${mediaType === 'movie' ? 'Movies' : mediaType === 'tv' ? 'TV shows' : ''}`
                : 'Lists'}
            </Text>
            <Badge
              label={
                list
                  ? mediaType === 'movie'
                    ? String(movies.length)
                    : mediaType === 'tv'
                    ? String(tv.length)
                    : String(movies.length + tv.length)
                  : String(lists.length)
              }
              size='lg'
              ml={2}
            />
          </Center>
        }
        breadcrumbs={handleReturnBreadcrumbs()}>
        {{
          actions:
            mediaType || (list && lists.length > 0) ? (
              isSm ? (
                <Fade in={!!mediaType || (!!list && lists.length > 1)} unmountOnExit style={{ width: '100%' }}>
                  <VStack width='100%' spacing={2}>
                    {mediaType ? (
                      <HStack width='100%' spacing={2}>
                        {movies.length > 0 && tv.length > 0 ? (
                          <Button onClick={() => onMediaTypePickerOpen()} isFullWidth variant='outlined'>
                            Change media-type
                          </Button>
                        ) : null}
                        {mediaType ? <Filters mediaType={mediaType} isLikedLists onFilter={handleSetFilters} /> : null}
                      </HStack>
                    ) : null}
                    {!!list && lists.length > 1 ? (
                      <Button onClick={() => onListPickerOpen()} isFullWidth variant='outlined'>
                        Change list
                      </Button>
                    ) : null}
                  </VStack>
                </Fade>
              ) : (
                <HStack spacing={2}>
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
                  <ScaleFade in={!!list && lists.length > 1} unmountOnExit>
                    <Button onClick={() => onListPickerOpen()} variant='outlined'>
                      Change list
                    </Button>
                  </ScaleFade>
                  <ScaleFade in={!!list} unmountOnExit>
                    <IconButton
                      aria-label='Open Information modal'
                      icon={InfoTwoToneIcon}
                      onClick={() => onListInfoOpen()}
                      variant='outlined'
                    />
                  </ScaleFade>
                </HStack>
              )
            ) : (
              <Button onClick={() => onCreateListOpen()} isFullWidth={isSm} variant='outlined'>
                Create new list
              </Button>
            ),
          body: (
            <VStack width='100%' spacing={0} pb={mediaType ? 4 : 0}>
              <VerticalGrid>
                {list ? (
                  movies.length > 0 || tv.length > 0 ? (
                    mediaType === 'movie' ? (
                      movies.length > 0 ? (
                        <SimpleGrid
                          width='100%'
                          columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5, 6]}
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
                        <EmptyList id={list.id} label={list.label} mediaTypeLabel='movies' />
                      )
                    ) : mediaType === 'tv' ? (
                      tv.length > 0 ? (
                        <SimpleGrid
                          width='100%'
                          columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5, 6]}
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
                        <EmptyList id={list.id} label={list.label} mediaTypeLabel='tv shows' />
                      )
                    ) : (
                      <All list={list} movies={movies} tv={tv} />
                    )
                  ) : (
                    <EmptyList id={list.id} label={list.label} />
                  )
                ) : lists && lists.length > 0 ? (
                  <SimpleGrid width='100%' columns={[1, 2, 3, 4, 4]} spacing={2} px={2} pt={2}>
                    {lists.map((list) => (
                      <List
                        {...list}
                        key={list.id}
                        isSelectable
                        isSelected={selected?.id === list.id || false}
                        onSelected={handleSelectList}
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
          )
        }}
      </Page>

      <ListPicker activeList={list} isOpen={isListPickerOpen} onClose={onListPickerClose} />

      <CreateList isOpen={isCreateListOpen} onClose={onCreateListClose} />

      <EditList list={selected} isOpen={isEditListOpen} onClose={() => onEditListClose()} />

      <ListInfo list={list || selected} isOpen={isListInfoOpen} onClose={onListInfoClose} />

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
