import { ArrowProps } from './components/Arrow/types';

export type ArrowsProps = {
	isLeftDisabled: boolean;
	isRightDisabled: boolean;
	onLeftClick: () => void;
	onRightClick: () => void;
	arrowProps?: Omit<ArrowProps, 'direction'>;
};
