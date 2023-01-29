import { FC } from 'react';

import ViewInfo from '../../../../components/ViewInfo';
import ViewInfoDummyCertificationItem from '../../../../components/ViewInfo/components/ViewInfoDummyCertificationItem';
import ViewInfoDummyRuntimeItem from '../../../../components/ViewInfo/components/ViewInfoDummyRuntimeItem';

import EpisodesDummyInfoDate from './components/EpisodesDummyInfoDate';
import EpisodesDummyInfoNumbers from './components/EpisodesDummyInfoNumbers';

const EpisodesDummyInfo: FC = () => {
	return (
		<ViewInfo>
			<ViewInfoDummyCertificationItem key='ds-edb-episode-dummy-info-certification' />

			<EpisodesDummyInfoDate key='ds-edb-episode-dummy-info-date' />

			<EpisodesDummyInfoNumbers key='ds-edb-episode-dummy-info-numbers' />

			<ViewInfoDummyRuntimeItem key='ds-edb-episode-dummy-info-runtime' />
		</ViewInfo>
	);
};

export default EpisodesDummyInfo;
