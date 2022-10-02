import { ButtonProps, Space } from '@davidscicluna/component-library';

export type LoadMoreProps = Omit<ButtonProps, 'color' | 'colorMode' | 'isFullWidth' | 'onClick'> & {
	amount: number;
	total: number;
	label: string;
	isButtonVisible?: boolean;
	onClick?: () => void;
	spacing?: Space;
};
