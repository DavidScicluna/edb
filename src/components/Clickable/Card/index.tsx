import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Box } from '@chakra-ui/react';
import _ from 'lodash';

import { ColorMode } from '../../../common/types/types';
import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { CardProps } from './types';

const Card = (props: CardProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme, props);

  const {
    children,
    colorMode: colorModeProp,
    isDisabled = false,
    ...rest
  } = _.omit(props, ['color', 'isFullWidth', 'isLight', 'isClickable']);

  const mode: ColorMode = colorModeProp || colorMode;

  return (
    <Box
      sx={
        isDisabled
          ? {
              ..._.merge(style.card.back, style.card.disabled, style[mode].back, style[mode].disabled)
            }
          : { ..._.merge(style.card.back, style[mode].back) }
      }>
      <Box {...rest} className='card_front' sx={{ ..._.merge(style.card.front, style[mode].front) }}>
        {children}
      </Box>
    </Box>
  );
};

export default Card;
