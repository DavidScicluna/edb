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

import Tooltip from '../../../../../../components/Tooltip';
import { Theme } from '../../../../../../theme/types';
import NavItemChild from './components/NavItemChild';
import useStyles from './styles';
import { NavItemProps } from './types';

const NavItem = (props: NavItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();

  const { label, path, icon, iconActive, children, isExpanded } = props;

  const isActive: boolean = location.pathname === path;
  const isChildActive: boolean = children ? children.some((child) => location.pathname === child.path) : false;
  const style = useStyles(theme, isActive, isChildActive, isExpanded, children ? isOpen : false);

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [isExpanded]);

  return (
    <VStack
      width='100%'
      spacing={isExpanded ? 2 : 0}
      sx={{ ..._.merge(style.common.container, style[colorMode].container) }}>
      <Tooltip
        aria-label={!isExpanded ? label : ''}
        closeOnClick={false}
        label={!isExpanded ? label : ''}
        placement='right'>
        <Link width='100%' as={RRDLink} to={path} sx={{ ...style.common.link }}>
          <HStack
            width='100%'
            justifyContent='space-between'
            px={isExpanded ? 2 : 1}
            py={1}
            spacing={2}
            onClick={isOpen ? () => onClose() : () => onOpen()}
            // onMouseEnter={!isExpanded ? (isPopperOpen ? () => onPopperClose() : () => onPopperOpen()) : undefined}
            sx={{ ..._.merge(style.common.main, style[colorMode].main) }}>
            <HStack width='100%' spacing={2}>
              <Icon
                as={isActive || isChildActive ? iconActive : icon}
                sx={{ fontSize: `${theme.fontSizes['3xl']} !important` }}
              />
              <ScaleFade in={isExpanded} unmountOnExit>
                <Text align='left' fontSize='lg' fontWeight='semibold' whiteSpace='nowrap'>
                  {label}
                </Text>
              </ScaleFade>
            </HStack>

            {children ? (
              <ScaleFade in={isExpanded} unmountOnExit>
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
            pl={isExpanded ? '31px' : '0px'}
            pr={isExpanded ? 2 : '0px'}
            mb={isExpanded ? 1 : '0px'}>
            {!isExpanded ? (
              <Box width='100%' height='2px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />
            ) : null}
            {children.map((child) => (
              <NavItemChild key={child.label} label={child.label} path={child.path} isExpanded={isExpanded} />
            ))}
          </VStack>
        </Collapse>
      ) : null}
    </VStack>
  );
};

export default NavItem;
