import { FC, useState, useEffect } from 'react';

import { Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useTVShowContext } from '../../common/hooks';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { TotalBadge } from '../../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewReviews from '../../../../../components/ViewReviews/OriginalViewReviews';
import DummyViewReviews from '../../../../../components/ViewReviews/DummyViewReviews';

const ReviewsTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { showQuery, reviewsQuery } = useTVShowContext();

	const { data: show } = showQuery || {};
	const { id, name } = show || {};

	const { pages: reviews = [] } = reviewsQuery?.data || {};

	const userReviews = useSelector(
		(state) =>
			state.users.data.activeUser.data.reviews.user.tv.find(({ mediaItem }) => mediaItem?.id === id)?.reviews
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
							name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })
						} has a total of`}
						suffix={`Review${totalReviews === 1 ? '' : 's'}`}
						total={totalReviews || 0}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Reviews</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the reviews that were made by a number of viewers for ${
							name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`
						}`}
					</Text>
				)}
				py={spacing * 2}
			/>

			{reviewsQuery && show ? (
				<ViewReviews<'tv'> mediaType='tv' mediaItem={show} query={reviewsQuery} name={name} />
			) : (
				<DummyViewReviews />
			)}
		</VStack>
	);
};

export default ReviewsTab;
