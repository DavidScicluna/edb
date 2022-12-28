import { FC } from 'react';

import { Tooltip, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useBoolean, HStack } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { uniq } from 'lodash';

import Review from '../ViewReviewsReview';
import { useSelector, useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { setUserOtherReviews } from '../../../../../../store/slices/Users';
import { OtherReview, OtherReviews, OtherReviewState } from '../../../../../../store/slices/Users/types';

import { ViewReviewsOtherReviewProps } from './types';

const ViewReviewsOtherReview: FC<ViewReviewsOtherReviewProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { isGuest } = useLayoutContext();

	const dispatch = useDispatch();
	const {
		id: userID,
		reviews: { other = [] }
	} = useSelector((state) => state.users.data.activeUser.data);

	const { review } = props;
	const { id: reviewID, author_details, author, created_at, updated_at, content = '' } = review;

	const [isHoveringLike, setIsHoveringLike] = useBoolean();
	const [isHoveringDislike, setIsHoveringDislike] = useBoolean();

	const isLiked = other.some((review) => review.review.id === reviewID && review.state === 'isLiked');
	const isDisliked = other.some((review) => review.review.id === reviewID && review.state === 'isDisliked');

	const handleReview = (state: OtherReviewState): void => {
		if (isLiked || isDisliked) {
			const updatedOtherReviews: OtherReviews = [];

			other.forEach((review) => {
				if (review.review.id === reviewID) {
					updatedOtherReviews.push({
						...review,
						state:
							state === 'isLiked' && isDisliked
								? 'isLiked'
								: state === 'isDisliked' && isLiked
								? 'isDisliked'
								: isLiked || isDisliked
								? null
								: state,

						updatedAt: dayjs(new Date()).toISOString()
					});
				} else {
					updatedOtherReviews.push({ ...review });
				}
			});

			dispatch(setUserOtherReviews({ id: userID, data: uniq([...updatedOtherReviews]) }));
		} else {
			const newReview: OtherReview = {
				state,
				review,
				updatedAt: dayjs(new Date()).toISOString(),
				addedAt: dayjs(new Date()).toISOString()
			};

			dispatch(setUserOtherReviews({ id: userID, data: [...other, { ...newReview }] }));
		}
	};

	return (
		<Review
			{...(author_details || {})}
			renderFooterActions={
				!isGuest
					? () => (
							<HStack spacing={0}>
								<Tooltip
									aria-label={isLiked ? 'Unlike review (tooltip)' : 'Like review (tooltip)'}
									colorMode={colorMode}
									isOpen={isHoveringLike}
									placement='top'
									label={isLiked ? 'Unlike' : 'Like'}
								>
									<IconButton
										aria-label={isLiked ? 'Unlike review' : 'Like review'}
										color={isLiked ? color : 'gray'}
										colorMode={colorMode}
										isActive={isLiked}
										onMouseEnter={() => setIsHoveringLike.on()}
										onMouseLeave={() => setIsHoveringLike.off()}
										onClick={() => handleReview('isLiked')}
										size='xs'
										variant='icon'
									>
										<IconButtonIcon icon='thumb_up' category={isLiked ? 'filled' : 'outlined'} />
									</IconButton>
								</Tooltip>
								<Tooltip
									aria-label={isDisliked ? 'Un-dislike review (tooltip)' : 'Dislike review (tooltip)'}
									colorMode={colorMode}
									isOpen={isHoveringDislike}
									placement='top'
									label={isDisliked ? 'Un-dislike' : 'Dislike'}
								>
									<IconButton
										aria-label={isDisliked ? 'Un-dislike review' : 'Dislike review'}
										color={isDisliked ? color : 'gray'}
										colorMode={colorMode}
										isActive={isDisliked}
										onMouseEnter={() => setIsHoveringDislike.on()}
										onMouseLeave={() => setIsHoveringDislike.off()}
										onClick={() => handleReview('isDisliked')}
										size='xs'
										variant='icon'
									>
										<IconButtonIcon
											icon='thumb_down'
											category={isDisliked ? 'filled' : 'outlined'}
										/>
									</IconButton>
								</Tooltip>
							</HStack>
					  )
					: undefined
			}
			name={author_details?.name || author}
			created_at={created_at}
			updated_at={updated_at}
			content={content}
		/>
	);
};

export default ViewReviewsOtherReview;
