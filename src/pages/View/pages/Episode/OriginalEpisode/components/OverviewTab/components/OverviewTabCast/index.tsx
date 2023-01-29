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
import { useEpisodeContext } from '../../../../common/hooks';
import { EpisodeCast } from '../../../../../../../../../common/types/tv';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { getEpisodeTabIndex } from '../../../../../common/utils';

const OverviewTabCast: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { episodeQuery, creditsQuery, onSetActiveTab } = useEpisodeContext();

	const { data: episode, isFetching: isFetchingEpisode, isLoading: isEpisodeLoading } = episodeQuery || {};
	const { name, episode_number: number } = episode || {};

	const {
		data: credits,
		isFetching: isFetchingCredits,
		isLoading: isCreditsLoading,
		isError: isCreditsError,
		isSuccess: isCreditsSuccess
	} = creditsQuery || {};
	const { cast = [] } = credits || {};

	const [topCast, setTopCast] = useState<EpisodeCast[]>(
		uniqBy([...cast], 'id').filter((_mediaItem, index) => index < 20)
	);
	const topCastDebounced = useDebounce<EpisodeCast[]>(topCast, 'slow');

	useUpdateEffect(() => {
		setTopCast(uniqBy([...cast], 'id').filter((_mediaItem, index) => index < 20));
	}, [cast]);

	return (
		// TODO: Go over all HorizontalGrid and disabled if loading or error or not items
		<HorizontalGrid
			colorMode={colorMode}
			isDisabled={
				topCastDebounced.length === 0 ||
				isFetchingEpisode ||
				isEpisodeLoading ||
				isFetchingCredits ||
				isCreditsLoading
			}
			isFullWidth
			spacing={2}
			p={2}
		>
			<HorizontalGridHeader
				renderTitle={(props) => <Text {...props}>Cast</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This list is showcasing the cast of ${
							name
								? ['Episode', number, `"${name}"`].join(' ')
								: `${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'tv'
								  })} Episode`
						}`}
					</Text>
				)}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>
			<HorizontalGridBody>
				{!(isFetchingEpisode || isEpisodeLoading || isFetchingCredits || isCreditsLoading) && isCreditsError ? (
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
										label: name
											? ['Episode', number, `"${name}"`, 'Cast'].join(' ')
											: `${formatMediaTypeLabel({
													type: 'single',
													mediaType: 'tv'
											  })} Episode Cast`
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetchingEpisode || isEpisodeLoading || isFetchingCredits || isCreditsLoading) &&
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
										label: name
											? ['Episode', number, `"${name}"`, 'Cast'].join(' ')
											: `${formatMediaTypeLabel({
													type: 'single',
													mediaType: 'tv'
											  })} Episode Cast`
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetchingEpisode || isEpisodeLoading || isFetchingCredits || isCreditsLoading) &&
				  isCreditsSuccess &&
				  topCastDebounced &&
				  topCastDebounced.length > 0 ? (
					<HorizontalGridScroll>
						{topCastDebounced.map((person) => (
							<PersonVerticalPoster
								key={person.id}
								person={person}
								subtitle={person.character ? `As ${person.character}` : undefined}
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
					onClick={() => onSetActiveTab({ index: getEpisodeTabIndex('cast') })}
					size={isSm ? 'xs' : 'sm'}
					variant='text'
				>
					{`View all ${numbro(cast.length).format({ average: true })} Cast`}
				</Button>
			</HorizontalGridFooter>
		</HorizontalGrid>
	);
};

export default OverviewTabCast;
