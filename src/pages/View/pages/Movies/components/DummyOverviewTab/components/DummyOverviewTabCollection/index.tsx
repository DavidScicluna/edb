import { FC } from 'react';

import { DummyCard, DummyCardHeader, CardBody } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { DummyHorizontalPoster } from '../../../../../../../../components';

const DummyOverviewTabCollection: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<DummyCard colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader hasTitle hasSubtitle />
			<CardBody>
				<DummyHorizontalPoster mediaType='collection' hasSubtitle hasDescription />
			</CardBody>
		</DummyCard>
	);
};

export default DummyOverviewTabCollection;
