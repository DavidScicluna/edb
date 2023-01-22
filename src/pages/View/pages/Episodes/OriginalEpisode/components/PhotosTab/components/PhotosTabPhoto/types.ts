import { RenderComponentProps } from 'masonic';

import { ViewPhotosPhoto, ViewPhotosProps } from '../../../../../../../components/ViewPhotos/OriginalViewPhotos/types';

export type PhotosTabPhotoProps = RenderComponentProps<
	ViewPhotosPhoto & {
		number?: number;
	} & Pick<ViewPhotosProps, 'name'>
>;
