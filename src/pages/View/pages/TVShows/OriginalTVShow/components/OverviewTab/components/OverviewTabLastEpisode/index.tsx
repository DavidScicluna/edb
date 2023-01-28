import { FC } from 'react';

import { Card, CardHeader, CardBody } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { compact } from 'lodash';

import DummyOverviewTabLastEpisode from '../../../../../components/DummyOverviewTab/components/DummyOverviewTabLastEpisode';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { useTVShowEpisodeQuery } from '../../../../../../../../../common/queries';
import { useTVShowContext } from '../../../../common/hooks';
import ViewEpisode from '../../../../../../../components/ViewEpisode';

const OverviewTabLastEpisode: FC = () => {
	const { colorMode } = useUserTheme();

	const { showQuery } = useTVShowContext();

	const { data: show } = showQuery || {};
	const { id, last_episode_to_air } = show || {};

	const { season_number: season, episode_number: episode } = last_episode_to_air || {};

	const {
		data: fullEpisode,
		isFetching,
		isLoading,
		isError
	} = useTVShowEpisodeQuery({
		props: { id: Number(id), season: Number(season), episode: Number(episode) }
	});

	return !isError && (isFetching || isLoading) ? (
		<DummyOverviewTabLastEpisode />
	) : !isError && !!fullEpisode ? (
		<Card colorMode={colorMode} isFullWidth p={2}>
			<CardHeader renderTitle={(props) => <Text {...props}>Last Episode to Air</Text>} />
			<CardBody>
				<ViewEpisode
					key={fullEpisode.id}
					episode={{ ...fullEpisode, show_id: Number(id) }}
					badgeLabel={compact([
						fullEpisode.season_number ? `S${fullEpisode.season_number}` : null,
						fullEpisode.episode_number ? `E${fullEpisode.episode_number}` : null
					]).join(' • ')}
				/>
			</CardBody>
		</Card>
	) : null;
};

export default OverviewTabLastEpisode;
