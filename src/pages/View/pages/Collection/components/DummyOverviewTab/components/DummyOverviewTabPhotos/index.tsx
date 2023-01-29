import { FC } from 'react';

import { useConst } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import DummyViewPhotosHorizontalGrid from '../../../../../../components/ViewPhotosHorizontalGrid/DummyViewPhotosHorizontalGrid';
import {
	ViewPhotosHorizontalGridDummyPhoto,
	ViewPhotosHorizontalGridDummyPhotos
} from '../../../../../../components/ViewPhotosHorizontalGrid/common/types';

const DummyOverviewTabPhotos: FC = () => {
	const dummyPhotos = useConst<ViewPhotosHorizontalGridDummyPhotos>(
		range(10).map(() => {
			return { orientation: sample(['portrait', 'landscape']) } as ViewPhotosHorizontalGridDummyPhoto;
		})
	);

	return <DummyViewPhotosHorizontalGrid photos={[...dummyPhotos]} />;
};

export default DummyOverviewTabPhotos;
