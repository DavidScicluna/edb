import React, { ReactElement } from 'react';

import { useTheme, useColorMode, HStack, Icon, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../../../../../../../theme/types';
import useStyles from './styles';
import { BackgroundItemProps } from './types';

const BackgroundItem = (props: BackgroundItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { label, value, icon, color, isActive = false, onClick } = props;

  const style = useStyles(theme, color, isActive);

  return (
    <HStack
      sx={{ ..._.merge(style.common.container, style[colorMode].container) }}
      spacing={0}
      onClick={!isActive && onClick ? () => onClick(value) : undefined}>
      <Icon as={icon} sx={{ ..._.merge(style.common.icon, style[colorMode].icon) }} />
      <Text sx={{ ..._.merge(style.common.text, style[colorMode].text) }}>{label}</Text>
    </HStack>
  );
};

export default BackgroundItem;
