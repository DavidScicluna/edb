import { ButtonProps } from '@davidscicluna/component-library';

export type Variant = 'contained' | 'text';

export type DayProps = {
	variant?: Variant;
} & Omit<ButtonProps, 'renderLeftIcon' | 'renderRightIcon' | 'isFullWidth' | 'isLoading' | 'size' | 'variant' | 'sx'>;
