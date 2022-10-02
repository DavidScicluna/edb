import { DummyButtonProps, Space } from '@davidscicluna/component-library';

export type DummyLoadMoreProps = Omit<DummyButtonProps, 'color' | 'colorMode' | 'isFullWidth'> & {
	isButtonVisible?: boolean;
	spacing?: Space;
};
