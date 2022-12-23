import { UseMediaTypeImagesQueryResult } from '../../../../../common/queries/useMediaTypeImagesQuery';
import { Image, MediaType } from '../../../../../common/types';
import { ViewPhotosHorizontalGridDummyPhotos, ViewPhotosHorizontalGridOrientation } from '../common/types';

export type ViewPhotosHorizontalGridMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type ViewPhotosHorizontalGridPhoto = { image: Image; orientation: ViewPhotosHorizontalGridOrientation };
export type ViewPhotosHorizontalGridPhotos = ViewPhotosHorizontalGridPhoto[];

type Picked = 'isFetching' | 'isLoading' | 'isError' | 'isSuccess';

// TODO: Go over all components and check if we can use UseResult from queries instead of declaring types ourselves
export type ViewPhotosHorizontalGridProps = Partial<Pick<UseMediaTypeImagesQueryResult, Picked>> & {
	mediaType: ViewPhotosHorizontalGridMediaType;
	photos: ViewPhotosHorizontalGridPhotos;
	dummyPhotos: ViewPhotosHorizontalGridDummyPhotos;
	title?: string;
	subtitle?: string;
	emptyLabel: string;
	total?: number;
	onFooterClick: () => void;
};
