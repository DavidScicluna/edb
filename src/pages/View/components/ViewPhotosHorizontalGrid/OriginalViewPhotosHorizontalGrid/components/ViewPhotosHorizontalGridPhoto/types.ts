import { ViewPhotosHorizontalGridPhoto, ViewPhotosHorizontalGridProps } from '../../types';

export type ViewPhotosHorizontalGridPhotoProps = ViewPhotosHorizontalGridPhoto & {
	index: number;
} & Pick<ViewPhotosHorizontalGridProps, 'mediaType'>;
