import { FC } from 'react';

import { useDebounce, useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, HStack } from '@chakra-ui/react';

import { useEpisodeContext } from '../../common/hooks';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';

import { EpisodeActionsProps } from './types';
import { getAdjacentEpisode } from './common/utils';
import EpisodeActionsBack from './components/EpisodeActionsBack';
import EpisodeActionsPrevNext from './components/EpisodeActionsPrevNext';

const EpisodeActions: FC<EpisodeActionsProps> = (props) => {
	const theme = useTheme();

	const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	const { spacing } = useLayoutContext();

	const { showQuery, episodeQuery } = useEpisodeContext();

	const { data: show } = showQuery || {};
	const { name, seasons = [] } = show || {};

	const { data: episode } = episodeQuery || {};

	const prev = getAdjacentEpisode({ direction: 'prev', seasons, episode });
	const prevDebounced = useDebounce(prev);
	const next = getAdjacentEpisode({ direction: 'next', seasons, episode });
	const nextDebounced = useDebounce(next);

	return isMd ? (
		<VStack {...props} width='100%' spacing={spacing}>
			<EpisodeActionsBack name={name} />

			<HStack width='100%' spacing={spacing}>
				{prevDebounced && prevDebounced.season && prevDebounced.episode && (
					<EpisodeActionsPrevNext
						type='prev'
						season_number={prevDebounced.season}
						episode_number={prevDebounced.episode}
					/>
				)}

				{nextDebounced && nextDebounced.season && nextDebounced.episode && (
					<EpisodeActionsPrevNext
						type='next'
						season_number={nextDebounced.season}
						episode_number={nextDebounced.episode}
					/>
				)}
			</HStack>
		</VStack>
	) : (
		<HStack {...props} width='100%' spacing={spacing}>
			{prevDebounced && prevDebounced.season && prevDebounced.episode && (
				<EpisodeActionsPrevNext
					type='prev'
					season_number={prevDebounced.season}
					episode_number={prevDebounced.episode}
				/>
			)}

			<EpisodeActionsBack name={name} />

			{nextDebounced && nextDebounced.season && nextDebounced.episode && (
				<EpisodeActionsPrevNext
					type='next'
					season_number={nextDebounced.season}
					episode_number={nextDebounced.episode}
				/>
			)}
		</HStack>
	);
};

export default EpisodeActions;
