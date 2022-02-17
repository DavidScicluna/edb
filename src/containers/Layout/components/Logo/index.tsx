
import { ReactElement } from 'react';

import { useTheme, useColorMode, Center } from '@chakra-ui/react';

import _ from 'lodash';

import useStyles from './styles';
import { Size } from './types';

import { useSelector } from '../../../../common/hooks';
import { Theme } from '../../../../theme/types';

const Logo = ({ size = 'md' }: { size?: Size }): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const style = useStyles(theme, color, size);

  return <Center sx={{ ..._.merge(style.common, style[colorMode]) }}>edb</Center>;
};

export default Logo;
