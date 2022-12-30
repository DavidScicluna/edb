import { FC, useState, useEffect } from 'react';

import { Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useMovieContext } from '../../common/hooks';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { TotalBadge } from '../../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewReviews from '../../../../../components/ViewReviews/OriginalViewReviews';
import DummyViewReviews from '../../../../../components/ViewReviews/DummyViewReviews';

const ReviewsTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { movieQuery, reviewsQuery } = useMovieContext();

	const { data: movie } = movieQuery || {};
	const { id, title } = movie || {};

	const { pages: reviews = [] } = reviewsQuery?.data || {};

	const userReviews = useSelector(
		(state) =>
			state.users.data.activeUser.data.reviews.user.movie.find(({ mediaItem }) => mediaItem?.id === id)?.reviews
				.length || 0
	);

	const [totalReviews, setTotalReviews] = useState<number>(userReviews);

	useEffect(() => {
		setTotalReviews(userReviews + reviews.reduce((total: number, { results = [] }) => total + results.length, 0));
	}, [userReviews, reviews]);

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							title ? title : formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })
						} has a total of`}
						suffix={`Review${totalReviews === 1 ? '' : 's'}`}
						total={totalReviews || 0}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Reviews</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the reviews that were made by a number of viewers for ${
							title ? title : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}`
						}`}
					</Text>
				)}
				py={spacing * 2}
			/>

			{reviewsQuery && movie ? (
				<ViewReviews<'movie'> mediaType='movie' mediaItem={movie} query={reviewsQuery} name={title} />
			) : (
				<DummyViewReviews />
			)}
		</VStack>
	);
};

export default ReviewsTab;
