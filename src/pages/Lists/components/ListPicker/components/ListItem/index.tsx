import React, { ReactElement } from 'react';

import { useTheme, useColorMode, VStack, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { ListItemProps } from './types';

const ListItem = (props: ListItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { id, label, results, isActive = false, onClick } = props;

  const style = useStyles(theme, isActive);

  const movies = results.filter((result) => result.mediaType === 'movie').length;
  const tv = results.filter((result) => result.mediaType === 'tv').length;

  return (
    <VStack
      sx={{ ..._.merge(style.common.container, style[colorMode].container) }}
      spacing={0}
      onClick={!isActive && onClick ? () => onClick(id) : undefined}>
      <Text sx={{ ..._.merge(style.common.text.primary, style[colorMode].text.primary) }}>{label}</Text>
      <Text sx={{ ..._.merge(style.common.text.secondary, style[colorMode].text.secondary) }}>
        {`${[
          `${movies} movie${movies === 0 || movies > 1 ? 's' : ''}`,
          `${tv} TV show${tv === 0 || tv > 1 ? 's' : ''}`
        ].join(' • ')}`}
      </Text>
    </VStack>
  );
};

export default ListItem;
