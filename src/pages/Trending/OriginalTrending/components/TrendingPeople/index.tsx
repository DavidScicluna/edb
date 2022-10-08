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
import PersonVerticalPoster from '../../../../People/components/Posters/PersonVerticalPoster';
import PersonHorizontalPoster from '../../../../People/components/Posters/PersonHorizontalPoster';
import { PartialPerson } from '../../../../../common/types/person';
import { UseTrendingInfiniteQueryResponse } from '../../../../../common/queries/useTrendingInfiniteQuery';

const TrendingPeople: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const [people, setPeople] = useState<UseTrendingInfiniteQueryResponse<'person'>>();

	const { isFetchingNextPage, isFetching, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
		useTrendingInfiniteQuery<'person'>({
			props: { mediaType: 'person', time: 'week' },
			options: {
				onSuccess: (data) => {
					let people: PartialPerson[] = [];

					data.pages.forEach((page) => {
						people = [...people, ...(page?.results || [])];
					});

					setPeople({
						page: data.pages[data.pages.length - 1].page,
						results: uniqBy([...people], 'id'),
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
								mediaType: 'person'
							})}`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
				<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetchingNextPage || isFetching || isLoading) &&
	  isSuccess &&
	  people &&
	  people.results &&
	  people.results.length === 0 ? (
		<QueryEmpty color={color} colorMode={colorMode}>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{getEmptySubtitle({
							type: 'empty',
							label: `Trending ${formatMediaTypeLabel({
								type: 'multiple',
								mediaType: 'person'
							})}`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
				<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetchingNextPage || isFetching || isLoading) &&
	  isSuccess &&
	  people &&
	  people.results &&
	  people.results.length > 0 ? (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid spacing={spacing}>
				{({ displayMode }) =>
					(people.results || []).map((person: PartialPerson) =>
						displayMode === 'list' ? (
							<PersonHorizontalPoster key={person.id} person={person} />
						) : (
							<PersonVerticalPoster key={person.id} person={person} />
						)
					)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={people?.results?.length || 0}
					total={people?.total_results || 0}
					label={`Trending ${formatMediaTypeLabel({
						type: 'multiple',
						mediaType: 'person'
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
							<DummyHorizontalPoster key={index} mediaType='person' hasSubtitle hasDescription />
						) : (
							<DummyVerticalPoster key={index} mediaType='person' hasSubtitle />
						)
					)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={people?.results?.length || 0}
					total={people?.total_results || 0}
					label={`Trending ${formatMediaTypeLabel({
						type: 'multiple',
						mediaType: 'person'
					})}`}
					isDisabled
					isLoading
					isButtonVisible={hasNextPage && !isError}
				/>
			</Center>
		</VStack>
	);
};

export default TrendingPeople;
