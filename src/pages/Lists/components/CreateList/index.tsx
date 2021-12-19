import { ReactElement } from 'react';

import {
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Collapse
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useForm, useFormState, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../../components/Clickable/Button';
import ConfirmModal from '../../../../components/ConfirmModal';
import Modal from '../../../../components/Modal';
import { setLists } from '../../../../store/slices/User';
import { CreateListProps, Form } from './types';
import { defaultValues, schema } from './validation';

const placeholders = [
  'Action Movies',
  'DC Movies',
  'Leonardo DiCaprio',
  'Classics',
  'Comedy',
  'Mafia Movies & TV Shows',
  'Jennifer Lawrence',
  'Johnny Depp',
  'Angelina Jolie'
];
const placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];

const CreateList = ({ isOpen, onClose }: CreateListProps): ReactElement => {
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  const dispatch = useDispatch();
  const lists = useSelector((state) => state.user.data.lists);
  const color = useSelector((state) => state.user.ui.theme.color);

  const form = useForm<Form>({
    defaultValues,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const { isDirty } = useFormState({ control: form.control });

  const handleSubmit = (values: Form): void => {
    const id = uuid();

    dispatch(
      setLists([
        ...lists,
        {
          id,
          label: values.label,
          description: values?.description || '',
          date: moment(new Date()).toISOString(),
          results: {
            movies: [],
            tv: []
          }
        }
      ])
    );

    handleClose(id);
  };

  const handleCloseConfirm = (): void => {
    onCloseConfirm();
    handleClose();
  };

  const handleClose = (id?: string): void => {
    form.reset({ ...defaultValues });
    onClose(id);
  };

  const handleCheckClose = (): void => {
    if (!isDirty) {
      handleClose();
    } else {
      onOpenConfirm();
    }
  };

  return (
    <>
      <Modal
        title='Create a new List'
        actions={
          <Button
            color={color}
            isDisabled={!isDirty}
            onClick={form.handleSubmit((values) => handleSubmit(values))}
            size='sm'>
            Submit List
          </Button>
        }
        isOpen={isOpen}
        onClose={handleCheckClose}
        isCentered
        size='lg'>
        <VStack spacing={3} p={2}>
          <Controller
            control={form.control}
            name='label'
            render={({ field: { onChange, value, name }, fieldState: { error } }) => (
              <FormControl id={name} isRequired>
                <FormLabel fontSize='sm' mb={1}>
                  Name
                </FormLabel>
                <Input
                  autoComplete='off'
                  border='solid2'
                  errorBorderColor='red.400'
                  focusBorderColor={`${color}.400`}
                  isInvalid={Boolean(error)}
                  fontSize='md'
                  name={name}
                  placeholder={`Try "${placeholder}"`}
                  onChange={onChange}
                  size='lg'
                  value={value}
                  px={2}
                  _focus={{ boxShadow: 'none' }}
                />
                <Collapse in={Boolean(error)} unmountOnExit>
                  <FormHelperText mt={1}>{error?.message}</FormHelperText>
                </Collapse>
              </FormControl>
            )}
          />
          <Controller
            control={form.control}
            name='description'
            render={({ field: { onChange, value, name }, fieldState: { error } }) => (
              <FormControl id={name}>
                <FormLabel fontSize='sm' mb={1}>
                  Description (Optional)
                </FormLabel>
                <Textarea
                  autoComplete='off'
                  border='solid2'
                  errorBorderColor='red.400'
                  focusBorderColor={`${color}.400`}
                  isInvalid={Boolean(error)}
                  fontSize='md'
                  name={name}
                  onChange={onChange}
                  size='lg'
                  value={value}
                  px={2}
                  _focus={{ boxShadow: 'none' }}
                />
                <Collapse in={Boolean(error)} unmountOnExit>
                  <FormHelperText mt={1}>{error?.message}</FormHelperText>
                </Collapse>
              </FormControl>
            )}
          />
        </VStack>
      </Modal>

      <ConfirmModal
        actions={
          <Button color={color} onClick={() => handleCloseConfirm()} size='sm'>
            Close
          </Button>
        }
        title='Unsaved data!'
        description='Are you sure you want to close the modal, the data inserted will be lost unless you save it!'
        isOpen={isConfirmOpen}
        onClose={onCloseConfirm}
      />
    </>
  );
};

export default CreateList;
