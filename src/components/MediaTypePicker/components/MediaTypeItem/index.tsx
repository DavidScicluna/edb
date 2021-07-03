import React, { ReactElement } from 'react';

import { useTheme, useColorMode, VStack, Icon, Text } from '@chakra-ui/react';
import _ from 'lodash';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { Theme } from '../../../../theme/types';
import useStyles from './styles';
import { MediaTypeItemProps } from './types';

const MediaTypeItem = (props: MediaTypeItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { label, value, iconActive, icon, isActive = false, onClick } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  const style = useStyles(theme, color, isActive);

  return (
    <VStack
      sx={{ ..._.merge(style.common.container, style[colorMode].container) }}
      spacing={0}
      onClick={!isActive ? () => onClick(value) : undefined}>
      <Icon as={isActive ? iconActive : icon} sx={{ ..._.merge(style.common.icon, style[colorMode].icon) }} />
      <Text sx={{ ..._.merge(style.common.text, style[colorMode].text) }}>{label}</Text>
    </VStack>
  );
};

export default MediaTypeItem;
