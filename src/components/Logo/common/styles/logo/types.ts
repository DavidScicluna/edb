import { LogoStyleProps as AllLogoStyleProps } from '../types';

type Picked = 'theme' | 'isClickable' | 'isSquare' | 'size';

export type LogoStyleProps = Pick<AllLogoStyleProps, Picked>;
