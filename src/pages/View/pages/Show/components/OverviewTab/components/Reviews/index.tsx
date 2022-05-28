import { ReactElement } from 'react';

import { Card, CardHeader, CardBody, CardFooter, Button, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { useMediaQuery, HStack, Text, Fade } from '@chakra-ui/react';
import CountUp from 'react-countup';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../../../../common/hooks';
import { Review as ReviewType } from '../../../../../../../../common/types';
import { handleReturnDate } from '../../../../../../../../common/utils';
import Empty from '../../../../../../../../components/Empty';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';
import ThumbButton from '../../../../../../components/Reviews/components/OtherReviews/components/ThumbButton';
import Review from '../../../../../../components/Reviews/components/Review';
import CreateReview from '../../../../../../components/Reviews/components/UserReviews/components/CreateReview';
import DeleteReview from '../../../../../../components/Reviews/components/UserReviews/components/DeleteReview';
import EditReview from '../../../../../../components/Reviews/components/UserReviews/components/EditReview';

import { ReviewsProps } from './types';

const Reviews = ({ show, reviews = [], isLoading = true, onChangeTab }: ReviewsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const allUserReviews = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.data.reviews?.user ||
			defaultUser.data.reviews?.user ||
			[]
	);
	const tvShowUserReviews = allUserReviews.filter((review) => review.mediaItem.id === show?.id);

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const handleSortReview = <R extends ReviewType>(reviews: R[] = []): R[] => {
		return reviews.sort(
			(a, b) =>
				Number(handleReturnDate(b.updated_at || b.created_at || '', 'year')) -
				Number(handleReturnDate(a.updated_at || a.created_at || '', 'year'))
		);
	};

	const otherReviews = handleSortReview(reviews);
	const userReviews = handleSortReview(tvShowUserReviews);

	return (
		<Card isFullWidth>
			<CardHeader
				renderTitle={(props) => (
					<Text {...props}>
						{reviews.length > 0
							? 'Latest Review'
							: tvShowUserReviews.length > 0
							? 'My Latest Review'
							: 'Reviews'}
					</Text>
				)}
				actions={
					(reviews?.length || 0) + (tvShowUserReviews.length || 0) > 0 &&
					!isSm && (
						<Fade in unmountOnExit>
							<Badge size='sm'>
								<BadgeLabel>
									<CountUp
										duration={1}
										prefix='Total of '
										end={(reviews?.length || 0) + (tvShowUserReviews.length || 0)}
										suffix=' reviews'
									/>
								</BadgeLabel>
							</Badge>
						</Fade>
					)
				}
			/>
			<CardBody>
				!isLoading && !(isNil(otherReviews[0]) || isEmpty(otherReviews[0])) ? (
				<Review
					renderFooterActions={
						<HStack spacing={0}>
							<ThumbButton review={otherReviews[0]} state='isLiked' label='Like' isDisabled={isLoading} />
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
				) : !isLoading && !(isNil(userReviews[0]) || isEmpty(userReviews[0])) ? (
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
							renderAction={({ color, label, isDisabled, onClick }) => (
								<Button color={color} isDisabled={isDisabled} onClick={() => onClick()} size='sm'>
									{label}
								</Button>
							)}
							mediaItem={show}
							mediaType='tv'
						/>
					}
					label={
						isSm
							? 'Write a review'
							: `You currently have not written any reviews ${show?.name ? `for "${show.name}"` : ''}`
					}
					description={
						isSm
							? 'You currently have not written any reviews!'
							: `Write a review and leave your taughts about ${
									show?.name ? `for "${show.name}"` : ''
							  } to help others make up their mind.`
					}
					variant='transparent'
				/>
				)
			</CardBody>

			{!(isNil(otherReviews[0]) || isEmpty(otherReviews[0])) ||
				(!(isNil(userReviews[0]) || isEmpty(userReviews[0])) && (
					<CardFooter>
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
								: `View all ${show?.name ? `"${show.name}"` : 'TV Show'} reviews`}
						</Button>
					</CardFooter>
				))}
		</Card>
	);
};

export default Reviews;
