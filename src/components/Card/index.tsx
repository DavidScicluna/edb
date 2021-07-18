import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Box } from '@chakra-ui/react';
import _ from 'lodash';

import { ColorMode } from '../../common/types/types';
import { Theme } from '../../theme/types';
import useStyles from './styles';
import { CardProps } from './types';

const Card = (props: CardProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme, props);

  const { children, colorMode: colorModeProp, variant = 'outlined', ...rest } = _.omit(props, ['color', 'isFullWidth']);

  const mode: ColorMode = colorModeProp || colorMode;

  return (
    <Box {...rest} sx={{ ..._.merge(style.card, style[mode][variant]) }}>
      {children}
    </Box>
  );
};

export default Card;
