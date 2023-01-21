import { FC } from 'react';

import ViewInfo from '../../../../components/ViewInfo';

import EpisodesDummyInfoDate from './components/EpisodesDummyInfoDate';
import EpisodesDummyInfoNumbers from './components/EpisodesDummyInfoNumbers';

const EpisodesDummyInfo: FC = () => {
	return (
		<ViewInfo>
			<EpisodesDummyInfoDate key='ds-edb-episode-dummy-info-date' />

			<EpisodesDummyInfoNumbers key='ds-edb-episode-dummy-info-numbers' />
		</ViewInfo>
	);
};

export default EpisodesDummyInfo;
