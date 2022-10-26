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
	PersonHorizontalPoster,
	PersonVerticalPoster
} from '../../../../../components';
import { useUserTheme } from '../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../common/utils';
import { UseSearchInfiniteQueryResponse } from '../../../../../common/queries/useSearchInfiniteQuery';
import { PartialPerson } from '../../../../../common/types/person';

import { SearchPeopleProps } from './types';

const SearchPeople: FC<SearchPeopleProps> = ({ query = '' }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const [people, setPeople] = useState<UseSearchInfiniteQueryResponse<'person'>>();

	const { isFetchingNextPage, isFetching, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
		useSearchInfiniteQuery<'person'>({
			props: { mediaType: 'person', query },
			options: {
				enabled: !!query,
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
							label: `${formatMediaTypeLabel({
								type: (people?.total_results || 0) === 1 ? 'single' : 'multiple',
								mediaType: 'person'
							})} with query "${query}"`
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
							label: `${formatMediaTypeLabel({
								type: (people?.total_results || 0) === 1 ? 'single' : 'multiple',
								mediaType: 'person'
							})} with query "${query}"`
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
					label={`${formatMediaTypeLabel({
						type: (people?.total_results || 0) === 1 ? 'single' : 'multiple',
						mediaType: 'person'
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
					label={`${formatMediaTypeLabel({
						type: (people?.total_results || 0) === 1 ? 'single' : 'multiple',
						mediaType: 'person'
					})} with query "${query}"`}
					isDisabled
					isLoading
					isButtonVisible={hasNextPage && !isError}
				/>
			</Center>
		</VStack>
	);
};

export default SearchPeople;
