import { LogoStyleProps } from '../types';

type Picked = 'theme' | 'color' | 'size';

export type LogoDarkStylingProps = Pick<LogoStyleProps, Picked>;
