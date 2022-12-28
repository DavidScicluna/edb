import { ReactElement, useState, useEffect } from 'react';

import {
	Undefinable,
	useTheme,
	useDebounce,
	Button,
	Badge,
	BadgeLabel,
	Icon,
	utils
} from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { compact, range, uniqBy } from 'lodash';
import { sort } from 'fast-sort';

import DummyReview from '../ViewReviewsDummyReview';
import Reviews from '../ViewReviewsReviews';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	LoadMore,
	VerticalGrid
} from '../../../../../../components';
import { useUserTheme } from '../../../../../../common/hooks';
import { UseMediaTypeReviewsInfiniteQueryResponse } from '../../../../../../common/queries/useMediaTypeReviewsInfiniteQuery';
import { formatMediaTypeLabel } from '../../../../../../common/utils';
import { getEmptySubtitle } from '../../../../../../components/QueryEmpty/common/utils';
import { Review as ReviewType } from '../../../../../../common/types';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { ViewReviewsMediaType } from '../../types';
import ViewReviewsOtherReview from '../ViewReviewsOtherReview';

import { ViewReviewsOtherReviewsProps } from './types';

const { getColor } = utils;

const ViewReviewsOtherReviews = <MT extends ViewReviewsMediaType>(
	props: ViewReviewsOtherReviewsProps<MT>
): ReactElement => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { isGuest, spacing } = useLayoutContext();

	const { mediaType, query, name } = props;
	const {
		data,
		isFetchingNextPage,
		isFetching,
		isLoading,
		isError,
		isSuccess,
		hasNextPage,
		error,
		refetch,
		fetchNextPage
	} = query;

	const [reviews, setReviews] = useState<UseMediaTypeReviewsInfiniteQueryResponse>();
	const reviewsDebounced = useDebounce<Undefinable<UseMediaTypeReviewsInfiniteQueryResponse>>(reviews, 'slow');

	useEffect(() => {
		if (data && data.pages && data.pages.length > 0) {
			let reviews: ReviewType[] = [];

			data.pages.forEach((page) => {
				reviews = [...reviews, ...(page?.results || [])];
			});

			setReviews({
				page: data.pages[data.pages.length - 1].page || 1,
				results: uniqBy([...reviews], 'id'),
				total_pages: data.pages[data.pages.length - 1].total_pages,
				total_results: data.pages[data.pages.length - 1].total_results
			});
		}
	}, [data]);

	return (
		<Reviews title='Other Reviews' total={reviewsDebounced?.results?.length} hasHeader={!isGuest}>
			{!(isFetchingNextPage || isFetching || isLoading) && isError ? (
				<QueryEmpty
					color={color}
					colorMode={colorMode}
					borderWidth='2px'
					borderStyle='dashed'
					borderColor={getColor({ theme, colorMode, type: 'divider' })}
					borderRadius='lg'
				>
					<QueryEmptyStack>
						<QueryEmptyIcon
							renderIcon={(props) => (
								<Icon
									{...props}
									width={theme.fontSizes['6xl']}
									height={theme.fontSizes['6xl']}
									fontSize={theme.fontSizes['6xl']}
									icon='error_outline'
								/>
							)}
							p={2}
						/>
						<QueryEmptyBody>
							<QueryEmptyTitle />
							<QueryEmptySubtitle>
								{getEmptySubtitle({
									type: 'error',
									label: name
										? `"${name}" Reviews`
										: `${formatMediaTypeLabel({ type: 'single', mediaType })} Reviews`
								})}
							</QueryEmptySubtitle>
						</QueryEmptyBody>

						{error &&
							error.response?.data &&
							error.response.data.status_code &&
							error.response.data.status_message && (
								<Badge color={color} colorMode={colorMode}>
									<BadgeLabel>{`(${error.response.data.status_code}) ${error.response.data.status_message}`}</BadgeLabel>
								</Badge>
							)}

						{refetch && (
							<QueryEmptyActions
								renderActions={(props) => (
									<Button {...props} onClick={refetch}>
										Try Again
									</Button>
								)}
							/>
						)}
					</QueryEmptyStack>
				</QueryEmpty>
			) : !(isFetchingNextPage || isFetching || isLoading) &&
			  isSuccess &&
			  reviewsDebounced &&
			  reviewsDebounced.results &&
			  reviewsDebounced.results.length === 0 ? (
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
							<QueryEmptyTitle />
							<QueryEmptySubtitle>
								{getEmptySubtitle({
									type: 'empty',
									label: name
										? `"${name}" Reviews`
										: `${formatMediaTypeLabel({ type: 'single', mediaType })} Reviews`
								})}
							</QueryEmptySubtitle>
						</QueryEmptyBody>
					</QueryEmptyStack>
				</QueryEmpty>
			) : !(isFetchingNextPage || isFetching || isLoading) &&
			  isSuccess &&
			  reviewsDebounced &&
			  reviewsDebounced.results &&
			  reviewsDebounced.results.length > 0 ? (
				<VStack width='100%' spacing={spacing}>
					<VerticalGrid displayMode='list' spacing={spacing}>
						{() =>
							compact(
								sort(reviewsDebounced.results || [])
									.desc(({ updated_at, created_at }) => updated_at || created_at)
									.map((review) =>
										review.content ? (
											<ViewReviewsOtherReview key={review.id} review={review} />
										) : null
									)
							)
						}
					</VerticalGrid>

					<Center width={isSm ? '100%' : 'auto'}>
						<LoadMore
							amount={reviewsDebounced.results.length || 0}
							total={reviewsDebounced.total_results || 0}
							label='Reviews'
							isLoading={false}
							isButtonVisible={hasNextPage && !isError}
							onClick={fetchNextPage}
						/>
					</Center>
				</VStack>
			) : (
				<VStack width='100%' spacing={spacing}>
					<VerticalGrid displayMode='list' spacing={spacing}>
						{() => range(5).map((_dummy, index) => <DummyReview key={index} />)}
					</VerticalGrid>

					<Center width={isSm ? '100%' : 'auto'}>
						<LoadMore
							amount={reviewsDebounced?.results?.length || 0}
							total={reviewsDebounced?.total_results || 0}
							label='Reviews'
							isDisabled
							isLoading
							isButtonVisible={hasNextPage && !isError}
						/>
					</Center>
				</VStack>
			)}
		</Reviews>
	);
};

export default ViewReviewsOtherReviews;
