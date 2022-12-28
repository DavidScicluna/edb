import { ReactElement } from 'react';

import {
	Undefinable,
	useTheme,
	Form,
	Modal,
	ModalStack,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Rating,
	Textarea,
	Button,
	IconButton,
	IconButtonIcon,
	Fade
} from '@davidscicluna/component-library';

import { useToast, useDisclosure, useConst, VStack, HStack, Text } from '@chakra-ui/react';

import { useForm, useFormState, useWatch, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { isBoolean, isEqual, range } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';
import { v4 as uuid } from 'uuid';

import { useSelector, useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { defaultPromptConfirmModal, setPromptConfirmModal } from '../../../../../../store/slices/Modals';
import { ViewReviewsMediaType } from '../../types';
import { setMovieUserReviews, setTVShowUserReviews } from '../../../../../../store/slices/Users';
import { UserReviewsMediaItem, UserReviewsMediaItems } from '../../../../../../store/slices/Users/types';
import { convertDurationToMS } from '../../../../../../components/Alert/common/utils';
import { Alert } from '../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../common/utils';
import { FullMovie } from '../../../../../../common/types/movie';
import { FullTV } from '../../../../../../common/types/tv';
import { createNewUserReviewsMediaItem, updateUserReviews, updateUserReviewsMediaItem } from '../../common/utils';

import { ViewReviewsCreateEditMyReviewProps, ViewReviewsCreateEditMyReviewForm } from './types';

const ratings = range(10);

const defaultValues: ViewReviewsCreateEditMyReviewForm = {
	rating: null,
	content: ''
};

const ViewReviewsCreateEditMyReview = <MT extends ViewReviewsMediaType>(
	props: ViewReviewsCreateEditMyReviewProps<MT>
): ReactElement => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const toast = useToast();
	const {
		isOpen: isCreateEditMyReviewOpen,
		onOpen: onCreateEditMyReviewOpen,
		onClose: onCreateEditMyReviewClose
	} = useDisclosure();

	const { mediaType, mediaItem, renderButton, review } = props;
	const { id: reviewID } = review || {};

	const dispatch = useDispatch();
	const {
		id: userID,
		reviews: { user: allUserReviews }
	} = useSelector((state) => state.users.data.activeUser.data);

	const { control, setValue, reset, handleSubmit } = useForm<ViewReviewsCreateEditMyReviewForm>({ defaultValues });

	const watchValues = useWatch({ control });

	const { isDirty } = useFormState({ control });

	const successToastID = useConst<string>(
		`ds-edb-view-reviews-create-edit-review-${reviewID || uuid()}-success-toast`
	);
	const errorToastID = useConst<string>(`ds-edb-view-reviews-create-edit-review-${reviewID || uuid()}-error-toast`);

	const handleCloseConfirm = (): void => {
		dispatch(setPromptConfirmModal({ ...defaultPromptConfirmModal }));
		onCreateEditMyReviewClose();
	};

	const handleCheckModal = (): void => {
		if (!isDirty) {
			onCreateEditMyReviewClose();
		} else {
			dispatch(
				setPromptConfirmModal({
					isOpen: true,
					title: 'Unsubmitted Changes!',
					subtitle: `Are you sure you want to cancel ${
						!review ? 'creating' : 'editing'
					} the review? Once you close the page you will not be able to retrieve the changed data!`,
					onConfirm: () => handleCloseConfirm()
				})
			);
		}
	};

	const handleReset = (): void => {
		setValue('rating', defaultValues.rating, { shouldDirty: true });
		setValue('content', defaultValues.content, { shouldDirty: true });
	};

	const handleUpdateMovieUserReviews = (movieUserReviews: UserReviewsMediaItems<'movie'>): void => {
		const { title = `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}` } =
			mediaItem as FullMovie;

		dispatch(setMovieUserReviews({ id: userID, data: [...movieUserReviews] }));

		if (!toast.isActive(successToastID)) {
			toast({
				id: successToastID,
				duration: convertDurationToMS(),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={12.5}
						description={`Successfully ${!review ? 'created a' : 'edited the'} review for ${title}!`}
						status='success'
						onClose={() => toast.close(successToastID)}
					/>
				)
			});
		}

		onCreateEditMyReviewClose();
	};

	const handleUpdateTVShowUserReviews = (tvShowUserReviews: UserReviewsMediaItems<'tv'>): void => {
		const { name = `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}` } = mediaItem as FullTV;

		dispatch(setTVShowUserReviews({ id: userID, data: [...tvShowUserReviews] }));

		if (!toast.isActive(successToastID)) {
			toast({
				id: successToastID,
				duration: convertDurationToMS(),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={12.5}
						description={`Successfully ${!review ? 'created a' : 'edited the'} review for ${name}!`}
						status='success'
						onClose={() => toast.close(successToastID)}
					/>
				)
			});
		}

		onCreateEditMyReviewClose();
	};

	const handleSubmitForm = ({ rating, content }: ViewReviewsCreateEditMyReviewForm): void => {
		const movieUserReviewsMediaItem: Undefinable<UserReviewsMediaItem<'movie'>> = allUserReviews.movie.find(
			({ mediaItem: { id } }) => id === mediaItem.id
		);
		const tvShowUserReviewsMediaItem: Undefinable<UserReviewsMediaItem<'tv'>> = allUserReviews.tv.find(
			({ mediaItem: { id } }) => id === mediaItem.id
		);

		if (movieUserReviewsMediaItem || tvShowUserReviewsMediaItem) {
			const { reviews: movieReviews = [] } = movieUserReviewsMediaItem || {};
			const { reviews: tvShowReviews = [] } = tvShowUserReviewsMediaItem || {};

			const updatedUserReviewsMediaItem: UserReviewsMediaItem<MT> = updateUserReviewsMediaItem<MT>({
				mediaType,
				mediaItem,
				reviews: mediaType === 'movie' ? movieReviews : mediaType === 'tv' ? tvShowReviews : [],
				review,
				rating,
				content
			});
			const updatedUserReviewsMediaItems: UserReviewsMediaItems<MT> = updateUserReviews<MT>({
				mediaItems: allUserReviews[mediaType] as UserReviewsMediaItems<MT>,
				mediaItem,
				updatedMediaItem: updatedUserReviewsMediaItem
			});

			if (mediaType === 'movie') {
				handleUpdateMovieUserReviews([...updatedUserReviewsMediaItems] as UserReviewsMediaItems<'movie'>);
			} else if (mediaType === 'tv') {
				handleUpdateTVShowUserReviews([...updatedUserReviewsMediaItems] as UserReviewsMediaItems<'tv'>);
			}
		} else if (mediaItem) {
			const newUserReviewsMediaItem: UserReviewsMediaItem<MT> = createNewUserReviewsMediaItem<MT>({
				mediaType,
				mediaItem,
				rating,
				content
			});

			if (mediaType === 'movie') {
				handleUpdateMovieUserReviews([
					...allUserReviews.movie,
					newUserReviewsMediaItem as UserReviewsMediaItem<'movie'>
				]);
			} else if (mediaType === 'tv') {
				handleUpdateTVShowUserReviews([
					...allUserReviews.tv,
					newUserReviewsMediaItem as UserReviewsMediaItem<'tv'>
				]);
			}
		} else if (!toast.isActive(errorToastID)) {
			toast({
				id: errorToastID,
				duration: convertDurationToMS(),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={12.5}
						description={`Unfortunately, something went wrong when trying to ${
							!review ? 'create' : 'edit'
						} the review.`}
						status='error'
						onClose={() => toast.close(errorToastID)}
					/>
				)
			});
		}
	};

	useUpdateEffect(() => {
		if (review) {
			reset({ rating: review.rating, content: review.content });
		}
	}, [isCreateEditMyReviewOpen]);

	return (
		<>
			{renderButton({
				color,
				colorMode,
				icon: !review ? 'add_circle' : 'edit',
				category: isCreateEditMyReviewOpen ? 'filled' : 'outlined',
				onClick: () => onCreateEditMyReviewOpen()
			})}

			<Modal colorMode={colorMode} isOpen={isCreateEditMyReviewOpen} onClose={handleCheckModal} size='2xl'>
				<ModalStack as={Form} onSubmit={handleSubmit(handleSubmitForm)}>
					<ModalHeader
						renderTitle={(props) => (
							<Text {...props}>{!review ? 'Create a new review' : 'Edit Review'}</Text>
						)}
						renderSubtitle={(props) => (
							<Text {...props}>
								{!review
									? 'Create a new review by giving a rating from 0 to 10 & entering the content outlining the review'
									: 'Edit an existing review by updating the rating & updating the content of the review'}
							</Text>
						)}
						renderCancel={({ icon, category, ...rest }) => (
							<IconButton {...rest}>
								<IconButtonIcon icon={icon} category={category} />
							</IconButton>
						)}
					/>
					<ModalBody>
						<VStack width='100%' spacing={spacing}>
							<Controller
								control={control}
								name='rating'
								render={({ field: { onBlur, value, name }, fieldState: { error } }) => (
									<Rating
										color='yellow'
										colorMode={colorMode}
										label='Rating'
										name={name}
										helper={error ? error.message : undefined}
										isError={isBoolean(error)}
										isFullWidth
										onBlur={onBlur}
										onChange={({ rating }) => setValue(name, rating, { shouldDirty: true })}
										value={ratings.filter((num) => num <= (value || -1))}
									/>
								)}
							/>
							<Controller
								control={control}
								name='content'
								render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
									<Textarea
										color={color}
										colorMode={colorMode}
										label='Content'
										name={name}
										helper={error ? error.message : undefined}
										placeholder={`Try "This ${formatMediaTypeLabel({
											type: 'single',
											mediaType
										})} was ..."`}
										isError={isBoolean(error)}
										isFullWidth
										isRequired
										onBlur={onBlur}
										onChange={onChange}
										value={value}
										sx={{ textarea: { height: theme.space[12.5] } }}
									/>
								)}
							/>
						</VStack>
					</ModalBody>
					<ModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<HStack>
								<Fade in={isDirty || !isEqual(defaultValues, watchValues)}>
									<Button {...props} color={color} onClick={handleReset} variant='text'>
										Clear
									</Button>
								</Fade>
								<Button {...props} color={color} isDisabled={!isDirty} type='submit'>
									{!review ? 'Submit Review' : 'Edit Review'}
								</Button>
							</HStack>
						)}
					/>
				</ModalStack>
			</Modal>
		</>
	);
};

export default ViewReviewsCreateEditMyReview;
