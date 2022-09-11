import { IconButtonProps } from '@davidscicluna/component-library';

export type ArrowsProps = {
	isLeftDisabled: boolean;
	isRightDisabled: boolean;
	onLeftClick: () => void;
	onRightClick: () => void;
	iconButtonProps?: Omit<IconButtonProps, 'children' | 'aria-label' | 'isDisabled'>;
};
