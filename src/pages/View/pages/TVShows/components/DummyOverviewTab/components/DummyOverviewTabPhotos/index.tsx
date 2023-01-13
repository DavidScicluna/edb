import { FC } from 'react';

import { useConst } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import {
	ViewPhotosHorizontalGridDummyPhoto,
	ViewPhotosHorizontalGridDummyPhotos
} from '../../../../../../components/ViewPhotosHorizontalGrid/common/types';
import DummyViewPhotosHorizontalGrid from '../../../../../../components/ViewPhotosHorizontalGrid/DummyViewPhotosHorizontalGrid';

const DummyOverviewTabPhotos: FC = () => {
	const dummyPhotos = useConst<ViewPhotosHorizontalGridDummyPhotos>(
		range(10).map(() => {
			return { orientation: sample(['portrait', 'landscape']) } as ViewPhotosHorizontalGridDummyPhoto;
		})
	);

	return <DummyViewPhotosHorizontalGrid photos={[...dummyPhotos]} />;
};

export default DummyOverviewTabPhotos;
