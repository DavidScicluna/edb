import { Image, MediaType } from '../../../../../common/types';

export type ViewPhotosMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type ViewPhotosOrientation = 'landscape' | 'portrait' | 'square';

export type ViewPhotosPhoto = { image: Image; orientation: ViewPhotosOrientation };
export type ViewPhotosPhotos = ViewPhotosPhoto[];

export type ViewPhotosDummyPhoto = { orientation: ViewPhotosOrientation };
export type ViewPhotosDummyPhotos = ViewPhotosDummyPhoto[];

export type ViewPhotosProps = {
	mediaType: ViewPhotosMediaType;
	photos: ViewPhotosPhotos;
	dummyPhotos: ViewPhotosDummyPhotos;
	title?: string;
	subtitle?: string;
	emptyLabel: string;
	total?: number;
	isLoading?: boolean;
	isError?: boolean;
	isSuccess?: boolean;
	onFooterClick: () => void;
};
