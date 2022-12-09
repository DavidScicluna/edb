import { LayoutDeviceType } from '../../../../types';
import { StructureProps } from '../../types';

export type StructureMobileTabletProps = StructureProps & {
	device: LayoutDeviceType;
};
