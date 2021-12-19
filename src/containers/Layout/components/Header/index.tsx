import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, HStack } from '@chakra-ui/react';

import { Theme } from '../../../../theme/types';
import useTransitionsStyle from '../../common/styles/transitions';
import Menu from './components/Menu';
import User from './components/User';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isLgUp] = useMediaQuery('(min-width: 1280px)');
  const transition = useTransitionsStyle(theme);

  const { width, left } = props;

  return (
    // TODO: Hide user profile on large screen (Move user container within nav with a border) only show on devices with Menu
    <HStack
      width={width}
      maxWidth={width}
      position='fixed'
      top='0px'
      left={left}
      zIndex={800}
      justifyContent={isLgUp ? 'flex-end' : 'space-between'}
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      borderBottom='solid2'
      borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      px={2}
      py={1}
      sx={{ ...transition }}
    >
      {!isLgUp ? <Menu /> : null}

      <User />
    </HStack>
  );
};

export default Header;
