import { DummyIconButtonProps } from '@davidscicluna/component-library';

type Omitted = 'children' | 'aria-label' | 'color' | 'colorMode' | 'onClick';

export type DummyInternationalizationProps = Omit<DummyIconButtonProps, Omitted>;
