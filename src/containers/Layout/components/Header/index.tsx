import React, { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, HStack, ScaleFade } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { Theme } from '../../../../theme/types';
import useTransitionsStyle from '../../common/styles/transitions';
import Menu from './components/Menu';
import Search from './components/Search';
import User from './components/User';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isLgUp] = useMediaQuery('(min-width: 1280px)');
  const transition = useTransitionsStyle(theme);

  const location = useLocation();

  const { width, left } = props;

  return (
    <HStack
      width={width}
      maxWidth={width}
      position='fixed'
      top='0px'
      left={left}
      zIndex={800}
      justifyContent='space-between'
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      borderBottom='solid2'
      borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      px={2}
      py={1}
      sx={{ ...transition }}>
      {!isLgUp ? <Menu /> : null}
      <HStack spacing={1}>
        <ScaleFade in={!location.pathname.includes('search')}>
          <Search />
        </ScaleFade>
        <User />
      </HStack>
    </HStack>
  );
};

export default Header;
