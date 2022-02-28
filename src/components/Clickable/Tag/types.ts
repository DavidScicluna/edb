import { ReactNode } from 'react';

import { ColorMode, TagProps as CUITagProps } from '@chakra-ui/react';

import { Style } from '../../../common/types';
import { Color } from '../../../theme/types';

export type TagRef = HTMLButtonElement | null;

export type Size = 'sm' | 'md' | 'lg';

export type Variant = 'contained' | 'outlined' | 'text';

export type RenderProps = {
	color?: keyof Color;
	colorMode?: ColorMode;
	width?: string;
	height?: string;
	fontSize?: string;
};

export type TagProps = {
	color?: keyof Color;
	colorMode?: ColorMode;
	renderLeft?: (props: RenderProps) => ReactNode;
	renderRight?: (props: RenderProps) => ReactNode;
	isClickable?: boolean;
	isDisabled?: boolean;
	isFullWidth?: boolean;
	onDelete?: () => void;
	size?: Size;
	variant?: Variant;
	sx?: Style;
} & Omit<
	CUITagProps,
	// Box Props
	| 'as'
	| 'p'
	| 'pt'
	| 'pr'
	| 'pe'
	| 'pb'
	| 'pl'
	| 'ps'
	| 'px'
	| 'py'
	| 'padding'
	| 'paddingTop'
	| 'paddingRight'
	| 'paddingEnd'
	| 'paddingBottom'
	| 'paddingLeft'
	| 'paddingStart'
	| 'color'
	| 'bg'
	| 'background'
	| 'backgroundColor'
	| 'bgColor'
	| 'opacity'
	| 'bgGradient'
	| 'bgClip'
	| 'backgroundClip'
	| 'fontFamily'
	| 'fontSize'
	| 'fontWeight'
	| 'lineHeight'
	| 'letterSpacing'
	| 'textAlign'
	| 'fontStyle'
	| 'textTransform'
	| 'textDecoration'
	| 'w'
	| 'h'
	| 'minW'
	| 'maxW'
	| 'minH'
	| 'maxH'
	| 'd'
	| 'width'
	| 'height'
	| 'minWidth'
	| 'maxWidth'
	| 'minHeight'
	| 'maxHeight'
	| 'display'
	| 'boxSize'
	| 'verticalAlign'
	| 'overflow'
	| 'overflowX'
	| 'overflowY'
	| 'alignItems'
	| 'align'
	| 'alignContent'
	| 'justifyItems'
	| 'justifyContent'
	| 'justify'
	| 'flexWrap'
	| 'wrap'
	| 'flexDirection'
	| 'flexDir'
	| 'direction'
	| 'flex'
	| 'flexGrow'
	| 'flexShrink'
	| 'flexBasis'
	| 'justifySelf'
	| 'alignSelf'
	| 'order'
	| 'gridGap'
	| 'gap'
	| 'gridRowGap'
	| 'rowGap'
	| 'gridColumnGap'
	| 'columnGap'
	| 'gridColumn'
	| 'column'
	| 'gridRow'
	| 'row'
	| 'gridArea'
	| 'area'
	| 'gridAutoFlow'
	| 'autoFlow'
	| 'gridAutoRows'
	| 'autoRows'
	| 'gridAutoColumns'
	| 'autoColumns'
	| 'gridTemplateRows'
	| 'templateRows'
	| 'gridTemplateColumns'
	| 'templateColumns'
	| 'gridTemplateAreas'
	| 'templateAreas'
	| 'bg'
	| 'background'
	| 'bgImage'
	| 'backgroundImage'
	| 'bgSize'
	| 'backgroundSize'
	| 'bgPosition'
	| 'backgroundPosition'
	| 'bgRepeat'
	| 'backgroundRepeat'
	| 'bgAttachment'
	| 'backgroundAttachment'
	| 'border'
	| 'borderWidth'
	| 'borderStyle'
	| 'borderColor'
	| 'borderTop'
	| 'borderTopWidth'
	| 'borderTopStyle'
	| 'borderTopColor'
	| 'borderRight'
	| 'borderEnd'
	| 'borderRightWidth'
	| 'borderEndWidth'
	| 'borderRightStyle'
	| 'borderEndStyle'
	| 'borderRightColor'
	| 'borderEndColor'
	| 'borderBottom'
	| 'borderBottomWidth'
	| 'borderBottomStyle'
	| 'borderBottomColor'
	| 'borderLeft'
	| 'borderStart'
	| 'borderLeftWidth'
	| 'borderStartWidth'
	| 'borderLeftStyle'
	| 'borderStartStyle'
	| 'borderLeftColor'
	| 'borderStartColor'
	| 'borderX'
	| 'borderY'
	| 'borderRadius'
	| 'borderTopLeftRadius'
	| 'borderTopStartRadius'
	| 'borderTopRightRadius'
	| 'borderTopEndRadius'
	| 'borderBottomRightRadius'
	| 'borderBottomEndRadius'
	| 'borderBottomLeftRadius'
	| 'borderBottomStartRadius'
	| 'borderTopRadius'
	| 'borderRightRadius'
	| 'borderEndRadius'
	| 'borderBottomRadius'
	| 'borderLeftRadius'
	| 'borderStartRadius'
	| 'pos'
	| 'position'
	| 'zIndex'
	| 'top'
	| 'right'
	| 'bottom'
	| 'left'
	| 'filter'
	| 'blur'
	| 'brightness'
	| 'contrast'
	| 'hueRotate'
	| 'invert'
	| 'saturate'
	| 'dropShadow'
	| 'backdropFilter'
	| 'backdropBlur'
	| 'backdropBrightness'
	| 'backdropContrast'
	| 'backdropHueRotate'
	| 'backdropInvert'
	| 'backdropSaturate'
	| 'animation'
	| 'appearance'
	| 'transform'
	| 'transformOrigin'
	| 'visibility'
	| 'whiteSpace'
	| 'userSelect'
	| 'pointerEvents'
	| 'wordBreak'
	| 'overflowWrap'
	| 'textOverflow'
	| 'boxSizing'
	| 'cursor'
	| 'resize'
	| 'transition'
	| 'objectFit'
	| 'objectPosition'
	| 'float'
	| 'fill'
	| 'stroke'
	| 'outline'
	// CUI Tag Props
	| 'color'
	| 'colorScheme'
	| 'size'
	| 'variant'
	| 'sx'
>;
