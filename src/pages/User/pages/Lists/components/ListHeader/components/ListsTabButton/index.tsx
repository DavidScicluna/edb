import React from 'react';

import { useTheme, useColorMode, Box, HStack, Center } from '@chakra-ui/react';

import { GridOnTwoTone as GridOnTwoToneIcon, GridOnOutlined as GridOnOutlinedIcon } from '@material-ui/icons';
import _ from 'lodash';

import { ListsTabButtonProps } from './types';

import { useSelector } from '../../../../../../../../common/hooks';
import {
  handleReturnSpacing,
  handleReturnIconSize
} from '../../../../../../../../components/Tabs/components/TabList/components/Tab';
import useStyles from '../../../../../../../../components/Tabs/components/TabList/components/Tab/styles';
import { Size } from '../../../../../../../../components/Tabs/components/TabList/components/Tab/types';
import { Theme } from '../../../../../../../../theme/types';

const ListsTabButton = ({ isDisabled = false, isSelected = false, onClick }: ListsTabButtonProps) => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const style = useStyles(theme, { color, isFullWidth: false, isOnlyTab: false, isSelected });
  const size: Size = 'lg';

  const iconSize = `${handleReturnIconSize(size, theme)}px`;

  return (
    <Box
      aria-disabled={isDisabled}
      onClick={!isSelected ? () => onClick() : undefined}
      sx={{ ..._.merge(style.tab.default, style.tab[size], style[colorMode]) }}
      _disabled={{ ..._.merge(style.disabled) }}
    >
      <HStack width='100%' alignItems='inherit' justifyContent='inherit' spacing={handleReturnSpacing(size)}>
        {isSelected ? (
          <GridOnTwoToneIcon style={{ fontSize: iconSize }} />
        ) : (
          <GridOnOutlinedIcon style={{ fontSize: iconSize }} />
        )}
        <Center>Lists</Center>
      </HStack>
    </Box>
  );
};

export default ListsTabButton;
