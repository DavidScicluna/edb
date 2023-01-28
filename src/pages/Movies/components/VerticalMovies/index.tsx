import { FC } from 'react';

import { useTheme, Button, Icon, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { range } from 'lodash';

import { useLayoutContext } from '../../../../containers/Layout/common/hooks';
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
	MovieHorizontalPoster,
	MovieVerticalPoster
} from '../../../../components';
import { useUserTheme } from '../../../../common/hooks';
import { getEmptySubtitle } from '../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../common/utils';
import { PartialMovie } from '../../../../common/types/movie';

import { VerticalMoviesProps } from './types';

const { getColor } = utils;

const VerticalMovies: FC<VerticalMoviesProps> = ({ query, movies, onLoadMore }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const { isFetchingNextPage, isFetching, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } = query;

	return !(isFetchingNextPage || isFetching || isLoading) && isError ? (
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
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })
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
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })
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
			<VerticalGrid>
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
					label={formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}
					isLoading={false}
					isButtonVisible={hasNextPage && !isError}
					onClick={onLoadMore || fetchNextPage}
				/>
			</Center>
		</VStack>
	) : (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid>
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
					label={formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}
					isDisabled
					isLoading
					isButtonVisible={hasNextPage && !isError}
				/>
			</Center>
		</VStack>
	);
};

export default VerticalMovies;
