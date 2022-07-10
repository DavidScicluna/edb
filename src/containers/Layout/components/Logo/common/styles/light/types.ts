import { LogoStyleProps } from '../types';

type Picked = 'theme' | 'color' | 'size';

export type LogoLightStylingProps = Pick<LogoStyleProps, Picked>;
