import { DummyIconButtonProps } from '@davidscicluna/component-library';

export type Direction = 'left' | 'right';

export type DummyArrowProps = Omit<DummyIconButtonProps, 'children' | 'aria-label'> & {
	direction: Direction;
};
