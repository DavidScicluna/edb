import React, { ReactElement, useEffect } from 'react';

import { useDisclosure, useMediaQuery, VStack, HStack } from '@chakra-ui/react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { movieSortBy, tvSortBy, peopleSortBy } from '../../common/data/sort';
import useSelector from '../../common/hooks/useSelectorTyped';
import Modal from '../../components/Modal';
import { toggleDisplayMode, toggleSortDirection } from '../../store/slices/App';
import Button from '../Inputs/Button';
import IconButton from '../Inputs/IconButton';
import DisplayMode from './components/DisplayMode';
import Genres from './components/Genres';
import SortBy from './components/SortBy';
import { FiltersProps, Form } from './types';

const Filters = ({ mediaType, onFilter }: FiltersProps): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isXs] = useMediaQuery('(max-width: 40em)');

  const location = useLocation();

  const dispatch = useDispatch();
  const displayMode = useSelector((state) => state.app.data.displayMode);
  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const defaultValues = {
    displayMode,
    sort: {
      sortBy: mediaType === 'movie' ? [...movieSortBy] : mediaType === 'tv' ? [...tvSortBy] : [...peopleSortBy],
      direction: sortDirection
    },
    genres: []
  };

  const form = useForm<Form>({ defaultValues });

  const { isDirty, dirtyFields } = useFormState({ control: form.control });

  const handleSubmitFilters = (values: Form): void => {
    if (dirtyFields.displayMode) {
      dispatch(toggleDisplayMode(values.displayMode));
    }

    if (dirtyFields.sort) {
      onFilter(values.sort.sortBy, []);
      dispatch(toggleSortDirection(values.sort.direction));
    }

    if (dirtyFields.genres) {
      onFilter([], values.genres);
    }

    onClose();

    form.reset({ ...values });
  };

  const handleReset = (): void => {
    dispatch(toggleDisplayMode('grid'));
    dispatch(toggleSortDirection('asc'));

    onFilter(mediaType === 'movie' ? movieSortBy : mediaType === 'tv' ? tvSortBy : peopleSortBy, []);

    form.reset({ ...defaultValues });
  };

  const handleClose = (): void => {
    form.reset({ ...form.getValues() });
    onClose();
  };

  useEffect(() => {
    const pathname = location.pathname.split('/');

    if (pathname.includes('movie') || pathname.includes('tv') || pathname.includes('person')) {
      form.reset({
        ...defaultValues,
        sort: {
          ...defaultValues.sort,
          sortBy: pathname.includes('movie')
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
        color={isOpen ? 'blue' : 'gray'}
        icon={VisibilityOutlinedIcon}
        onClick={() => onOpen()}
        size='sm'
        variant='outlined'
      />

      <Modal
        title='Filter'
        actions={
          <HStack spacing={2}>
            <Button variant='outlined' isDisabled={!isDirty} onClick={() => handleReset()} size='sm'>
              Reset
            </Button>
            <Button
              color='blue'
              isDisabled={!isDirty}
              onClick={form.handleSubmit((values) => handleSubmitFilters(values))}
              size='sm'>
              Submit
            </Button>
          </HStack>
        }
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
        size={isXs ? 'full' : '2xl'}>
        <VStack spacing={3} p={2}>
          <DisplayMode form={form} />

          <SortBy form={form} />

          {mediaType !== 'person' ? <Genres mediaType={mediaType} form={form} /> : null}
        </VStack>
      </Modal>
    </>
  );
};

export default Filters;
