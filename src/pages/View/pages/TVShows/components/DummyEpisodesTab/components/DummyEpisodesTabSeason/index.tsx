import { FC } from 'react';

import { range } from 'lodash';

import { VerticalGrid } from '../../../../../../../../components';
import ViewDummyEpisode from '../../../../../../components/ViewDummyEpisode';

const DummyEpisodesTabSeason: FC = () => {
	return (
		<VerticalGrid displayMode='list'>
			{() => range(20).map((_dummy, index) => <ViewDummyEpisode key={index} hasDate hasOverview />)}
		</VerticalGrid>
	);
};

export default DummyEpisodesTabSeason;
