import React, { ReactElement, useEffect } from 'react';

import {
  useTheme,
  useColorMode,
  useDisclosure,
  VStack,
  HStack,
  Collapse,
  Icon,
  Text,
  Link,
  Box,
  ScaleFade
} from '@chakra-ui/react';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import _ from 'lodash';
import { useLocation, Link as RRDLink } from 'react-router-dom';

import useSelector from '../../../../../../common/hooks/useSelectorTyped';
import Tooltip from '../../../../../../components/Tooltip';
import { Theme } from '../../../../../../theme/types';
import { NavItem as NavItemType } from '../../types';
import NavItemChild from './components/NavItemChild';
import useStyles from './styles';

const NavItem = (props: NavItemType): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();

  const sidebarMode = useSelector((state) => state.app.data.sidebarMode);

  const { label, path, icon, iconActive, children } = props;

  const isActive: boolean = location.pathname === path;
  const isChildActive: boolean = children ? children.some((child) => location.pathname === child.path) : false;
  const style = useStyles(theme, isActive, isChildActive, sidebarMode === 'expanded', children ? isOpen : false);

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [sidebarMode]);

  return (
    <VStack
      width='100%'
      spacing={sidebarMode === 'expanded' ? 2 : 0}
      sx={{ ..._.merge(style.common.container, style[colorMode].container) }}>
      <Tooltip
        aria-label={sidebarMode === 'collapsed' ? label : ''}
        closeOnClick={false}
        label={sidebarMode === 'collapsed' ? label : ''}
        placement='right'>
        <Link width='100%' as={RRDLink} to={path} sx={{ ...style.common.link }}>
          <HStack
            width='100%'
            justifyContent='space-between'
            px={sidebarMode === 'expanded' ? 2 : 1}
            py={1}
            spacing={2}
            onClick={isOpen ? () => onClose() : () => onOpen()}
            sx={{ ..._.merge(style.common.main, style[colorMode].main) }}>
            <HStack width='100%' spacing={2}>
              <Icon
                as={isActive || isChildActive ? iconActive : icon}
                sx={{ fontSize: `${theme.fontSizes['3xl']} !important` }}
              />
              <ScaleFade in={sidebarMode === 'expanded'} unmountOnExit>
                <Text align='left' fontSize='lg' fontWeight='semibold' whiteSpace='nowrap'>
                  {label}
                </Text>
              </ScaleFade>
            </HStack>

            {children ? (
              <ScaleFade in={sidebarMode === 'expanded'} unmountOnExit>
                <Icon
                  as={ChevronRightOutlinedIcon}
                  sx={{
                    fontSize: `${theme.fontSizes['2xl']} !important`,
                    transform: `rotate(${isOpen ? '90deg' : '0deg'})`
                  }}
                />
              </ScaleFade>
            ) : null}
          </HStack>
        </Link>
      </Tooltip>

      {children ? (
        <Collapse in={isOpen} unmountOnExit style={{ width: '100%' }}>
          <VStack
            width='100%'
            spacing={0}
            pl={sidebarMode === 'expanded' ? '31px' : '0px'}
            pr={sidebarMode === 'expanded' ? 2 : '0px'}
            mb={sidebarMode === 'expanded' ? 1 : '0px'}>
            {sidebarMode === 'collapsed' ? (
              <Box width='100%' height='2px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />
            ) : null}
            {children.map((child, index) => (
              <NavItemChild
                key={child.label}
                label={child.label}
                path={child.path}
                isLastChild={index === children.length - 1}
              />
            ))}
          </VStack>
        </Collapse>
      ) : null}
    </VStack>
  );
};

export default NavItem;
