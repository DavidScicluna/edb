import { LogoStyleProps as AllLogoStyleProps } from '../types';

type Picked = 'theme' | 'isClickable' | 'size';

export type LogoStyleProps = Pick<AllLogoStyleProps, Picked>;
