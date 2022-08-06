import { Color } from '@davidscicluna/component-library';

export type SplashscreenLogoColor = Exclude<Color, 'transparent' | 'black' | 'white'>;
