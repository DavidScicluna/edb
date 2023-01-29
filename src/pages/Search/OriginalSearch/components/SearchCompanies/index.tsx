import { FC } from 'react';

import { useTheme, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { range } from 'lodash';

import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
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
	CompanyHorizontalPoster,
	CompanyVerticalPoster
} from '../../../../../components';
import { useUserTheme } from '../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../common/utils';
import { PartialCompany } from '../../../../../common/types';
import { useSearchContext } from '../../common/hooks';

import { SearchCompaniesProps } from './types';

const SearchCompanies: FC<SearchCompaniesProps> = ({ query, data }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const { query: search } = useSearchContext();

	const { isFetchingNextPage, isFetching, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } = query;
	const { results = [], total_results = 0 } = data || {};

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
								type: total_results === 1 ? 'single' : 'multiple',
								mediaType: 'company'
							})} with query "${search}"`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
				<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetchingNextPage || isFetching || isLoading) && isSuccess && results && results.length === 0 ? (
		<QueryEmpty color={color} colorMode={colorMode}>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{getEmptySubtitle({
							type: 'empty',
							label: `${formatMediaTypeLabel({
								type: total_results === 1 ? 'single' : 'multiple',
								mediaType: 'company'
							})} with query "${search}"`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
				<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetchingNextPage || isFetching || isLoading) && isSuccess && results && results.length > 0 ? (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid>
				{({ displayMode }) =>
					results.map((company: PartialCompany) =>
						displayMode === 'list' ? (
							<CompanyHorizontalPoster key={company.id} company={company} />
						) : (
							<CompanyVerticalPoster key={company.id} company={company} />
						)
					)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={results.length}
					total={total_results}
					label={`${formatMediaTypeLabel({
						type: total_results === 1 ? 'single' : 'multiple',
						mediaType: 'company'
					})} with query "${search}"`}
					isLoading={false}
					isButtonVisible={hasNextPage && !isError}
					onClick={fetchNextPage}
				/>
			</Center>
		</VStack>
	) : (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid>
				{({ displayMode }) =>
					range(20).map((_dummy, index) =>
						displayMode === 'list' ? (
							<DummyHorizontalPoster key={index} mediaType='company' hasSubtitle hasDescription />
						) : (
							<DummyVerticalPoster key={index} mediaType='company' hasSubtitle />
						)
					)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={results.length}
					total={total_results}
					label={`${formatMediaTypeLabel({
						type: total_results === 1 ? 'single' : 'multiple',
						mediaType: 'company'
					})} with query "${search}"`}
					isDisabled
					isLoading
					isButtonVisible={hasNextPage && !isError}
				/>
			</Center>
		</VStack>
	);
};

export default SearchCompanies;
