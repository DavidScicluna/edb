import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { DummyParagraph } from '../../../../../../components';

import DummyPhotos from './components/DummyPhotos';
import DummyKnownFor from './components/DummyKnownFor';

const DummyOverviewTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<DummyParagraph />

			<DummyKnownFor />

			<DummyPhotos />
		</VStack>
	);
};

export default DummyOverviewTab;
