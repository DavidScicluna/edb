import { FC } from 'react';

import DummyPhoto from '../components/ViewPhotosDummyPhoto';
import Masonry from '../components/ViewPhotosMasonry';

import { DummyViewPhotosProps } from './types';

const DummyViewPhotos: FC<DummyViewPhotosProps> = ({ dummyPhotos }) => {
	return <Masonry items={dummyPhotos} render={DummyPhoto} />;
};

export default DummyViewPhotos;
