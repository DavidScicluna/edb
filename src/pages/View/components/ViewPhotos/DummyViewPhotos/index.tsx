import { FC } from 'react';

import DummyPhoto from '../components/ViewPhotosDummyPhoto';
import ViewMasonry from '../components/ViewPhotosMasonry';

import { DummyViewPhotosProps } from './types';

const DummyViewPhotos: FC<DummyViewPhotosProps> = ({ dummyPhotos }) => {
	return (
		<ViewMasonry>
			{dummyPhotos.map(({ orientation }, index) => (
				<DummyPhoto key={index} orientation={orientation} />
			))}
		</ViewMasonry>
	);
};

export default DummyViewPhotos;
