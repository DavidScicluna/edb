export type DummyViewPhotosPhoto = { orientation: 'landscape' | 'portrait' | 'square' };
export type DummyViewPhotosPhotos = DummyViewPhotosPhoto[];

export type DummyViewPhotosProps = {
	photos: DummyViewPhotosPhotos;
};
