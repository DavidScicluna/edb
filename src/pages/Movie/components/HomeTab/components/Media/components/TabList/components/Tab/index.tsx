import { ReactElement } from 'react';

import { useTheme, useColorMode, Tab as CUITab } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../../../../../common/hooks';
import { Theme } from '../../../../../../../../../../theme/types';
import useStyles from './styles';
import { TabProps } from './types';

const Tab = ({ label, isSelected = false, isDisabled = false }: TabProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const style = useStyles(theme, color, isSelected);

  return (
    <CUITab
      px={1.5}
      py={0.75}
      isSelected={isSelected}
      isDisabled={isDisabled}
      sx={{ ..._.merge(style.tab, style[colorMode]) }}
      _disabled={{ ...style.disabled }}>
      {label}
    </CUITab>
  );
};

export default Tab;
