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
	TVShowHorizontalPoster,
	TVShowVerticalPoster
} from '../../../../components';
import { useUserTheme } from '../../../../common/hooks';
import { getEmptySubtitle } from '../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../common/utils';
import { PartialTVShow } from '../../../../common/types/tv';

import { VerticalTVShowsProps } from './types';

const { getColor } = utils;

const VerticalTVShows: FC<VerticalTVShowsProps> = ({ query, shows, onLoadMore }) => {
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
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })
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
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })
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
			<VerticalGrid>
				{({ displayMode }) =>
					(shows.results || []).map((show: PartialTVShow) =>
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
					label={formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })}
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
					label={formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })}
					isDisabled
					isLoading
					isButtonVisible={hasNextPage && !isError}
				/>
			</Center>
		</VStack>
	);
};

export default VerticalTVShows;
