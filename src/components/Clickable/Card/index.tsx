import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Box } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { CardProps } from './types';

const Card = (props: CardProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme, props);

  const { children, isDisabled = false, variant = 'outlined', ...rest } = props;

  return (
    <Box
      sx={
        isDisabled
          ? {
              ..._.merge(
                style.card.back,
                style.card.disabled,
                style[colorMode].back[variant],
                style[colorMode].disabled[variant]
              )
            }
          : { ..._.merge(style.card.back, style[colorMode].back[variant]) }
      }>
      <Box {...rest} className='card_front' sx={{ ..._.merge(style.card.front, style[colorMode].front[variant]) }}>
        {children}
      </Box>
    </Box>
  );
};

export default Card;
