import { FC } from 'react';

import { range } from 'lodash';

import { useLayoutContext } from '../../../../../../../../containers/Layout/common/hooks';
import { VerticalGrid } from '../../../../../../../../components';
import TVShowsDummyEpisode from '../../../TVShowsDummyEpisode';

const DummyEpisodesTabSeason: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VerticalGrid displayMode='list' spacing={spacing}>
			{() => range(20).map((_dummy, index) => <TVShowsDummyEpisode key={index} hasDate hasOverview />)}
		</VerticalGrid>
	);
};

export default DummyEpisodesTabSeason;
