import { ReactElement, forwardRef } from 'react';

import { ColorMode, useTheme, useColorMode, Box } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { CardRef, CardProps } from './types';

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
    isClickable = false,
    ...rest
  } = props;

  const colorMode: ColorMode = colorModeProp || colorModeHook;

  const style = useStyles(theme, { color, isFullWidth, isLight, isClickable });

  return (
    <Box
      ref={ref}
      sx={{
        ..._.merge(
          style.card.back,
          style[colorMode].back,
          isDisabled ? style.card.disabled : {},
          isDisabled ? style[colorMode].disabled : {}
        )
      }}
    >
      <Box {...rest} className='card_front' sx={{ ..._.merge(style.card.front, style[colorMode].front) }}>
        {children}
      </Box>
    </Box>
  );
});

export default Card;
