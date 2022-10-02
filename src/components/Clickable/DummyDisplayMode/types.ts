import { DummyButtonProps } from '@davidscicluna/component-library';

export type DummyDisplayModeProps = Omit<DummyButtonProps, 'children' | 'color' | 'colorMode'>;
