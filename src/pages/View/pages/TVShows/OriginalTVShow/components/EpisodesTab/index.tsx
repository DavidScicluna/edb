import { FC, useState, useEffect } from 'react';

import { useDebounce, Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useUserTheme } from '../../../../../../../common/hooks';
import { TotalBadge } from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useTVShowContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';

import EpisodesTabSeason from './components/EpisodesTabSeason';

const EpisodesTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { showQuery } = useTVShowContext();

	const { data: show } = showQuery || {};
	const { id, name, seasons = [] } = show || {};

	const [totalEpisodes, setTotalEpisodes] = useState<number>(0);
	const totalEpisodesDebounced = useDebounce<number>(totalEpisodes, 'slow');

	useEffect(() => {
		if (totalEpisodesDebounced === 0 && seasons.length > 0) {
			setTotalEpisodes(seasons.reduce((total: number, { episode_count = 0 }) => total + episode_count, 0));
		}
	}, [seasons]);

	return (
		// TODO: Maybe create a ViewTabStructure component and place headline in it with VStack
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })
						} has a total of`}
						suffix={`Episode${totalEpisodesDebounced === 1 ? '' : 's'}`}
						total={totalEpisodesDebounced}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Episodes</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the episode that were released for ${
							name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`
						}`}
					</Text>
				)}
				py={spacing * 2}
			/>

			<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
				{compact(
					seasons.map(({ season_number }) =>
						id && season_number ? (
							<EpisodesTabSeason key={season_number} id={id} season={season_number} />
						) : null
					)
				)}
			</VStack>
		</VStack>
	);
};

export default EpisodesTab;
