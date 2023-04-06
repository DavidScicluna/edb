import { ReactElement } from 'react';

import {
	Undefinable,
	useTheme,
	ConfirmModal,
	ConfirmModalStack,
	ConfirmModalIcon,
	ConfirmModalBody,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	Alert,
	Button,
	IconButton,
	IconButtonIcon,
	Icon,
	utils
} from '@davidscicluna/component-library';

import { useToast, useDisclosure, useConst } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';

import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { ViewReviewsMediaType } from '../../types';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { UserReviewsMediaItem, UserReviewsMediaItems } from '../../../../../../../store/slices/Users/types';
import { FullMovie } from '../../../../../../../common/types/movie';
import { FullTVShow } from '../../../../../../../common/types/tv';
import { setMovieUserReviews, setTVShowUserReviews } from '../../../../../../../store/slices/Users';
import { filterUserReviewsMediaItem, updateUserReviews } from '../../common/utils';

import { ViewReviewsDeleteMyReviewProps } from './types';

const { convertDurationToMS } = utils;

const ViewReviewsDeleteMyReview = <MT extends ViewReviewsMediaType>(
	props: ViewReviewsDeleteMyReviewProps<MT>
): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const toast = useToast();
	const {
		isOpen: isDeleteMyReviewOpen,
		onOpen: onDeleteMyReviewOpen,
		onClose: onDeleteMyReviewClose
	} = useDisclosure();

	const { renderButton, mediaType, mediaItem, review } = props;
	const { id: reviewID } = review;

	const dispatch = useDispatch();
	const {
		id: userID,
		reviews: { user: allUserReviews }
	} = useSelector((state) => state.users.data.activeUser.data);

	const successToastID = useConst<string>(`ds-edb-view-reviews-delete-review-${reviewID}-success-toast`);
	const errorToastID = useConst<string>(`ds-edb-view-reviews-delete-review-${reviewID}-error-toast`);

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
						description={`Successfully deleted the review for ${title}!`}
						status='success'
						onClose={() => toast.close(successToastID)}
					/>
				)
			});
		}

		onDeleteMyReviewClose();
	};

	const handleUpdateTVShowUserReviews = (tvShowUserReviews: UserReviewsMediaItems<'tv'>): void => {
		const { name = `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}` } = mediaItem as FullTVShow;

		dispatch(setTVShowUserReviews({ id: userID, data: [...tvShowUserReviews] }));

		if (!toast.isActive(successToastID)) {
			toast({
				id: successToastID,
				duration: convertDurationToMS(),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={12.5}
						description={`Successfully deleted the review for ${name}!`}
						status='success'
						onClose={() => toast.close(successToastID)}
					/>
				)
			});
		}

		onDeleteMyReviewClose();
	};

	const handleDelete = (): void => {
		const movieUserReviewsMediaItem: Undefinable<UserReviewsMediaItem<'movie'>> = allUserReviews.movie.find(
			({ mediaItem: { id } }) => id === mediaItem.id
		);
		const tvShowUserReviewsMediaItem: Undefinable<UserReviewsMediaItem<'tv'>> = allUserReviews.tv.find(
			({ mediaItem: { id } }) => id === mediaItem.id
		);

		if (movieUserReviewsMediaItem || tvShowUserReviewsMediaItem) {
			const { reviews: movieReviews = [] } = movieUserReviewsMediaItem || {};
			const { reviews: tvShowReviews = [] } = tvShowUserReviewsMediaItem || {};

			const updatedUserReviewsMediaItem: UserReviewsMediaItem<MT> = filterUserReviewsMediaItem<MT>({
				mediaType,
				mediaItem,
				reviews: mediaType === 'movie' ? movieReviews : mediaType === 'tv' ? tvShowReviews : [],
				review
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
		} else if (!toast.isActive(errorToastID)) {
			toast({
				id: errorToastID,
				duration: convertDurationToMS(),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={12.5}
						description={`Unfortunately, something went wrong when trying to delete the review.`}
						status='error'
						onClose={() => toast.close(errorToastID)}
					/>
				)
			});
		}
	};

	return (
		<>
			{renderButton({
				color: 'red',
				colorMode,
				icon: 'delete_forever',
				category: isDeleteMyReviewOpen ? 'filled' : 'outlined',
				onClick: () => onDeleteMyReviewOpen()
			})}

			<ConfirmModal
				colorMode={colorMode}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<IconButtonIcon icon={icon} category={category} />
					</IconButton>
				)}
				isOpen={isDeleteMyReviewOpen}
				onClose={onDeleteMyReviewClose}
			>
				<ConfirmModalStack spacing={spacing} p={spacing}>
					<ConfirmModalIcon
						renderIcon={(props) => (
							<Icon
								{...props}
								width={theme.fontSizes['6xl']}
								height={theme.fontSizes['6xl']}
								fontSize={theme.fontSizes['6xl']}
								icon='delete_forever'
								category='outlined'
							/>
						)}
						color='red'
						p={2}
					/>

					<ConfirmModalBody>
						<ConfirmModalTitle>Delete Review?</ConfirmModalTitle>
						<ConfirmModalSubtitle>
							Are you sure you want to delete the selected review?
						</ConfirmModalSubtitle>
						<ConfirmModalSubtitle>This action is irreversible!</ConfirmModalSubtitle>
					</ConfirmModalBody>

					<ConfirmModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} color='red' isDisabled={!reviewID} onClick={handleDelete}>
								Delete
							</Button>
						)}
					/>
				</ConfirmModalStack>
			</ConfirmModal>
		</>
	);
};

export default ViewReviewsDeleteMyReview;
