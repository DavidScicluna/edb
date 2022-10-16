import { FC } from 'react';

import { useTheme, Button, Icon } from '@davidscicluna/component-library';

import { range } from 'lodash';
import numbro from 'numbro';

import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	DummyVerticalPoster,
	HorizontalGridScroll
} from '../../../../../../../components';
import TrendingAllTabHorizontalGrid, { width } from '../TrendingAllTabHorizontalGrid';
import { useUserTheme } from '../../../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import PersonVerticalPoster from '../../../../../../People/components/Posters/PersonVerticalPoster';

import { TrendingAllTabPeopleProps } from './types';

const TrendingAllTabPeople: FC<TrendingAllTabPeopleProps> = ({ query, people, onTabChange }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { isFetching, isLoading, isError, isSuccess } = query;
	const { total_results: total = 0, results = [] } = people || {};

	return (
		<TrendingAllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })}
			subtitle={`A list containing the most trending ${formatMediaTypeLabel({
				type: 'multiple',
				mediaType: 'person'
			})} this week.`}
			footerLabel={`View all ${numbro(total).format({ average: true })} Trending ${formatMediaTypeLabel({
				type: 'multiple',
				mediaType: 'person'
			})}`}
			onFooterClick={onTabChange ? () => onTabChange({ mediaType: 'person' }) : undefined}
		>
			{!(isFetching || isLoading) && isError ? (
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
			) : !(isFetching || isLoading) && isSuccess && results && results.length === 0 ? (
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
			) : !(isFetching || isLoading) && isSuccess && results && results.length > 0 ? (
				<HorizontalGridScroll>
					{results.map((person) => (
						<PersonVerticalPoster key={person.id} person={person} sx={{ width }} />
					))}
				</HorizontalGridScroll>
			) : (
				<HorizontalGridScroll>
					{range(20).map((_dummy, index) => (
						<DummyVerticalPoster key={index} mediaType='person' hasSubtitle sx={{ width }} />
					))}
				</HorizontalGridScroll>
			)}
		</TrendingAllTabHorizontalGrid>
	);
};

export default TrendingAllTabPeople;
