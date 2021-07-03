import React, { ReactElement } from 'react';

import {
  useMediaQuery,
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

import useSelector from '../../../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../../../common/utils/utils';
import Button from '../../../../../../../components/Inputs/Button';
import Modal from '../../../../../../../components/Modal';
import { setLists } from '../../../../../../../store/slices/User';
import { CreateListProps, Form } from './types';
import { defaultValues, schema } from './validation';

const CreateList = ({ isOpen, onClose }: CreateListProps): ReactElement => {
  const [isXs] = useMediaQuery('(max-width: 40em)');

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
    dispatch(
      setLists([
        ...lists,
        {
          id: uuid(),
          label: values.label,
          description: values?.description || '',
          date: moment(new Date()).toISOString(),
          results: []
        }
      ])
    );

    form.reset({ ...defaultValues });
    onClose();
  };

  const handleClose = (): void => {
    if (!isDirty) {
      form.reset({ ...defaultValues });
      onClose();
    }

    // Toggle alert if has unsaved data!
  };

  return (
    <Modal
      title='Create a new List'
      actions={
        <Button
          color={utils.handleReturnColor(color)}
          isDisabled={!isDirty}
          onClick={form.handleSubmit((values) => handleSubmit(values))}
          size='sm'>
          Submit List
        </Button>
      }
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size={isXs ? 'full' : 'lg'}>
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
                errorBorderColor='red.400'
                focusBorderColor={`${utils.handleReturnColor(color)}.400`}
                isFullWidth
                isInvalid={Boolean(error)}
                fontSize='md'
                name={name}
                placeholder='Try "DC Movies"'
                onChange={onChange}
                size='lg'
                value={value}
                px={2}
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
                errorBorderColor='red.400'
                focusBorderColor={`${utils.handleReturnColor(color)}.400`}
                isFullWidthname={name}
                isInvalid={Boolean(error)}
                fontSize='md'
                onChange={onChange}
                size='lg'
                value={value}
                px={2}
              />
              <Collapse in={Boolean(error)} unmountOnExit>
                <FormHelperText mt={1}>{error?.message}</FormHelperText>
              </Collapse>
            </FormControl>
          )}
        />
      </VStack>
    </Modal>
  );
};

export default CreateList;
