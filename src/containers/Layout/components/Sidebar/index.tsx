import { ReactElement } from 'react';

import { useTheme, useColorMode, VStack } from '@chakra-ui/react';
import { Plus as PlusIcon, Minus as MinusIcon } from 'react-feather';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../../components/Clickable/Button';
import { toggleSidebarMode } from '../../../../store/slices/App';
import { Theme } from '../../../../theme/types';
import navItems from '../../common/data/navItems';
import useTransitionsStyle from '../../common/styles/transitions';
import NavItems from '../NavItems';
import { SidebarProps } from './types';

const Sidebar = ({ width }: SidebarProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const transition = useTransitionsStyle(theme);

  const dispatch = useDispatch();
  const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

  return (
    <VStack
      width={width}
      height='100vh'
      position='fixed'
      top='0px'
      left='0px'
      zIndex={900}
      alignItems={sidebarMode === 'expanded' ? 'flex-start' : 'stretch'}
      justifyContent='space-between'
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      borderRight='solid2'
      borderRightColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p={1}
      spacing={2}
      sx={{ ...transition }}
    >
      <NavItems navItems={navItems} />

      <Button
        isFullWidth
        onClick={() => dispatch(toggleSidebarMode(sidebarMode === 'expanded' ? 'collapsed' : 'expanded'))}
        leftIcon={sidebarMode === 'expanded' ? MinusIcon : PlusIcon}
        variant='outlined'
      >
        {sidebarMode === 'expanded' ? 'Collapse' : ''}
      </Button>
    </VStack>
  );
};

export default Sidebar;
