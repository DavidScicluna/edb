import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, Tab as CUITab } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../common/hooks';
import { Theme } from '../../../../../../theme/types';
import Badge from '../../../../../Badge';
import useStyles from './styles';
import { TabsProps } from './types';

const Tab = ({ label, badge, isDisabled, isSelected, size = 'md' }: TabsProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const style = useStyles(theme, color, isSelected);

  return (
    <CUITab
      isDisabled={isDisabled}
      isSelected={isSelected}
      px={size === 'sm' ? 1.5 : 2}
      py={size === 'sm' ? 0.75 : 1}
      sx={{ ..._.merge(style.tab, style[colorMode]) }}
      _disabled={{ ...style.disabled }}
    >
      {label}
      {badge ? (
        <Badge color={isSelected ? color : 'gray'} size={isSm || size === 'sm' ? 'sm' : 'md'} ml={1}>
          {badge}
        </Badge>
      ) : null}
    </CUITab>
  );
};

export default Tab;
