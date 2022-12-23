import { RenderComponentProps } from 'masonic';

import { ViewPhotosPhoto, ViewPhotosProps } from '../../types';

export type PhotosTabPhotoProps = RenderComponentProps<ViewPhotosPhoto & Pick<ViewPhotosProps, 'mediaType' | 'name'>>;
