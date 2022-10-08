import { FC, useState } from 'react';

import { useTheme, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { range, uniqBy } from 'lodash';

import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { useTrendingInfiniteQuery } from '../../../../../common/queries';
import { Response } from '../../../../../common/types';
import { PartialMovie } from '../../../../../common/types/movie';
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
import MovieVerticalPoster from '../../../../Movies/components/Posters/MovieVerticalPoster';
import MovieHorizontalPoster from '../../../../Movies/components/Posters/MovieHorizontalPoster';
import { UseTrendingInfiniteQueryResponse } from '../../../../../common/queries/useTrendingInfiniteQuery';

const TrendingMovies: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const [movies, setMovies] = useState<UseTrendingInfiniteQueryResponse<'movie'>>();

	const { isFetchingNextPage, isFetching, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
		useTrendingInfiniteQuery<'movie'>({
			props: { mediaType: 'movie', time: 'week' },
			options: {
				onSuccess: (data) => {
					let movies: PartialMovie[] = [];

					data.pages.forEach((page) => {
						movies = [...movies, ...(page?.results || [])];
					});

					setMovies({
						page: data.pages[data.pages.length - 1].page,
						results: uniqBy([...movies], 'id'),
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
								mediaType: 'movie'
							})}`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
				<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetchingNextPage || isFetching || isLoading) &&
	  isSuccess &&
	  movies &&
	  movies.results &&
	  movies.results.length === 0 ? (
		<QueryEmpty color={color} colorMode={colorMode}>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{getEmptySubtitle({
							type: 'empty',
							label: `Trending ${formatMediaTypeLabel({
								type: 'multiple',
								mediaType: 'movie'
							})}`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
				<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetchingNextPage || isFetching || isLoading) &&
	  isSuccess &&
	  movies &&
	  movies.results &&
	  movies.results.length > 0 ? (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid spacing={spacing}>
				{({ displayMode }) =>
					(movies.results || []).map((movie: PartialMovie) =>
						displayMode === 'list' ? (
							<MovieHorizontalPoster key={movie.id} movie={movie} />
						) : (
							<MovieVerticalPoster key={movie.id} movie={movie} />
						)
					)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={movies?.results?.length || 0}
					total={movies?.total_results || 0}
					label={`Trending ${formatMediaTypeLabel({
						type: 'multiple',
						mediaType: 'movie'
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
							<DummyHorizontalPoster key={index} mediaType='movie' hasSubtitle hasDescription />
						) : (
							<DummyVerticalPoster key={index} mediaType='movie' hasSubtitle />
						)
					)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={movies?.results?.length || 0}
					total={movies?.total_results || 0}
					label={`Trending ${formatMediaTypeLabel({
						type: 'multiple',
						mediaType: 'movie'
					})}`}
					isDisabled
					isLoading
					isButtonVisible={hasNextPage && !isError}
				/>
			</Center>
		</VStack>
	);
};

export default TrendingMovies;
