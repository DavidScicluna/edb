import React, { ReactElement, useEffect } from 'react';

import { useDisclosure, VStack } from '@chakra-ui/react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  movieSortBy,
  likedListsMovieSortBy,
  tvSortBy,
  likedListsTvSortBy,
  peopleSortBy,
  likedListsPeopleSortBy
} from '../../common/data/sort';
import { useSelector } from '../../common/hooks';
import utils from '../../common/utils/utils';
import Modal from '../../components/Modal';
import { toggleDisplayMode, toggleSortDirection } from '../../store/slices/App';
import Button from '../Clickable/Button';
import IconButton from '../Clickable/IconButton';
import Departments from './components/Departments';
import DisplayMode from './components/DisplayMode';
import Genres from './components/Genres';
import SortBy from './components/SortBy';
import { FiltersProps, Form } from './types';

const Filters = (props: FiltersProps): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();

  const dispatch = useDispatch();
  const displayMode = useSelector((state) => state.app.ui.displayMode);
  const sortDirection = useSelector((state) => state.app.data.sortDirection);
  const color = useSelector((state) => state.user.ui.theme.color);

  const { mediaType, isLikedLists = false, isDisabled = false, onFilter } = props;

  const defaultValues = {
    displayMode,
    sort: {
      sortBy: isLikedLists
        ? mediaType === 'movie'
          ? [...likedListsMovieSortBy]
          : mediaType === 'tv'
          ? [...likedListsTvSortBy]
          : [...likedListsPeopleSortBy]
        : mediaType === 'movie'
        ? [...movieSortBy]
        : mediaType === 'tv'
        ? [...tvSortBy]
        : [...peopleSortBy],
      direction: sortDirection
    },
    genres: [],
    departments: []
  };

  const form = useForm<Form>({ defaultValues });

  const { isDirty, dirtyFields } = useFormState({ control: form.control });

  const handleSubmitFilters = (values: Form): void => {
    if (dirtyFields.displayMode) {
      dispatch(toggleDisplayMode(values.displayMode));
    }

    if (dirtyFields.sort) {
      onFilter(values.sort.sortBy, [], []);
      dispatch(toggleSortDirection(values.sort.direction));
    }

    if (dirtyFields.genres) {
      onFilter([], values.genres, []);
    }

    if (dirtyFields.departments) {
      onFilter([], [], values.departments);
    }

    onClose();

    form.reset({ ...values });
  };

  const handleClose = (): void => {
    form.reset({ ...defaultValues });
    onClose();
  };

  useEffect(() => {
    const pathname = location.pathname.split('/');

    if (pathname.includes('movie') || pathname.includes('tv') || pathname.includes('person')) {
      form.reset({
        ...defaultValues,
        sort: {
          ...defaultValues.sort,
          sortBy: isLikedLists
            ? pathname.includes('movie')
              ? [...likedListsMovieSortBy]
              : pathname.includes('tv')
              ? [...likedListsTvSortBy]
              : [...likedListsPeopleSortBy]
            : pathname.includes('movie')
            ? [...movieSortBy]
            : pathname.includes('tv')
            ? [...tvSortBy]
            : [...peopleSortBy]
        }
      });
    }
  }, [location]);

  return (
    <>
      <IconButton
        aria-label='Open filters modal'
        color={isOpen ? utils.handleReturnColor(color) : 'gray'}
        icon={VisibilityOutlinedIcon}
        isDisabled={isDisabled}
        onClick={() => onOpen()}
        variant='outlined'
      />

      <Modal
        title='Filter'
        actions={
          <Button
            color={utils.handleReturnColor(color)}
            isDisabled={!isDirty}
            onClick={form.handleSubmit((values) => handleSubmitFilters(values))}
            size='sm'>
            Submit
          </Button>
        }
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
        size='3xl'>
        <VStack spacing={2} p={2}>
          <DisplayMode form={form} />

          <SortBy form={form} />

          {mediaType !== 'person' ? <Genres mediaType={mediaType} form={form} /> : <Departments form={form} />}
        </VStack>
      </Modal>
    </>
  );
};

export default Filters;
