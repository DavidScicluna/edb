import {
	BoxColor,
	BoxGradient,
	BoxTypography,
	BoxGrid,
	BoxBackground,
	BoxShadow,
	BoxFilter,
	BoxPseudo,
	BoxOther
} from '@davidscicluna/component-library';

import { ImageProps as CUIImageProps } from '@chakra-ui/react';

export type Image = {
	alt: string;
	src: string;
	size: {
		thumbnail: string;
		full: string;
	};
};

export type ImageSrc = {
	boring?: string;
	fallback?: string;
	full: string;
};

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

export type ImageProps = Omit<Image, 'size' | 'src'> & {
	src: ImageSrc;
} & Omit<CUIImageProps, Omitted>;
