import { FC, useState } from 'react';

import { useTheme, useDebounce, Headline, Divider } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import {
	DisplayMode,
	TotalBadge,
	VerticalGrid,
	PersonHorizontalPoster,
	PersonVerticalPoster,
	LoadMore,
	DummyHorizontalPoster,
	DummyVerticalPoster
} from '../../../../../../../components';
import { useUserTheme } from '../../../../../../../common/hooks';
import { useEpisodeContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import EpisodeEmpty from '../EpisodeEmpty';
import EpisodeError from '../EpisodeError';

const limit = 20;

const GuestStarsTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const { episodeQuery, creditsQuery } = useEpisodeContext();

	const { data: episode } = episodeQuery || {};
	const { name, episode_number: number } = episode || {};

	const { data: credits, isFetching, isLoading, isError, isSuccess, refetch } = creditsQuery || {};
	const { guest_stars: guests = [] } = credits || {};

	const [visible, setVisible] = useState<number>(limit);
	const visibleDebounced = useDebounce<number>(visible, 'slow');

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							name
								? ['Episode', number, `"${name}"`].join(' ')
								: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Episode`
						} has a total of`}
						suffix='Guest Stars'
						total={guests.length}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Guest Stars</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'person'
						})} that made a guest appearance in ${
							name
								? ['Episode', number, `"${name}"`].join(' ')
								: `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Episode`
						}`}
					</Text>
				)}
				renderRight={() => <DisplayMode />}
				py={spacing * 2}
			/>

			<Center width='100%'>
				{!(isFetching || isLoading) && isError ? (
					<EpisodeError
						label={
							name
								? ['Episode', number, `"${name}"`, 'Guest Stars'].join(' ')
								: `${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'tv'
								  })} Episode Guest Stars`
						}
						refetch={refetch}
					/>
				) : !(isFetching || isLoading) && isSuccess && guests.length === 0 ? (
					<EpisodeEmpty
						label={
							name
								? ['Episode', number, `"${name}"`, 'Guest Stars'].join(' ')
								: `${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'tv'
								  })} Episode Guest Stars`
						}
					/>
				) : !(isFetching || isLoading) && isSuccess && guests.length > 0 ? (
					<VStack width='100%' spacing={spacing}>
						<VerticalGrid spacing={spacing}>
							{({ displayMode }) =>
								guests
									.filter((_person, index) => index < visibleDebounced)
									.map((person) =>
										displayMode === 'list' ? (
											<PersonHorizontalPoster
												key={person.id}
												person={person}
												subtitle={person.character ? `As ${person.character}` : undefined}
											/>
										) : (
											<PersonVerticalPoster
												key={person.id}
												person={person}
												subtitle={person.character ? `As ${person.character}` : undefined}
											/>
										)
									)
							}
						</VerticalGrid>

						<Center width={isSm ? '100%' : 'auto'}>
							<LoadMore
								amount={visibleDebounced}
								total={guests.length}
								label={
									name
										? ['Episode', number, `"${name}"`, 'Guest Stars'].join(' ')
										: `${formatMediaTypeLabel({
												type: 'single',
												mediaType: 'tv'
										  })} Episode Guest Stars`
								}
								isLoading={false}
								isButtonVisible={visibleDebounced <= guests.length}
								onClick={() => setVisible((total) => total + limit)}
							/>
						</Center>
					</VStack>
				) : (
					<VStack width='100%' spacing={spacing}>
						<VerticalGrid spacing={spacing}>
							{({ displayMode }) =>
								range(20).map((_dummy, index) =>
									displayMode === 'list' ? (
										<DummyHorizontalPoster key={index} mediaType='person' hasSubtitle />
									) : (
										<DummyVerticalPoster key={index} mediaType='person' hasSubtitle />
									)
								)
							}
						</VerticalGrid>

						<Center width={isSm ? '100%' : 'auto'}>
							<LoadMore
								amount={0}
								total={0}
								label={
									name
										? ['Episode', number, `"${name}"`, 'Guest Stars'].join(' ')
										: `${formatMediaTypeLabel({
												type: 'single',
												mediaType: 'tv'
										  })} Episode Guest Stars`
								}
								isDisabled
								isLoading
								isButtonVisible
							/>
						</Center>
					</VStack>
				)}
			</Center>
		</VStack>
	);
};

export default GuestStarsTab;
