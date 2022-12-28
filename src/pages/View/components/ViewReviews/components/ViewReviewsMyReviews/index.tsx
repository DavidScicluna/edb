import { ReactElement } from 'react';

import { useTheme, Button, Icon, utils } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { compact, range } from 'lodash';
import { sort } from 'fast-sort';

import DummyReview from '../ViewReviewsDummyReview';
import MyReview from '../ViewReviewsMyReview';
import Reviews from '../ViewReviewsReviews';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	VerticalGrid
} from '../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../common/utils';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { ViewReviewsMediaType } from '../../types';
import CreateMyReview from '../ViewReviewsCreateEditMyReview';

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
				<QueryEmpty
					color={color}
					colorMode={colorMode}
					borderWidth='2px'
					borderStyle='dashed'
					borderColor={getColor({ theme, colorMode, type: 'divider' })}
					borderRadius='lg'
				>
					<QueryEmptyStack>
						<QueryEmptyBody>
							<QueryEmptyTitle>
								{mediaItemName
									? `You currently have not written any reviews for "${mediaItemName}"`
									: `You currently have not written any reviews for the ${formatMediaTypeLabel({
											type: 'single',
											mediaType
									  })}`}
							</QueryEmptyTitle>
							<QueryEmptySubtitle>
								{mediaItemName
									? `Leave your taughts about "${mediaItemName}" to help others make up their mind.`
									: `Leave your taughts about the ${formatMediaTypeLabel({
											type: 'single',
											mediaType
									  })} to help others make up their mind.`}
							</QueryEmptySubtitle>
						</QueryEmptyBody>

						<QueryEmptyActions
							renderActions={(renderActionsProps) => (
								<CreateMyReview<MT>
									mediaType={mediaType}
									mediaItem={mediaItem}
									renderButton={({ icon, category, ...rest }) => (
										<Button
											{...renderActionsProps}
											{...rest}
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
										>
											Create a new Review
										</Button>
									)}
								/>
							)}
						/>
					</QueryEmptyStack>
				</QueryEmpty>
			) : reviews.length > 0 ? (
				<VerticalGrid displayMode='list' spacing={spacing}>
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
				<VerticalGrid displayMode='list' spacing={spacing}>
					{() => range(2).map((_dummy, index) => <DummyReview key={index} />)}
				</VerticalGrid>
			)}
		</Reviews>
	);
};

export default ViewReviewsMyReviews;
