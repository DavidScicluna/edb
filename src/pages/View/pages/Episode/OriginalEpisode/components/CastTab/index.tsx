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

const CastTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const { episodeQuery, creditsQuery } = useEpisodeContext();

	const { data: episode } = episodeQuery || {};
	const { name, episode_number: number } = episode || {};

	const { data: credits, isFetching, isLoading, isError, isSuccess, refetch } = creditsQuery || {};
	const { cast = [] } = credits || {};

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
						suffix='Cast Members'
						total={cast.length}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Cast</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'person'
						})} that made an appearance in ${
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
								? ['Episode', number, `"${name}"`, 'Cast Members'].join(' ')
								: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Episode Cast Members`
						}
						refetch={refetch}
					/>
				) : !(isFetching || isLoading) && isSuccess && cast.length === 0 ? (
					<EpisodeEmpty
						label={
							name
								? ['Episode', number, `"${name}"`, 'Cast Members'].join(' ')
								: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Episode Cast Members`
						}
					/>
				) : !(isFetching || isLoading) && isSuccess && cast.length > 0 ? (
					<VStack width='100%' spacing={spacing}>
						<VerticalGrid>
							{({ displayMode }) =>
								cast
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
								total={cast.length}
								label={
									name
										? ['Episode', number, `"${name}"`, 'Cast Members'].join(' ')
										: `${formatMediaTypeLabel({
												type: 'single',
												mediaType: 'tv'
										  })} Episode Cast Members`
								}
								isLoading={false}
								isButtonVisible={visibleDebounced <= cast.length}
								onClick={() => setVisible((total) => total + limit)}
							/>
						</Center>
					</VStack>
				) : (
					<VStack width='100%' spacing={spacing}>
						<VerticalGrid>
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
										? ['Episode', number, `"${name}"`, 'Cast Members'].join(' ')
										: `${formatMediaTypeLabel({
												type: 'single',
												mediaType: 'tv'
										  })} Episode Cast Members`
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

export default CastTab;
