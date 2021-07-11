import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Box } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../theme/types';
import useStyles from './styles';
import { CardProps } from './types';

const Card = (props: CardProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme, props);

  const { children, variant = 'outlined', ...rest } = props;

  return (
    <Box {...rest} sx={{ ..._.merge(style.card, style[colorMode][variant]) }}>
      {children}
    </Box>
  );
};

export default Card;
