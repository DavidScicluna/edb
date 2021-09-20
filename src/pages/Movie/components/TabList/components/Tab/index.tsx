import React, { ReactElement } from 'react';

import { useTheme, Tab as CUITab, useColorMode } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../common/hooks';
import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { TabsProps } from './types';

const Tab = ({ label, isDisabled, isSelected }: TabsProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const style = useStyles(theme, color, isSelected);

  return (
    <CUITab
      isDisabled={isDisabled}
      isSelected={isSelected}
      sx={{ ..._.merge(style.tab, style[colorMode]) }}
      _disabled={{ ...style.disabled }}>
      {label}
    </CUITab>
  );
};

export default Tab;
