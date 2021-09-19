import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Tab as CUITab } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../../../../../../../../theme/types';
import useStyles from './styles';

export type TabProps = {
  label: string;
  isActive?: boolean;
};

const Tab = (props: TabProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { label, isActive = false } = props;

  const style = useStyles(theme, isActive);

  return (
    <CUITab
      p={0}
      sx={{ ..._.merge(style.tab, style[colorMode].tab) }}
      _disabled={{ ..._.merge(style[colorMode].disabled) }}>
      {label}
    </CUITab>
  );
};

export default Tab;
