import { ModalProps } from '../../../../../../../../../components/Modal/types';
import { CropperProps } from '../../types';
import { GridProps } from '../Grid/types';
import { RotateProps } from '../Rotate/types';
import { ZoomProps } from '../Zoom/types';

export type ActionsProps = Omit<CropperProps, 'color' | 'type' | 'image' | 'isOpen' | 'onCrop'> & {
	renderActions: ModalProps['renderActions'];
} & RotateProps &
	GridProps &
	ZoomProps;
