import { FontSize } from '@davidscicluna/component-library';

export type RatingSize = Exclude<FontSize, 'xs' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'> & string;
