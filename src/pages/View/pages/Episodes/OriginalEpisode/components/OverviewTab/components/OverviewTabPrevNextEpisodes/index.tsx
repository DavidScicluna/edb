import { FC } from 'react';

import { useTheme, useDebounce } from '@davidscicluna/component-library';

import { useMediaQuery, Stack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';
import { useEpisodeContext } from '../../../../common/hooks';
import { getAdjacentEpisode } from '../../../../common/utils';
import OverviewTabEpisode from '../OverviewTabEpisode';

const OverviewTabPrevNextEpisodes: FC = () => {
	const theme = useTheme();

	const [isLg] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

	const { spacing } = useLayoutContext();

	const { showQuery, episodeQuery } = useEpisodeContext();

	const { data: show } = showQuery || {};
	const { seasons = [] } = show || {};

	const { data: episode } = episodeQuery || {};

	const prev = getAdjacentEpisode({ direction: 'prev', seasons, episode });
	const prevDebounced = useDebounce(prev);
	const next = getAdjacentEpisode({ direction: 'next', seasons, episode });
	const nextDebounced = useDebounce(next);

	return (
		<Stack width='100%' direction={isLg ? 'column' : 'row'} spacing={spacing}>
			{compact([
				prevDebounced && prevDebounced.season && prevDebounced.episode && (
					<OverviewTabEpisode type='prev' season={prevDebounced.season} episode={prevDebounced.episode} />
				),

				nextDebounced && nextDebounced.season && nextDebounced.episode && (
					<OverviewTabEpisode type='next' season={nextDebounced.season} episode={nextDebounced.episode} />
				)
			])}
		</Stack>
	);
};

export default OverviewTabPrevNextEpisodes;
