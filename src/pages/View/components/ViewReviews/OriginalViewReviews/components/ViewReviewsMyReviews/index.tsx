import { ReactElement } from 'react';

import { useTheme, Button, Icon, utils } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { compact, range } from 'lodash';
import { sort } from 'fast-sort';

import DummyReview from '../../../components/ViewReviewsDummyReview';
import MyReview from '../ViewReviewsMyReview';
import Reviews from '../ViewReviewsReviews';
import { VerticalGrid } from '../../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { ViewReviewsMediaType } from '../../types';
import CreateMyReview from '../ViewReviewsCreateEditMyReview';
import ViewReviewsMyReviewsQueryEmpty from '../ViewReviewsMyReviewsQueryEmpty';

import { ViewReviewsMyReviewsProps } from './types';

const { getColor } = utils;

const ViewReviewsMyReviews = <MT extends ViewReviewsMediaType>(props: ViewReviewsMyReviewsProps<MT>): ReactElement => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const { mediaType, mediaItem, name: mediaItemName } = props;
	const { id } = mediaItem;

	const reviews =
		useSelector((state) => {
			switch (mediaType) {
				case 'movie':
					return state.users.data.activeUser.data.reviews.user.movie.find(
						({ mediaItem }) => mediaItem?.id === id
					)?.reviews;
				case 'tv':
					return state.users.data.activeUser.data.reviews.user.tv.find(
						({ mediaItem }) => mediaItem?.id === id
					)?.reviews;
			}
		}) || [];

	return (
		<Reviews
			title='My Reviews'
			total={reviews.length}
			renderFooter={
				reviews.length > 0
					? () => (
							<CreateMyReview<MT>
								mediaType={mediaType}
								mediaItem={mediaItem}
								renderButton={({ icon, category, ...rest }) => (
									<Button
										{...rest}
										color={color}
										colorMode={colorMode}
										isFullWidth
										renderLeft={({ color, colorMode, height }) => (
											<Icon
												width={`${height}px`}
												height={`${height}px`}
												fontSize={`${height}px`}
												colorMode={colorMode}
												icon={icon}
												category={category}
												skeletonColor={color}
											/>
										)}
										size={isSm ? 'xs' : 'sm'}
										variant='text'
									>
										Create a new Review
									</Button>
								)}
							/>
					  )
					: undefined
			}
		>
			{reviews.length === 0 ? (
				<ViewReviewsMyReviewsQueryEmpty<MT>
					mediaType={mediaType}
					mediaItem={mediaItem}
					name={mediaItemName}
					borderWidth='2px'
					borderStyle='dashed'
					borderColor={getColor({ theme, colorMode, type: 'divider' })}
					borderRadius='lg'
				/>
			) : reviews.length > 0 ? (
				<VerticalGrid displayMode='list'>
					{() =>
						compact(
							sort([...reviews])
								.desc(({ updatedAt, createdAt }) => updatedAt || createdAt)
								.map((review, index) =>
									review.content ? (
										<MyReview<MT>
											key={index}
											mediaType={mediaType}
											mediaItem={mediaItem}
											review={review}
										/>
									) : null
								)
						)
					}
				</VerticalGrid>
			) : (
				<VerticalGrid displayMode='list'>
					{() => range(2).map((_dummy, index) => <DummyReview key={index} />)}
				</VerticalGrid>
			)}
		</Reviews>
	);
};

export default ViewReviewsMyReviews;
