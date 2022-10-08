import { FC, useState } from 'react';

import { useTheme, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { range, uniqBy } from 'lodash';

import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { useTrendingInfiniteQuery } from '../../../../../common/queries';
import { Response } from '../../../../../common/types';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	DummyHorizontalPoster,
	DummyVerticalPoster,
	VerticalGrid,
	LoadMore
} from '../../../../../components';
import { useUserTheme } from '../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../common/utils';
import TVShowVerticalPoster from '../../../../TV/components/Posters/TVShowVerticalPoster';
import TVShowHorizontalPoster from '../../../../TV/components/Posters/TVShowHorizontalPoster';
import { PartialTV } from '../../../../../common/types/tv';
import { UseTrendingInfiniteQueryResponse } from '../../../../../common/queries/useTrendingInfiniteQuery';

const TrendingTV: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const [shows, setShows] = useState<UseTrendingInfiniteQueryResponse<'tv'>>();

	const { isFetchingNextPage, isFetching, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
		useTrendingInfiniteQuery<'tv'>({
			props: { mediaType: 'tv', time: 'week' },
			options: {
				onSuccess: (data) => {
					let tvShows: PartialTV[] = [];

					data.pages.forEach((page) => {
						tvShows = [...tvShows, ...(page.results || [])];
					});

					setShows({
						page: data.pages[data.pages.length - 1].page,
						results: uniqBy([...tvShows], 'id'),
						total_pages: data.pages[data.pages.length - 1].total_pages,
						total_results: data.pages[data.pages.length - 1].total_results
					});
				}
			}
		});

	return !(isFetchingNextPage || isFetching || isLoading) && isError ? (
		<QueryEmpty color={color} colorMode={colorMode}>
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
							label: `Trending ${formatMediaTypeLabel({
								type: 'multiple',
								mediaType: 'tv'
							})}`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
				<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetchingNextPage || isFetching || isLoading) &&
	  isSuccess &&
	  shows &&
	  shows.results &&
	  shows.results.length === 0 ? (
		<QueryEmpty color={color} colorMode={colorMode}>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{getEmptySubtitle({
							type: 'empty',
							label: `Trending ${formatMediaTypeLabel({
								type: 'multiple',
								mediaType: 'tv'
							})}`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
				<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetchingNextPage || isFetching || isLoading) &&
	  isSuccess &&
	  shows &&
	  shows.results &&
	  shows.results.length > 0 ? (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid spacing={spacing}>
				{({ displayMode }) =>
					(shows.results || []).map((show: PartialTV) =>
						displayMode === 'list' ? (
							<TVShowHorizontalPoster key={show.id} show={show} />
						) : (
							<TVShowVerticalPoster key={show.id} show={show} />
						)
					)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={shows?.results?.length || 0}
					total={shows?.total_results || 0}
					label={`Trending ${formatMediaTypeLabel({
						type: 'multiple',
						mediaType: 'tv'
					})}`}
					isLoading={false}
					isButtonVisible={hasNextPage && !isError}
					onClick={fetchNextPage}
				/>
			</Center>
		</VStack>
	) : (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid spacing={spacing}>
				{({ displayMode }) =>
					range(20).map((_dummy, index) =>
						displayMode === 'list' ? (
							<DummyHorizontalPoster key={index} mediaType='tv' hasSubtitle hasDescription />
						) : (
							<DummyVerticalPoster key={index} mediaType='tv' hasSubtitle />
						)
					)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={shows?.results?.length || 0}
					total={shows?.total_results || 0}
					label={`Trending ${formatMediaTypeLabel({
						type: 'multiple',
						mediaType: 'tv'
					})}`}
					isDisabled
					isLoading
					isButtonVisible={hasNextPage && !isError}
				/>
			</Center>
		</VStack>
	);
};

export default TrendingTV;
