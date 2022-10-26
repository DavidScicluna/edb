import { FC, useState } from 'react';

import { useTheme, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { range, uniqBy } from 'lodash';

import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { useSearchInfiniteQuery } from '../../../../../common/queries';
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
	LoadMore,
	TVShowHorizontalPoster,
	TVShowVerticalPoster
} from '../../../../../components';
import { useUserTheme } from '../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../common/utils';
import { UseSearchInfiniteQueryResponse } from '../../../../../common/queries/useSearchInfiniteQuery';
import { PartialTV } from '../../../../../common/types/tv';

import { SearchTVShowsProps } from './types';

const SearchTVShows: FC<SearchTVShowsProps> = ({ query = '' }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const [shows, setShows] = useState<UseSearchInfiniteQueryResponse<'tv'>>();

	const { isFetchingNextPage, isFetching, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
		useSearchInfiniteQuery<'tv'>({
			props: { mediaType: 'tv', query },
			options: {
				enabled: !!query,
				onSuccess: (data) => {
					let shows: PartialTV[] = [];

					data.pages.forEach((page) => {
						shows = [...shows, ...(page?.results || [])];
					});

					setShows({
						page: data.pages[data.pages.length - 1].page,
						results: uniqBy([...shows], 'id'),
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
							label: `${formatMediaTypeLabel({
								type: (shows?.total_results || 0) === 1 ? 'single' : 'multiple',
								mediaType: 'tv'
							})} with query "${query}"`
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
							label: `${formatMediaTypeLabel({
								type: (shows?.total_results || 0) === 1 ? 'single' : 'multiple',
								mediaType: 'tv'
							})} with query "${query}"`
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
					label={`${formatMediaTypeLabel({
						type: (shows?.total_results || 0) === 1 ? 'single' : 'multiple',
						mediaType: 'tv'
					})} with query "${query}"`}
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
					label={`${formatMediaTypeLabel({
						type: (shows?.total_results || 0) === 1 ? 'single' : 'multiple',
						mediaType: 'tv'
					})} with query "${query}"`}
					isDisabled
					isLoading
					isButtonVisible={hasNextPage && !isError}
				/>
			</Center>
		</VStack>
	);
};

export default SearchTVShows;
