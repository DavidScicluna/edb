import {
	BoxColor,
	BoxGradient,
	BoxTypography,
	BoxGrid,
	BoxBackground,
	BoxShadow,
	BoxFilter,
	BoxPseudo,
	BoxOther,
	Undefinable
} from '@davidscicluna/component-library';

import { ImageProps as CUIImageProps } from '@chakra-ui/react';

export type ImageSrcMode = 'boring' | 'thumbnail' | 'full';

type Omitted =
	// CUI Box Props
	| BoxColor
	| BoxGradient
	| BoxTypography
	| BoxGrid
	| BoxBackground
	| BoxShadow
	| BoxFilter
	| BoxPseudo
	| BoxOther
	// CUI Image Props
	| 'as'
	| 'alt'
	| 'align'
	| 'crossOrigin'
	| 'fallback'
	| 'fallbackSrc'
	| 'fallbackStrategy'
	| 'htmlHeight'
	| 'htmlWidth'
	| 'ignoreFallback'
	| 'loading'
	| 'sizes'
	| 'src'
	| 'srcSet';

export type ImageProps = Omit<CUIImageProps, Omitted> & {
	alt: string;
	src: Partial<Record<ImageSrcMode, Undefinable<string>>>;
};
