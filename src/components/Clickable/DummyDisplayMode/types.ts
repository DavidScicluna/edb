import { DummyIconButtonProps } from '@davidscicluna/component-library';

export type DummyDisplayModeProps = Omit<DummyIconButtonProps, 'aria-label' | 'children' | 'color' | 'colorMode'>;
