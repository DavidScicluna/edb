import React, { ReactElement } from 'react';

import { useTheme, useColorMode, HStack, VStack, Text, Icon } from '@chakra-ui/react';
import {
  CheckBoxTwoTone as CheckBoxTwoToneIcon,
  CheckBoxOutlineBlankOutlined as CheckBoxOutlineBlankOutlinedIcon
} from '@material-ui/icons';
import _ from 'lodash';
import moment from 'moment';

import { Theme } from '../../../../../../../theme/types';
import useStyles from './styles';
import { ListProps } from './types';

const List = ({ id, label, description, date, results, isSelected = false, onClick }: ListProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme, isSelected);

  return (
    <HStack
      justifyContent='space-between'
      spacing={2}
      px={2}
      py={1}
      sx={{ ..._.merge(style.common.container, style[colorMode].container) }}
      onClick={() => onClick(id, isSelected)}>
      <VStack alignItems='flex-start' spacing={0}>
        <Text sx={{ ..._.merge(style.common.text.primary, style[colorMode].text.primary) }}>{label}</Text>
        {description && description.length > 0 ? (
          <Text sx={{ ..._.merge(style.common.text.secondary, style[colorMode].text.secondary) }}>{description}</Text>
        ) : null}
        <Text sx={{ ..._.merge(style.common.text.secondary, style[colorMode].text.secondary) }}>
          {`${results.length > 0 ? `${results.length} items  • ` : ''}${
            results.length > 0 ? 'Updated' : 'Created'
          } ${moment(date).fromNow()}`}
        </Text>
      </VStack>

      <Icon
        as={isSelected ? CheckBoxTwoToneIcon : CheckBoxOutlineBlankOutlinedIcon}
        sx={{ ..._.merge(style.common.icon, style[colorMode].icon) }}
      />
    </HStack>
  );
};

export default List;
