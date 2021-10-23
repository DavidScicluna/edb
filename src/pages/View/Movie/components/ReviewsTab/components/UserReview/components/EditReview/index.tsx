import React, { ReactElement, useEffect } from 'react';

import {
  useColorMode,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
  Text,
  Collapse
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditOutlined as EditOutlinedIcon } from '@material-ui/icons';
import moment from 'moment';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../../../../../common/hooks';
import { handleReturnColor } from '../../../../../../../../../common/utils';
import Card from '../../../../../../../../../components/Card';
import Button from '../../../../../../../../../components/Clickable/Button';
import IconButton from '../../../../../../../../../components/Clickable/IconButton';
import ConfirmModal from '../../../../../../../../../components/ConfirmModal';
import Modal from '../../../../../../../../../components/Modal';
import { setUserReviews } from '../../../../../../../../../store/slices/User';
import Rating from '../Rating';
import { EditReviewProps, Form } from './types';
import { defaultValues, schema } from './validation';

const EditReview = ({ review }: EditReviewProps): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.user.data.reviews.user);
  const color = useSelector((state) => state.user.ui.theme.color);

  const { id } = review;

  const form = useForm<Form>({
    defaultValues,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const { isDirty } = useFormState({ control: form.control });

  const handleSubmit = (values: Form): void => {
    dispatch(
      setUserReviews(
        userReviews.map((review) =>
          review.id === id
            ? {
                ...review,
                author_details: { ...review.author_details, rating: values.rating }, // TODO use user details
                content: values.review,
                updated_at: moment(new Date()).toISOString()
              }
            : { ...review }
        )
      )
    );

    onClose();
  };

  const handleCloseConfirm = (): void => {
    onCloseConfirm();
    handleClose();
  };

  const handleClose = (): void => {
    form.reset({ ...defaultValues });
    onClose();
  };

  const handleCheckClose = (): void => {
    if (!isDirty) {
      handleClose();
    } else {
      onOpenConfirm();
    }
  };

  useEffect(() => {
    if (isOpen && review) {
      form.reset({
        rating: review.author_details.rating,
        review: review.content
      });
    }
  }, [isOpen]);

  return (
    <>
      <IconButton aria-label='Edit review' icon={EditOutlinedIcon} onClick={() => onOpen()} variant='icon' size='sm' />

      <Modal
        title='Edit review'
        actions={
          <Button
            color={handleReturnColor(color)}
            isDisabled={!isDirty}
            onClick={form.handleSubmit((values) => handleSubmit(values))}
            size='sm'>
            Save Review
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
                      <Text color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='sm' fontWeight='medium'>
                        Rating
                      </Text>
                    ),
                    actions: (
                      <Text color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
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

export default EditReview;
