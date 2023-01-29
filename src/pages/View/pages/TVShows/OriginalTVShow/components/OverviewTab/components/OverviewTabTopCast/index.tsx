import { FC, useState } from 'react';

import { useTheme, useDebounce, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { range, uniqBy } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';
import numbro from 'numbro';

import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';
import {
	HorizontalGrid,
	HorizontalGridHeader,
	HorizontalGridBody,
	HorizontalGridScroll,
	HorizontalGridFooter,
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	DummyVerticalPoster,
	PersonVerticalPoster
} from '../../../../../../../../../components';
import { getEmptySubtitle } from '../../../../../../../../../components/QueryEmpty/common/utils';
import { useTVShowContext } from '../../../../common/hooks';
import { Cast } from '../../../../../../../../../common/types/tv';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { getTVShowTabIndex } from '../../../../../common/utils';

const OverviewTabTopCast: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { showQuery, creditsQuery, onSetActiveTab } = useTVShowContext();

	const { data: show, isFetching: isFetchingTVShow, isLoading: isTVShowLoading } = showQuery || {};
	const { name } = show || {};

	const {
		data: credits,
		isFetching: isFetchingCredits,
		isLoading: isCreditsLoading,
		isError: isCreditsError,
		isSuccess: isCreditsSuccess
	} = creditsQuery || {};
	const { cast = [] } = credits || {};

	const [topCast, setTopCast] = useState<Cast[]>(uniqBy([...cast], 'id').filter((_mediaItem, index) => index < 20));
	const topCastDebounced = useDebounce<Cast[]>(topCast, 'slow');

	useUpdateEffect(() => {
		setTopCast(uniqBy([...cast], 'id').filter((_mediaItem, index) => index < 20));
	}, [cast]);

	return (
		// TODO: Go over all HorizontalGrid and disabled if loading or error or not items
		<HorizontalGrid
			colorMode={colorMode}
			isDisabled={
				topCastDebounced.length === 0 ||
				isFetchingTVShow ||
				isTVShowLoading ||
				isFetchingCredits ||
				isCreditsLoading
			}
			isFullWidth
			spacing={2}
			p={2}
		>
			<HorizontalGridHeader
				renderTitle={(props) => <Text {...props}>Top Series Cast</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This list is showcasing the top series cast of ${
							name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`
						}`}
					</Text>
				)}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>
			<HorizontalGridBody>
				{!(isFetchingTVShow || isTVShowLoading || isFetchingCredits || isCreditsLoading) && isCreditsError ? (
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
										label: name ? `${name} Top Cast` : 'Top Cast'
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetchingTVShow || isTVShowLoading || isFetchingCredits || isCreditsLoading) &&
				  isCreditsSuccess &&
				  topCastDebounced &&
				  topCastDebounced.length === 0 ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({
										type: 'empty',
										label: name ? `${name} Top Cast` : 'Top Cast'
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetchingTVShow || isTVShowLoading || isFetchingCredits || isCreditsLoading) &&
				  isCreditsSuccess &&
				  topCastDebounced &&
				  topCastDebounced.length > 0 ? (
					<HorizontalGridScroll>
						{topCastDebounced.map((person) => (
							<PersonVerticalPoster
								key={person.id}
								person={person}
								subtitle={
									person && person.roles && person.roles.length > 0
										? person.roles
												.map(({ episode_count = 0, character }) =>
													episode_count > 0
														? `${episode_count} episode${
																episode_count === 1 ? '' : 's'
														  } as ${character}`
														: `As ${character}`
												)
												.join(', ')
										: undefined
								}
								sx={dimensions}
							/>
						))}
					</HorizontalGridScroll>
				) : (
					<HorizontalGridScroll>
						{range(20).map((_dummy, index) => (
							<DummyVerticalPoster key={index} mediaType='person' hasSubtitle sx={dimensions} />
						))}
					</HorizontalGridScroll>
				)}
			</HorizontalGridBody>
			<HorizontalGridFooter>
				<Button
					color={color}
					colorMode={colorMode}
					isDisabled={cast.length === 0}
					isFullWidth
					onClick={() => onSetActiveTab({ index: getTVShowTabIndex('cast') })}
					size={isSm ? 'xs' : 'sm'}
					variant='text'
				>
					{`View all ${numbro(cast.length).format({ average: true })} Series Cast`}
				</Button>
			</HorizontalGridFooter>
		</HorizontalGrid>
	);
};

export default OverviewTabTopCast;
