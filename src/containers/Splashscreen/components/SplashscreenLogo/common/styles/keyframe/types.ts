import { SplashscreenLogoStyleProps as AllSplashscreenLogoStyleProps } from '../types';

type Picked = 'theme' | 'color' | 'colors' | 'colorMode' | 'size';

export type SplashscreenLogoKeyframeStyleProps = Pick<AllSplashscreenLogoStyleProps, Picked>;
