import { FC } from 'react';

import { DummyCard, DummyCardHeader, CardBody } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { DummyHorizontalPoster } from '../../../../../../../../components';

const DummyOverviewTabTVShow: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<DummyCard colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader hasTitle />
			<CardBody>
				<DummyHorizontalPoster mediaType='tv' hasSubtitle hasDescription />
			</CardBody>
		</DummyCard>
	);
};

export default DummyOverviewTabTVShow;
