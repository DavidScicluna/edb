import { ReactElement } from 'react';

import { useTheme, useColorMode, useDisclosure, VStack, Text, Collapse } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { useSelector } from '../../../../../../../../common/hooks';
import Button from '../../../../../../../../components/Clickable/Button';
import ConfirmModal from '../../../../../../../../components/ConfirmModal';
import Rating from '../../../../../../../../components/Forms/Rating';
import Textarea from '../../../../../../../../components/Forms/Textarea';
import Modal from '../../../../../../../../components/Modal';
import Panel from '../../../../../../../../components/Panel';
import { setUserReviews } from '../../../../../../../../store/slices/User';
import { Theme } from '../../../../../../../../theme/types';
import { CreateReviewProps, Form } from './types';
import { schema } from './validation';

const defaultValues: Form = {
  review: '',
  rating: 0
};

const CreateReview = ({ renderAction, mediaItem, mediaType }: CreateReviewProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { isOpen: isCreateReview, onOpen: onOpenCreateReview, onClose: onCloseCreateReview } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.user.data.reviews.user);
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
      setUserReviews([
        ...userReviews,
        {
          id,
          author: 'Name', // TODO use user name
          author_details: { name: 'Name', username: 'Username', avatar_path: '', rating: values.rating || undefined }, // TODO use user details
          content: values.review,
          created_at: moment(new Date()).toISOString(),
          updated_at: moment(new Date()).toISOString(),
          mediaItem: { ...(mediaItem || {}), mediaType: mediaType === 'movie' ? 'movie' : 'tv' }
        }
      ])
    );

    handleClose();
  };

  const handleCloseConfirm = (): void => {
    onCloseConfirm();
    handleClose();
  };

  const handleClose = (): void => {
    form.reset({ ...defaultValues });
    onCloseCreateReview();
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
      {renderAction({
        color,
        label: 'Create a new review',
        onClick: onOpenCreateReview
      })}

      <Modal
        title='Create a new review'
        renderActions={({ color, colorMode, size }) => (
          <Button
            color={color}
            colorMode={colorMode}
            isDisabled={!isDirty}
            onClick={form.handleSubmit((values) => handleSubmit(values))}
            size={size}
          >
            Submit Review
          </Button>
        )}
        isOpen={isCreateReview}
        onClose={handleCheckClose}
        isCentered
        size='lg'
      >
        <VStack spacing={3} p={2}>
          <Controller
            control={form.control}
            name='rating'
            render={({ field: { value, name }, fieldState: { error } }) => (
              <Panel color={error ? 'red' : 'gray'} isFullWidth size='sm'>
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
              </Panel>
            )}
          />
          <Controller
            control={form.control}
            name='review'
            render={({ field: { onChange, value, name }, fieldState: { error } }) => (
              <Textarea
                color={color}
                label='Review'
                error={error}
                name={name}
                onChange={onChange}
                isFullWidth
                isRequired
                value={value}
                sx={{ textarea: { height: theme.space[12.5] } }}
              />
            )}
          />
        </VStack>
      </Modal>

      <ConfirmModal
        renderActions={({ color, colorMode, size }) => (
          <Button color={color} colorMode={colorMode} onClick={() => handleCloseConfirm()} size={size}>
            Close
          </Button>
        )}
        title='Unsaved data!'
        description='Are you sure you want to close the modal, the data inserted will be lost unless you save it!'
        isOpen={isConfirmOpen}
        onClose={onCloseConfirm}
      />
    </>
  );
};

export default CreateReview;
