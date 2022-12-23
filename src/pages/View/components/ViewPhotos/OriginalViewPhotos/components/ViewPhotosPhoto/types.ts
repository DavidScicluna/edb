import { Image } from '../../../../../../../common/types';
import { ViewPhotosOrientation } from '../../../common/types';
import { ViewPhotosProps } from '../../types';

export type PhotosTabPhotoProps = Image & {
	index: number;
	orientation: ViewPhotosOrientation;
} & Pick<ViewPhotosProps, 'mediaType' | 'name'>;
