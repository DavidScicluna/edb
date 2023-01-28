import { FC } from 'react';

import { range } from 'lodash';

import { useLayoutContext } from '../../../../../../../../containers/Layout/common/hooks';
import { VerticalGrid } from '../../../../../../../../components';
import ViewDummyEpisode from '../../../../../../components/ViewDummyEpisode';

const DummyEpisodesTabSeason: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VerticalGrid displayMode='list'>
			{() => range(20).map((_dummy, index) => <ViewDummyEpisode key={index} hasDate hasOverview />)}
		</VerticalGrid>
	);
};

export default DummyEpisodesTabSeason;
