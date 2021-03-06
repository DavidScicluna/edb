import React, { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, HStack, Fade } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { Breadcrumb as BreadcrumbType } from '../../../../common/types/types';
import { Theme } from '../../../../theme/types';
import useTransitionsStyle from '../../common/styles/transitions';
import Breadcrumb from './components/Breadcrumb';
import Menu from './components/Menu';
import Search from './components/Search';
import User from './components/User';

type HeaderProps = { width: string; left: string; breadcrumbs: BreadcrumbType[] };

const Header = (props: HeaderProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isMdUp] = useMediaQuery('(min-width: 600px)');
  const [isLgDown] = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);
  const transition = useTransitionsStyle(theme);

  const location = useLocation();

  const { width, left, breadcrumbs } = props;

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
      <HStack spacing={1}>
        {isLgDown ? <Menu /> : null}
        {isMdUp ? <Breadcrumb breadcrumbs={breadcrumbs} /> : null}
      </HStack>
      <HStack spacing={1}>
        <Fade in={!location.pathname.includes('search')}>
          <Search />
        </Fade>
        <User />
      </HStack>
    </HStack>
  );
};

export default Header;
