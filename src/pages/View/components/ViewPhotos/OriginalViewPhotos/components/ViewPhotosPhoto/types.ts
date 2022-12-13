import { ViewPhotosPhoto, ViewPhotosProps } from '../../types';

export type ViewPhotosPhotoProps = ViewPhotosPhoto & {
	index: number;
} & Pick<ViewPhotosProps, 'mediaType'>;
