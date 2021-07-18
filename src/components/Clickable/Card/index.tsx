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
    variant = 'outlined',
    ...rest
  } = _.omit(props, ['color', 'isFullWidth', 'isLightGray']);

  const mode: ColorMode = colorModeProp || colorMode;

  return (
    <Box
      sx={
        isDisabled
          ? {
              ..._.merge(style.card.back, style.card.disabled, style[mode].back[variant], style[mode].disabled[variant])
            }
          : { ..._.merge(style.card.back, style[mode].back[variant]) }
      }>
      <Box {...rest} className='card_front' sx={{ ..._.merge(style.card.front, style[mode].front[variant]) }}>
        {children}
      </Box>
    </Box>
  );
};

export default Card;
