import { FC } from 'react';

import { DummyCard, DummyCardHeader, CardBody } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../common/hooks';
import ViewDummyEpisode from '../../../../../../components/ViewDummyEpisode';

const DummyOverviewTabLastEpisode: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<DummyCard colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader hasTitle />
			<CardBody>
				<ViewDummyEpisode hasDate hasOverview />
			</CardBody>
		</DummyCard>
	);
};

export default DummyOverviewTabLastEpisode;
