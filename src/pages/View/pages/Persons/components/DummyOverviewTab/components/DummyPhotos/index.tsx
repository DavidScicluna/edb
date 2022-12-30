import { FC } from 'react';

import { range } from 'lodash';

import DummyViewPhotosHorizontalGrid from '../../../../../../components/ViewPhotosHorizontalGrid/DummyViewPhotosHorizontalGrid';

const DummyPhotos: FC = () => {
	return (
		<DummyViewPhotosHorizontalGrid
			photos={range(10).map(() => {
				return { orientation: 'portrait' };
			})}
		/>
	);
};

export default DummyPhotos;
