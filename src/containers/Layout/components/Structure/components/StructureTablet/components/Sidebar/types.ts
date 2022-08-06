import { StructureCommonProps } from '../../../../common/types';

export type SidebarProps = StructureCommonProps & {
	isOpen?: boolean;
	onClose: () => void;
};
