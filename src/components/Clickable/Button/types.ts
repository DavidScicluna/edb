import { ColorMode, ButtonProps as CUIButtonProps } from '@chakra-ui/react';

import { Icon, Style } from '../../../common/types';
import { Color } from '../../../theme/types';

export type ButtonRef = HTMLButtonElement | null;

export type Size = 'sm' | 'md' | 'lg';

export type Variant = 'contained' | 'outlined' | 'text';

export type IconProps = {
	width?: string;
	height?: string;
	fontSize?: string;
};

export type ButtonProps = {
	color?: keyof Color;
	colorMode?: ColorMode;
	renderLeftIcon?: (props: IconProps) => Icon;
	renderRightIcon?: (props: IconProps) => Icon;
	size?: Size;
	variant?: Variant;
	sx?: { back?: Style; front?: Style };
} & Omit<
	CUIButtonProps,
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
	// CUI Button Props
	| 'color'
	| 'colorScheme'
	| 'iconSpacing'
	| 'leftIcon'
	| 'rightIcon'
	| 'isActive'
	| 'isRound'
	| 'spinner'
	| 'spinnerPlacement'
	| 'size'
	| 'variant'
	| 'sx'
>;
