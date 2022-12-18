import { Image, MediaType } from '../../../../../common/types';
import { ViewPhotosHorizontalGridDummyPhotos, ViewPhotosHorizontalGridOrientation } from '../common/types';

export type ViewPhotosHorizontalGridMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type ViewPhotosHorizontalGridPhoto = { image: Image; orientation: ViewPhotosHorizontalGridOrientation };
export type ViewPhotosHorizontalGridPhotos = ViewPhotosHorizontalGridPhoto[];

export type ViewPhotosHorizontalGridProps = {
	mediaType: ViewPhotosHorizontalGridMediaType;
	photos: ViewPhotosHorizontalGridPhotos;
	dummyPhotos: ViewPhotosHorizontalGridDummyPhotos;
	title?: string;
	subtitle?: string;
	emptyLabel: string;
	total?: number;
	isLoading?: boolean;
	isError?: boolean;
	isSuccess?: boolean;
	onFooterClick: () => void;
};
