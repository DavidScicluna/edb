import React, { ReactElement } from 'react';

import { useTheme, useColorMode, VStack } from '@chakra-ui/react';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';

import Button from '../../../../components/Inputs/Button';
import { Theme } from '../../../../theme/types';
import navItems from '../../common/data/navItems';
import useTransitionsStyle from '../../common/styles/transitions';
import Nav from '../NavItems';
import { NavigationProps } from './types';

const Navigation = (props: NavigationProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const transition = useTransitionsStyle(theme);

  const { width, isExpanded, handleNavigationWidth } = props;

  return (
    <VStack
      width={width}
      height='100vh'
      position='fixed'
      top='0px'
      left='0px'
      zIndex={900}
      alignItems={isExpanded ? 'flex-start' : 'stretch'}
      justifyContent='space-between'
      background={colorMode ? 'white' : 'gray.900'}
      borderRight='solid2'
      borderRightColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p={1}
      spacing={2}
      sx={{ ...transition }}>
      <Nav navItems={navItems} isExpanded={isExpanded} />

      <Button
        isFullWidth
        onClick={() => handleNavigationWidth()}
        leftIcon={isExpanded ? RemoveOutlinedIcon : AddOutlinedIcon}
        size='sm'
        variant='outlined'>
        {isExpanded ? 'Collapse' : ''}
      </Button>
    </VStack>
  );
};

export default Navigation;
