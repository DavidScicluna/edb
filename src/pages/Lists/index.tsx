import { ReactElement, useState, useEffect } from 'react';

import { useColorMode, useDisclosure, useToast, VStack, SimpleGrid, Box, Center, Text } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import { useSelector } from '../../common/hooks';
import { Genre, MediaType, SortBy } from '../../common/types';
import Badge from '../../components/Badge';
import Empty from '../../components/Empty';
import VerticalGrid from '../../components/Grid/Vertical';
import MediaTypePicker from '../../components/MediaTypePicker';
import Page from '../../containers/Page';
import { home, lists as listsBreadcrumb } from '../../containers/Page/common/data/breadcrumbs';
import { Breadcrumb } from '../../containers/Page/types';
import { List as ListType, MediaItem } from '../../store/slices/User/types';
import VerticalMovies from '../Movies/components/VerticalMovies';
import VerticalTV from '../TV/components/VerticalTV';
import Actions from './components/Actions';
import All from './components/All';
import CreateList from './components/CreateList';
import DeleteList from './components/DeleteList';
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
  const { isOpen: isDeleteListOpen, onOpen: onDeleteListOpen, onClose: onDeleteListClose } = useDisclosure();
  const { isOpen: isEditListOpen, onOpen: onEditListOpen, onClose: onEditListClose } = useDisclosure();
  const { isOpen: isListInfoOpen, onOpen: onListInfoOpen, onClose: onListInfoClose } = useDisclosure();

  const toast = useToast();

  const { id, mediaType: paramMediaType } = useParams<Param>();
  const history = useHistory();

  const lists = useSelector((state) => state.user.data.lists);

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
        filteredMovies = sort(filteredMovies, sortBy.find((sort) => sort.isActive)?.value, {
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
        filteredTV = sort(filteredTV, sortBy.find((sort) => sort.isActive)?.value, {
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
              onDelete={() => onDeleteListOpen()}
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
          actions: (
            <Actions
              mediaType={mediaType}
              lists={lists}
              list={list}
              movies={movies}
              tv={tv}
              onFilter={handleSetFilters}
              onMediaTypePickerOpen={onMediaTypePickerOpen}
              onListPickerOpen={onListPickerOpen}
              onListInfoOpen={onListInfoOpen}
              onCreateListOpen={onCreateListOpen}
            />
          ),
          body: (
            <VStack width='100%' spacing={0} pb={mediaType ? 4 : 0}>
              <VerticalGrid>
                {list ? (
                  movies.length > 0 || tv.length > 0 ? (
                    mediaType === 'movie' ? (
                      movies.length > 0 ? (
                        <VerticalMovies isError={false} isSuccess isLoading={false} movies={movies} />
                      ) : (
                        <EmptyList id={list.id} label={list.label} mediaTypeLabel='movies' />
                      )
                    ) : mediaType === 'tv' ? (
                      tv.length > 0 ? (
                        <VerticalTV isError={false} isSuccess isLoading={false} tv={tv} />
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

      <DeleteList
        id={selected?.id}
        label={selected?.label}
        isOpen={isDeleteListOpen}
        onClose={onDeleteListClose}
        onCloseToast={() => handleCloseToast()}
      />

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
