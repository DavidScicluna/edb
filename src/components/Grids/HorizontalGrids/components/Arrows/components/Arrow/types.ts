import { IconButtonProps } from '@davidscicluna/component-library';

export type Direction = 'left' | 'right';

export type ArrowProps = Omit<IconButtonProps, 'children' | 'aria-label'> & {
	direction: Direction;
};
