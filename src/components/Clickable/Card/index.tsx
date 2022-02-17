
import { ReactElement, forwardRef } from 'react';

import { ColorMode, useTheme, useColorMode, Box } from '@chakra-ui/react';

import _ from 'lodash';

import useStyles from './styles';
import { CardRef, CardProps } from './types';

import { Theme } from '../../../theme/types';

const Card = forwardRef<CardRef, CardProps>(function Card(props, ref): ReactElement {
  const theme = useTheme<Theme>();
  const { colorMode: colorModeHook } = useColorMode();

  const {
    children,
    color = 'gray',
    colorMode: colorModeProp,
    isFullWidth = false,
    isLight = false,
    isDisabled = false,
    isFixed: isFixedProp = false,
    isClickable = false,
    sx,
    ...rest
  } = props;

  const colorMode: ColorMode = colorModeProp || colorModeHook;
  const isFixed: boolean = isFixedProp || !isClickable;

  const style = useStyles(theme, { color, isFullWidth, isLight, isClickable, isFixed });

  return (
    <Box
      ref={ref}
      aria-disabled={isDisabled}
      sx={{ ..._.merge(style.card.back, style[colorMode].back, sx?.back || {}) }}
      _disabled={{ ..._.merge(style.card.disabled, style[colorMode].disabled) }}
    >
      <Box
        {...rest}
        className='card_front'
        sx={{ ..._.merge(style.card.front, style[colorMode].front, sx?.front || {}) }}
      >
        {children}
      </Box>
    </Box>
  );
});

export default Card;
