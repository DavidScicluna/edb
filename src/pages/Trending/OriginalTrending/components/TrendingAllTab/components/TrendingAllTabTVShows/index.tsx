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
	HorizontalGridScroll,
	TVShowVerticalPoster
} from '../../../../../../../components';
import TrendingAllTabHorizontalGrid, { width } from '../TrendingAllTabHorizontalGrid';
import { useUserTheme } from '../../../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';

import { TrendingAllTabShowsProps } from './types';

const TrendingAllTabShows: FC<TrendingAllTabShowsProps> = ({ query, shows, onTabChange }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { isFetching, isLoading, isError, isSuccess } = query;
	const { total_results: total = 0, results = [] } = shows || {};

	return (
		<TrendingAllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })}
			subtitle={`A list containing the most trending ${formatMediaTypeLabel({
				type: 'multiple',
				mediaType: 'tv'
			})} this week.`}
			footerLabel={`View all ${numbro(total).format({ average: true })} Trending ${formatMediaTypeLabel({
				type: 'multiple',
				mediaType: 'tv'
			})}`}
			onFooterClick={onTabChange ? () => onTabChange({ mediaType: 'tv' }) : undefined}
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
										mediaType: 'tv'
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
										mediaType: 'tv'
									})}`
								})}
							</QueryEmptySubtitle>
						</QueryEmptyBody>
						<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
					</QueryEmptyStack>
				</QueryEmpty>
			) : !(isFetching || isLoading) && isSuccess && results && results.length > 0 ? (
				<HorizontalGridScroll>
					{results.map((show) => (
						<TVShowVerticalPoster key={show.id} show={show} sx={{ width }} />
					))}
				</HorizontalGridScroll>
			) : (
				<HorizontalGridScroll>
					{range(20).map((_dummy, index) => (
						<DummyVerticalPoster key={index} mediaType='tv' hasSubtitle sx={{ width }} />
					))}
				</HorizontalGridScroll>
			)}
		</TrendingAllTabHorizontalGrid>
	);
};

export default TrendingAllTabShows;
