import { ReactElement, KeyboardEvent, useEffect } from 'react';

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

import { useSelector } from '../../../../common/hooks';
import { handleReturnColor } from '../../../../common/utils';
import Button from '../../../../components/Clickable/Button';
import ConfirmModal from '../../../../components/ConfirmModal';
import Modal from '../../../../components/Modal';
import { setLists } from '../../../../store/slices/User';
import { EditListProps, Form } from './types';
import { defaultValues, schema } from './validation';

const EditList = ({ list, isOpen, onClose }: EditListProps): ReactElement => {
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
    if (list) {
      dispatch(
        setLists(
          lists.map((paramList) =>
            paramList.id === list.id
              ? {
                  ...list,
                  label: values.label,
                  description: values?.description || '',
                  date: moment(new Date()).toISOString(),
                  results: {
                    ...list.results
                  }
                }
              : { ...paramList }
          )
        )
      );

      onClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      form.handleSubmit((values) => handleSubmit(values));
    }
  };

  const handleCloseConfirm = (): void => {
    onCloseConfirm();
    onClose();
  };

  const handleCheckClose = (): void => {
    if (!isDirty) {
      onClose();
    } else {
      onOpenConfirm();
    }
  };

  useEffect(() => {
    if (isOpen && list) {
      form.reset({
        label: list.label,
        description: list.description
      });
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        title={`Edit ${list?.label ? `"${list.label}"` : ''} List`}
        actions={
          <Button
            color={handleReturnColor(color)}
            isDisabled={!isDirty}
            onClick={form.handleSubmit((values) => handleSubmit(values))}
            size='sm'>
            Save List
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
                  Label
                </FormLabel>
                <Input
                  autoComplete='off'
                  border='solid2'
                  errorBorderColor='red.400'
                  focusBorderColor={`${handleReturnColor(color)}.400`}
                  isInvalid={Boolean(error)}
                  fontSize='md'
                  name={name}
                  placeholder='Try "DC Movies"'
                  onChange={onChange}
                  onKeyPress={handleKeyDown}
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
                  focusBorderColor={`${handleReturnColor(color)}.400`}
                  name={name}
                  isInvalid={Boolean(error)}
                  fontSize='md'
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
        renderButton={
          <Button color={handleReturnColor(color)} onClick={() => handleCloseConfirm()} size='sm'>
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

export default EditList;
