import { UseMediaTypeImagesQueryResult } from '../../../../../common/queries/useMediaTypeImagesQuery';
import { Image, MediaType } from '../../../../../common/types';
import { ViewPhotosDummyPhotos, ViewPhotosOrientation } from '../common/types';

export type ViewPhotosMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type ViewPhotosPhotoImage = Omit<Image, 'width' | 'height'>;

export type ViewPhotosPhoto = { height: number; image: ViewPhotosPhotoImage; orientation: ViewPhotosOrientation };
export type ViewPhotosPhotos = ViewPhotosPhoto[];

type Picked = 'isFetching' | 'isLoading' | 'isError' | 'isSuccess' | 'error' | 'refetch';

// TODO: Go over all components and check if we can use UseResult from queries instead of declaring types ourselves
export type ViewPhotosProps = Partial<Pick<UseMediaTypeImagesQueryResult, Picked>> & {
	mediaType: ViewPhotosMediaType;
	photos?: ViewPhotosPhotos;
	dummyPhotos: ViewPhotosDummyPhotos;
	name?: string;
};
