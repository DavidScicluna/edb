import { FC, useState, useCallback, useEffect } from 'react';

import { useTheme, Card, CardHeader, CardBody, CardFooter, Button } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import numbro from 'numbro';
import { sort } from 'fast-sort';
import { debounce } from 'lodash';

import { useMovieContext } from '../../../../common/hooks';
import { useSelector, useUserTheme } from '../../../../../../../../../common/hooks';
import { TotalBadge } from '../../../../../../../../../components';
import ViewReviewsMyReviewsQueryEmpty from '../../../../../../../components/ViewReviews/OriginalViewReviews/components/ViewReviewsMyReviewsQueryEmpty';
import ViewReviewsOtherReview from '../../../../../../../components/ViewReviews/OriginalViewReviews/components/ViewReviewsOtherReview';
import MyReview from '../../../../../../../components/ViewReviews/OriginalViewReviews/components/ViewReviewsMyReview';
import { getMovieTabIndex } from '../../../../../common/utils';

const OverviewTabReview: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { movieQuery, reviewsQuery, onSetActiveTab } = useMovieContext();

	const { data: movie } = movieQuery || {};
	const { id, title } = movie || {};

	const { pages: otherReviewsPages = [] } = reviewsQuery?.data || {};
	const { results: otherReviews = [] } = otherReviewsPages && otherReviewsPages[0] ? otherReviewsPages[0] : {};

	const userReviews = useSelector(
		(state) =>
			state.users.data.activeUser.data.reviews.user.movie.find(({ mediaItem }) => mediaItem?.id === id)
				?.reviews || []
	);

	const [totalReviews, setTotalReviews] = useState<number>(0);

	const handleGetTotalReviews = useCallback(
		debounce((): void => {
			setTotalReviews(
				userReviews.length +
					otherReviewsPages.reduce((total: number, { results = [] }) => total + results.length, 0)
			);
		}, 500),
		[userReviews, otherReviewsPages]
	);

	useEffect(() => handleGetTotalReviews(), [userReviews, otherReviewsPages]);

	return movie ? (
		<Card colorMode={colorMode} isFullWidth p={2}>
			<CardHeader
				renderTitle={(props) => <Text {...props}>Latest Review</Text>}
				actions={
					totalReviews > 0 ? (
						<TotalBadge
							colorMode={colorMode}
							total={totalReviews}
							prefix='Total of'
							suffix={`Review${totalReviews === 1 ? '' : 's'}`}
							size='xs'
							variant='outlined'
						/>
					) : undefined
				}
			/>
			<CardBody>
				{userReviews && userReviews.length > 0 ? (
					sort(userReviews)
						.desc(({ updatedAt, createdAt }) => updatedAt || createdAt)
						.filter((_review, index) => index === 0)
						.map((review, index) => (
							<MyReview<'movie'> key={index} mediaType='movie' mediaItem={movie} review={review} />
						))
				) : otherReviews && otherReviews.length > 0 ? (
					sort(otherReviews)
						.desc(({ updated_at, created_at }) => updated_at || created_at)
						.filter((_review, index) => index === 0)
						.map((review) => <ViewReviewsOtherReview key={review.id} review={review} />)
				) : (
					<ViewReviewsMyReviewsQueryEmpty<'movie'> mediaType='movie' mediaItem={movie} name={title} />
				)}
			</CardBody>

			<CardFooter>
				<Button
					color={color}
					colorMode={colorMode}
					isFullWidth
					onClick={() => onSetActiveTab({ index: getMovieTabIndex('reviews') })}
					size={isSm ? 'xs' : 'sm'}
					variant='text'
				>
					{totalReviews > 0
						? `View all ${numbro(totalReviews).format({ average: true })} Reviews`
						: 'Go to Reviews Tab'}
				</Button>
			</CardFooter>
		</Card>
	) : null;
};

export default OverviewTabReview;
