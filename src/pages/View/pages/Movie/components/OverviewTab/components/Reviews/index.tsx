import { ReactElement } from 'react';
import CountUp from 'react-countup';

import { useMediaQuery, HStack, Fade } from '@chakra-ui/react';

import _ from 'lodash';

import { ReviewsProps } from './types';

import { useSelector } from '../../../../../../../../common/hooks';
import { Review as ReviewType } from '../../../../../../../../common/types';
import { handleReturnDate } from '../../../../../../../../common/utils';
import Badge from '../../../../../../../../components/Badge';
import Button from '../../../../../../../../components/Clickable/Button';
import Empty from '../../../../../../../../components/Empty';
import Panel from '../../../../../../../../components/Panel';
import ThumbButton from '../../../../../../components/Reviews/components/OtherReviews/components/ThumbButton';
import Review from '../../../../../../components/Reviews/components/Review';
import CreateReview from '../../../../../../components/Reviews/components/UserReviews/components/CreateReview';
import DeleteReview from '../../../../../../components/Reviews/components/UserReviews/components/DeleteReview';
import EditReview from '../../../../../../components/Reviews/components/UserReviews/components/EditReview';

const Reviews = ({ movie, reviews = [], isLoading = true, onChangeTab }: ReviewsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const allUserReviews = useSelector((state) => state.user.data.reviews.user);
	const movieUserReviews = allUserReviews.filter((review) => review.mediaItem.id === movie?.id);

	const color = useSelector((state) => state.user.ui.theme.color);

	const handleSortReview = <R extends ReviewType>(reviews: R[]): R[] => {
		return reviews.sort(
			(a, b) =>
				Number(handleReturnDate(b.updated_at || b.created_at || '', 'year')) -
				Number(handleReturnDate(a.updated_at || a.created_at || '', 'year'))
		);
	};

	const otherReviews = handleSortReview(reviews);
	const userReviews = handleSortReview(movieUserReviews);

	return (
		<Panel isFullWidth>
			{{
				header: {
					title:
						reviews.length > 0
							? 'Latest Review'
							: movieUserReviews.length > 0
							? 'My Latest Review'
							: 'Reviews',
					actions:
						(reviews?.length || 0) + (movieUserReviews.length || 0) > 0 && !isSm ? (
							<Fade in unmountOnExit>
								<Badge size='sm'>
									<CountUp
										duration={1}
										prefix='Total of '
										end={(reviews?.length || 0) + (movieUserReviews.length || 0)}
										suffix=' reviews'
									/>
								</Badge>
							</Fade>
						) : undefined
				},
				body:
					!isLoading && !_.isNil(otherReviews[0]) && !_.isEmpty(otherReviews[0]) ? (
						<Review
							renderFooterActions={
								<HStack spacing={0}>
									<ThumbButton
										review={otherReviews[0]}
										state='isLiked'
										label='Like'
										isDisabled={isLoading}
									/>
									<ThumbButton
										review={otherReviews[0]}
										state='isDisliked'
										label='Dislike'
										isDisabled={isLoading}
									/>
								</HStack>
							}
							review={otherReviews[0]}
							isLoading={false}
						/>
					) : !isLoading && !_.isNil(userReviews[0]) && !_.isEmpty(userReviews[0]) ? (
						<Review
							renderFooterActions={
								<HStack>
									<EditReview review={userReviews[0]} />
									<DeleteReview id={userReviews[0].id} />
								</HStack>
							}
							review={userReviews[0]}
							isLoading={false}
						/>
					) : isLoading ? (
						<Review review={{}} isLoading={isLoading} />
					) : (
						<Empty
							hasIllustration={false}
							button={
								<CreateReview
									renderAction={({ color, label, onClick }) => (
										<Button color={color} onClick={() => onClick()} size='sm'>
											{label}
										</Button>
									)}
									mediaItem={movie}
									mediaType='movie'
								/>
							}
							label={
								isSm
									? 'Write a review'
									: `You currently have not written any reviews ${
											movie?.title ? `for "${movie.title}"` : ''
									  }`
							}
							description={
								isSm
									? 'You currently have not written any reviews!'
									: `Write a review and leave your taughts about ${
											movie?.title ? `for "${movie.title}"` : ''
									  } to help others make up their mind.`
							}
							variant='transparent'
						/>
					),
				footer:
					(!_.isNil(otherReviews[0]) && !_.isEmpty(otherReviews[0])) ||
					(!_.isNil(userReviews[0]) && !_.isEmpty(userReviews[0])) ? (
						<Button
							color={color}
							isFullWidth
							isDisabled={isLoading}
							onClick={() => onChangeTab()}
							size={isSm ? 'sm' : 'md'}
							variant='text'
						>
							{isSm
								? 'View all reviews'
								: `View all ${movie?.title ? `"${movie.title}"` : 'Movie'} reviews`}
						</Button>
					) : undefined
			}}
		</Panel>
	);
};

export default Reviews;
