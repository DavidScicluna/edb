import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, Tab as CUITab } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../common/hooks';
import { handleReturnColor } from '../../../../../../common/utils';
import Badge from '../../../../../../components/Badge';
import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { TabsProps } from './types';

const Tab = ({ label, badge, isDisabled, isSelected }: TabsProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const style = useStyles(theme, color, isSelected);

  return (
    <CUITab
      isDisabled={isDisabled}
      isSelected={isSelected}
      sx={{ ..._.merge(style.tab, style[colorMode]) }}
      _disabled={{ ...style.disabled }}>
      {label}
      {badge ? (
        <Badge color={isSelected ? handleReturnColor(color) : 'gray'} label={badge} size={isSm ? 'sm' : 'md'} ml={1} />
      ) : null}
    </CUITab>
  );
};

export default Tab;
