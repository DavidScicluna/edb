import { FC } from 'react';

import { useConst } from '@chakra-ui/react';

import { range } from 'lodash';

import DummyViewPhotosHorizontalGrid from '../../../../../../components/ViewPhotosHorizontalGrid/DummyViewPhotosHorizontalGrid';
import {
	ViewPhotosHorizontalGridDummyPhoto,
	ViewPhotosHorizontalGridDummyPhotos
} from '../../../../../../components/ViewPhotosHorizontalGrid/common/types';

const DummyOverviewTabPhotos: FC = () => {
	const dummyPhotos = useConst<ViewPhotosHorizontalGridDummyPhotos>(
		range(10).map(() => {
			return { orientation: 'portrait' } as ViewPhotosHorizontalGridDummyPhoto;
		})
	);

	return <DummyViewPhotosHorizontalGrid photos={[...dummyPhotos]} />;
};

export default DummyOverviewTabPhotos;
