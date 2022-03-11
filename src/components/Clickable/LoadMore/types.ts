import { ButtonProps } from '../Button/types';

export type LoadMoreProps = {
	amount: number;
	total: number;
	label: string;
	color: ButtonProps['color'];
	isLoading?: boolean;
	isButtonVisible?: boolean;
	onClick: () => void;
	buttonProps?: Omit<ButtonProps, 'color' | 'isLoading' | 'isFullWidth' | 'onClick'>;
};
