import { ReactElement, useEffect } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useTheme, useColorMode, useDisclosure, useBoolean, VStack, Text, Collapse } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { EditReviewProps, Form } from './types';
import { schema } from './validation';

import { useSelector } from '../../../../../../../../common/hooks';
import Button from '../../../../../../../../components/Clickable/Button';
import IconButton from '../../../../../../../../components/Clickable/IconButton';
import ConfirmModal from '../../../../../../../../components/ConfirmModal';
import Rating from '../../../../../../../../components/Forms/Rating';
import Textarea from '../../../../../../../../components/Forms/Textarea';
import Icon from '../../../../../../../../components/Icon';
import Modal from '../../../../../../../../components/Modal';
import Panel from '../../../../../../../../components/Panel';
import Tooltip from '../../../../../../../../components/Tooltip';
import { defaultUser, getUser, setUserReviews } from '../../../../../../../../store/slices/Users';
import { Theme } from '../../../../../../../../theme/types';

const defaultValues: Form = {
	review: '',
	rating: 0
};

const EditReview = ({ review }: EditReviewProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const { isOpen: isEditReviewOpen, onOpen: onOpenEditReview, onClose: onCloseEditReview } = useDisclosure();
	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const userReviews = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.data.reviews.user || defaultUser.data.reviews.user
	);

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { id } = review;

	const [isHovering, setIsHovering] = useBoolean();

	const form = useForm<Form>({
		defaultValues,
		reValidateMode: 'onSubmit',
		resolver: yupResolver(schema)
	});

	const { isDirty } = useFormState({ control: form.control });

	const isDisabled: boolean = isNil(user) || isEmpty(user);

	const handleSubmit = (values: Form): void => {
		dispatch(
			setUserReviews({
				id: user || '',
				data: userReviews.map((review) =>
					review.id === id
						? {
								...review,
								author_details: { ...review.author_details, rating: values.rating || undefined }, // TODO use user details
								content: values.review,
								updated_at: dayjs(new Date()).toISOString()
						  }
						: { ...review }
				)
			})
		);

		onCloseEditReview();
	};

	const handleCloseConfirm = (): void => {
		onCloseConfirm();
		handleClose();
	};

	const handleClose = (): void => {
		form.reset({ ...defaultValues });
		onCloseEditReview();
	};

	const handleCheckClose = (): void => {
		if (!isDirty) {
			handleClose();
		} else {
			onOpenConfirm();
		}
	};

	useEffect(() => {
		if (isEditReviewOpen && review) {
			form.reset({
				rating: review?.author_details?.rating,
				review: review.content
			});
		}
	}, [isEditReviewOpen]);

	return (
		<>
			<Tooltip
				aria-label='Edit review'
				label='Edit review'
				isOpen={!isDisabled && isHovering}
				isDisabled={isDisabled}
				placement='top'
				gutter={6}
			>
				<IconButton
					aria-label='Edit review'
					color={isEditReviewOpen ? color : 'gray'}
					isDisabled={isDisabled}
					onClick={() => onOpenEditReview()}
					onMouseEnter={() => setIsHovering.on()}
					onMouseLeave={() => setIsHovering.off()}
					variant='icon'
				>
					<Icon icon='edit' type='outlined' />
				</IconButton>
			</Tooltip>

			<Modal
				title='Edit review'
				renderActions={({ color, colorMode, size }) => (
					<Button
						color={color}
						colorMode={colorMode}
						isDisabled={isDisabled || !isDirty}
						onClick={form.handleSubmit((values) => handleSubmit(values))}
						size={size}
					>
						Save Review
					</Button>
				)}
				isOpen={isEditReviewOpen}
				onClose={handleCheckClose}
				isCentered
				size='lg'
			>
				<VStack spacing={3} p={2}>
					<Controller
						control={form.control}
						name='rating'
						render={({ field: { value, name }, fieldState: { error } }) => (
							<Panel color={error ? 'red' : 'gray'} isFullWidth>
								{{
									header: {
										title: (
											<Text
												color={`gray.${colorMode === 'light' ? 900 : 50}`}
												fontSize='sm'
												fontWeight='medium'
											>
												Rating
											</Text>
										),
										actions: (
											<Text color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='sm'>
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
											<Text color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='xs'>
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
				title='Unsaved data!'
				renderActions={({ colorMode, size }) => (
					<Button color={color} colorMode={colorMode} onClick={() => handleCloseConfirm()} size={size}>
						Close
					</Button>
				)}
				description='Are you sure you want to close the modal, the data inserted will be lost unless you save it!'
				isOpen={isConfirmOpen}
				onClose={onCloseConfirm}
			/>
		</>
	);
};

export default EditReview;
