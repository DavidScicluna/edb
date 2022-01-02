import { ReactElement } from 'react';

import { useMediaQuery, useDisclosure, HStack, VStack, Fade } from '@chakra-ui/react';
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import _ from 'lodash';
import qs from 'query-string';
import { useForm, useFormState } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useSelector } from '../../common/hooks';
import Modal from '../../components/Modal';
import Button from '../Clickable/Button';
import Direction from './components/Direction';
import Sort from './components/Sort';
import { SortByProps, Form } from './types';

const defaultValues: Form = {
  sortBy: {
    label: 'Popularity',
    value: 'popularity'
  },
  direction: 'desc'
};

const SortBy = (props: SortByProps): ReactElement => {
  const [isMd] = useMediaQuery('(max-width: 900px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const color = useSelector((state) => state.user.ui.theme.color);

  const location = useLocation();

  const { sortBy, renderButton, onSort } = props;

  const form = useForm<Form>({ defaultValues });

  const { isDirty } = useFormState({ control: form.control });

  const handleReset = (): void => {
    form.setValue('sortBy', defaultValues.sortBy, { shouldDirty: true });
    form.setValue('direction', defaultValues.direction, { shouldDirty: true });
  };

  const handleSubmit = (values: Form): void => {
    onSort({ ...values });

    onClose();

    setTimeout(() => form.reset({ ...values }), 250);
  };

  const handleOpen = (): void => {
    const search = qs.parse(location.search);

    if (!_.isEmpty(search) && search && search['sort_by']) {
      const splitSort = String(search['sort_by']).split('.');
      const sort = sortBy.find((sort) => sort.value === splitSort[0]);

      form.reset({
        sortBy: sort,
        direction: splitSort[1] === 'asc' ? 'asc' : 'desc'
      });
    }

    onOpen();
  };

  const handleClose = (): void => {
    form.reset({ ...defaultValues });

    onClose();
  };

  return (
    <>
      {renderButton({
        color: isOpen ? color : 'gray',
        icon: <ImportExportOutlinedIcon />,
        onClick: () => handleOpen()
      })}

      <Modal
        title='Sort By'
        renderActions={({ color, colorMode, size }) => (
          <HStack spacing={2}>
            <Fade in={isDirty || !_.isEqual(defaultValues, form.getValues())} unmountOnExit>
              <Button color={color} colorMode={colorMode} onClick={() => handleReset()} size={size} variant='text'>
                Reset
              </Button>
            </Fade>
            <Button
              color={color}
              colorMode={colorMode}
              isDisabled={!isDirty}
              onClick={form.handleSubmit((values) => handleSubmit(values))}
              size={size}
            >
              Sort
            </Button>
          </HStack>
        )}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
        size={isMd ? 'full' : '4xl'}
      >
        <VStack width='100%' spacing={2} p={2}>
          <Direction form={form} />
          <Sort form={form} sortBy={sortBy} />
        </VStack>
      </Modal>
    </>
  );
};

export default SortBy;
