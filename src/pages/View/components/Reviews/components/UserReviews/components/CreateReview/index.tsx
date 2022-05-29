import { ReactElement } from 'react';

import {
	useTheme,
	ConfirmModal,
	ConfirmModalBody,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Textarea,
	Button,
	IconButton,
	Icon
} from '@davidscicluna/component-library';

import { useColorMode, useDisclosure, VStack, HStack, Text, Collapse } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { v4 as uuid } from 'uuid';
import { isBoolean } from 'lodash';

import { useSelector } from '../../../../../../../../common/hooks';
import Rating from '../../../../../../../../components/Forms/Rating';
import Modal from '../../../../../../../../components/Modal';
import { defaultUser, getUser, setUserReviews } from '../../../../../../../../store/slices/Users';

import { schema } from './validation';
import { CreateReviewProps, Form } from './types';

const defaultValues: Form = {
	review: '',
	rating: 0
};

const CreateReview = ({ renderAction, mediaItem, mediaType }: CreateReviewProps): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const { isOpen: isCreateReview, onOpen: onOpenCreateReview, onClose: onCloseCreateReview } = useDisclosure();
	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const userReviews = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.data.reviews?.user ||
			defaultUser.data.reviews?.user ||
			[]
	);

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const form = useForm<Form>({
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isDirty } = useFormState({ control: form.control });

	const isDisabled: boolean = isNil(user) || isEmpty(user);

	const handleSubmit = (values: Form): void => {
		const id = uuid();

		dispatch(
			setUserReviews({
				id: user || '',
				data: [
					...userReviews,
					{
						id,
						author: 'Name', // TODO use user name
						author_details: {
							name: 'Name',
							username: 'Username',
							avatar_path: '',
							rating: values.rating || undefined
						}, // TODO use user details
						content: values.review,
						created_at: dayjs(new Date()).toISOString(),
						updated_at: dayjs(new Date()).toISOString(),
						mediaItem: { ...(mediaItem || {}), mediaType: mediaType === 'movie' ? 'movie' : 'tv' }
					}
				]
			})
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
				isDisabled,
				onClick: onOpenCreateReview
			})}

			<Modal
				title='Create a new review'
				renderActions={({ color, colorMode, size }) => (
					<Button
						color={color}
						colorMode={colorMode}
						isDisabled={isDisabled || !isDirty}
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
							<Card color={error ? 'red' : 'gray'} isFullWidth>
								<CardHeader
									renderTitle={(props) => (
										<HStack spacing={0.75}>
											<Text
												{...props}
												fontSize='sm'
												fontWeight='medium'
												textTransform='uppercase'
												isTruncated
												overflow='hidden'
												whiteSpace='nowrap'
											>
												Rating
											</Text>
											<Text
												{...props}
												color={`red.${colorMode === 'light' ? 500 : 400}`}
												fontSize='sm'
												fontWeight='medium'
												textTransform='uppercase'
												isTruncated
												overflow='hidden'
												whiteSpace='nowrap'
											>
												*
											</Text>
										</HStack>
									)}
									actions={
										<Text
											color={`gray.${colorMode === 'light' ? 400 : 500}`}
											fontSize='sm'
											noOfLines={1}
										>
											{`${value} stars`}
										</Text>
									}
								/>
								<CardBody>
									<Rating
										name={name}
										onChange={(value) => form.setValue('rating', value, { shouldDirty: true })}
										value={value || 0}
									/>
								</CardBody>
								{error && (
									<CardFooter>
										<Collapse in={Boolean(error)} unmountOnExit>
											<Text color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='xs'>
												{error.message}
											</Text>
										</Collapse>
									</CardFooter>
								)}
							</Card>
						)}
					/>
					<Controller
						control={form.control}
						name='review'
						render={({ field: { onChange, value, name }, fieldState: { error } }) => (
							<Textarea
								// color={color}
								color='blue'
								label='Review'
								name={name}
								helper={error ? error.message : undefined}
								onChange={onChange}
								isError={isBoolean(error)}
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
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
				isOpen={isConfirmOpen}
				onClose={onCloseConfirm}
			>
				<ConfirmModalBody>
					<ConfirmModalTitle>Unsaved data!</ConfirmModalTitle>
					<ConfirmModalSubtitle>
						Are you sure you want to close the modal, the data inserted will be lost unless you save it!
					</ConfirmModalSubtitle>
				</ConfirmModalBody>
				<ConfirmModalFooter
					renderCancel={(props) => (
						<Button {...props} onClick={onCloseConfirm}>
							Cancel
						</Button>
					)}
					renderAction={(props) => (
						<Button
							{...props}
							// color={color}
							color='blue'
							onClick={handleCloseConfirm}
						>
							Close
						</Button>
					)}
				/>
			</ConfirmModal>
		</>
	);
};

export default CreateReview;
