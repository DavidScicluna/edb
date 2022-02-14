import { SkeletonProps as CUISkeletonProps } from '@chakra-ui/react';

import { Color } from '../../theme/types';

type SkeletonType = 'default' | 'text';

export type SkeletonProps = {
  color?: keyof Color;
  type?: SkeletonType;
} & Omit<
  CUISkeletonProps,
  // Box Props
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
  | 'd'
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
  // CUI Skeleton Props
  | 'colorScheme'
  | 'endColor'
  | 'fadeDuration'
  | 'size'
  | 'speed'
  | 'startColor'
  | 'startColor'
>;
