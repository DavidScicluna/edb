import React, { ReactElement, KeyboardEvent } from 'react';

import {
  useColorMode,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
  Text,
  Collapse
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { useSelector } from '../../../../../../../../common/hooks';
import { handleReturnColor } from '../../../../../../../../common/utils';
import Card from '../../../../../../../../components/Card';
import Button from '../../../../../../../../components/Clickable/Button';
import Modal from '../../../../../../../../components/Modal';
import { toggleConfirm } from '../../../../../../../../store/slices/Modals';
import { setUserReviews } from '../../../../../../../../store/slices/User';
import Rating from './components/Rating';
import { CreateReviewProps, Form } from './types';
import { defaultValues, schema } from './validation';

const CreateReview = ({ isOpen, onClose }: CreateReviewProps): ReactElement => {
  const { colorMode } = useColorMode();

  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.user.data.reviews.user);
  const color = useSelector((state) => state.user.ui.theme.color);
  const confirmModal = useSelector((state) => state.modals.ui.confirmModal);

  const form = useForm<Form>({
    defaultValues,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const { isDirty } = useFormState({ control: form.control });

  const handleSubmit = (values: Form): void => {
    const id = uuid();

    dispatch(
      setUserReviews([
        ...userReviews,
        {
          id,
          author: 'User', // TODO use user name
          author_details: { name: '', username: '', avatar_path: '', rating: values.rating }, // TODO use user details
          content: values.review,
          created_at: moment(new Date()).toISOString(),
          updated_at: moment(new Date()).toISOString()
        }
      ])
    );

    handleClose();
  };

  const handleClose = (): void => {
    form.reset({ ...defaultValues });
    onClose();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter') {
      form.handleSubmit((values) => handleSubmit(values));
    }
  };

  const handleCheckClose = (): void => {
    if (!isDirty) {
      handleClose();
    } else {
      dispatch(
        toggleConfirm({
          open: true,
          title: 'Unsaved data!',
          description: 'Are you sure you want to close the modal, the data inserted will be lost unless you save it!',
          stringifiedButtonProps: JSON.stringify({
            color: handleReturnColor(color),
            label: 'Close',
            onClick: () => {
              dispatch(toggleConfirm({ ...confirmModal, open: false }));
              handleClose();
            }
          })
        })
      );
    }
  };

  return (
    <Modal
      title='Create a new review'
      actions={
        <Button
          color={handleReturnColor(color)}
          isDisabled={!isDirty}
          onClick={form.handleSubmit((values) => handleSubmit(values))}
          size='sm'>
          Submit Review
        </Button>
      }
      isOpen={isOpen}
      onClose={handleCheckClose}
      isCentered
      size='lg'>
      <VStack spacing={3} p={2}>
        <Controller
          control={form.control}
          name='rating'
          render={({ field: { value, name }, fieldState: { error } }) => (
            <Card
              box={{ header: { pb: 1.5 }, body: { pt: 1 } }}
              color={error ? 'red' : 'gray'}
              isFullWidth
              px={2}
              pt={1.5}
              pb={1}>
              {{
                header: {
                  title: (
                    <Text color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='sm'>
                      Rating
                    </Text>
                  ),
                  actions: (
                    <Text color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs'>
                      {`${value} stars`}
                    </Text>
                  )
                },
                body: (
                  <Rating
                    name={name}
                    onChange={(value) => form.setValue('rating', value, { shouldDirty: true })}
                    value={value || 0}
                  />
                ),
                footer: error ? (
                  <Collapse in={Boolean(error)} unmountOnExit>
                    <Text color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs'>
                      {error}
                    </Text>
                  </Collapse>
                ) : undefined
              }}
            </Card>
          )}
        />
        <Controller
          control={form.control}
          name='review'
          render={({ field: { onChange, value, name }, fieldState: { error } }) => (
            <FormControl id={name} isRequired>
              <FormLabel fontSize='sm' mb={1}>
                Review
              </FormLabel>
              <Textarea
                autoComplete='off'
                border='solid2'
                boxShadow='none'
                errorBorderColor='red.400'
                focusBorderColor={`${handleReturnColor(color)}.400`}
                isInvalid={Boolean(error)}
                fontSize='md'
                name={name}
                onChange={onChange}
                onKeyPress={handleKeyDown}
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

export default CreateReview;
