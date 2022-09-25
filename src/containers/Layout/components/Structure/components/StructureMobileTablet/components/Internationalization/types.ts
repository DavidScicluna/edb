import { IconButtonProps } from '@davidscicluna/component-library';

type Omitted = 'children' | 'aria-label' | 'color' | 'colorMode' | 'onClick';

export type InternationalizationProps = Omit<IconButtonProps, Omitted>;
