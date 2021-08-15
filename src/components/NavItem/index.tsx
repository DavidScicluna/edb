import React, { ReactElement, useEffect } from 'react';

import {
  useTheme,
  useColorMode,
  useDisclosure,
  useBoolean,
  VStack,
  HStack,
  Collapse,
  Icon,
  Text,
  Link as CUILink,
  Box,
  ScaleFade
} from '@chakra-ui/react';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';

import useSelector from '../../common/hooks/useSelectorTyped';
import utils from '../../common/utils/utils';
import Link from '../../components/Clickable/Link';
import { Theme } from '../../theme/types';
import Tooltip from '../Tooltip';
import NavItemChild from './components/NavItemChild';
import useStyles from './styles';
import { NavItem as NavItemType } from './types';

const NavItem = (props: NavItemType): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { children, label, path, icon, iconActive, sidebarMode, onClick } = props;

  const [isHovering, setIsHovering] = useBoolean();

  const isActive: boolean = location.pathname === path;
  const isChildActive: boolean = children ? children.some((child) => location.pathname === child.path) : false;

  const renderChildren: boolean = children ? children.every((child) => child.renderChild) : false;

  const style = useStyles(
    theme,
    color,
    isActive,
    isChildActive,
    renderChildren,
    sidebarMode === 'expanded',
    children ? isOpen : false
  );

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [sidebarMode]);

  return (
    <VStack
      width='100%'
      spacing={sidebarMode === 'expanded' ? 2 : 0}
      sx={{ ..._.merge(style.common.container, style[colorMode].container) }}
      onClick={onClick ? () => onClick() : undefined}>
      <Tooltip
        aria-label={sidebarMode === 'collapsed' ? label : ''}
        width='100%'
        label={sidebarMode === 'collapsed' ? label : ''}
        placement='right'
        gutter={16}
        span>
        <CUILink
          width='100%'
          as={Link}
          to={{ pathname: path || '' }}
          isDisabled={!path || isHovering}
          sx={{ ...style.common.link }}>
          <HStack
            width='100%'
            justifyContent='space-between'
            px={sidebarMode === 'expanded' ? 2 : 1}
            py={1}
            spacing={2}
            onClick={!isOpen ? () => onOpen() : undefined}
            sx={{ ..._.merge(style.common.main, style[colorMode].main) }}>
            <HStack width='100%' spacing={2}>
              <Icon
                as={isActive || isChildActive ? iconActive : icon}
                sx={{ fontSize: `${theme.fontSizes['3xl']} !important` }}
              />
              <ScaleFade
                in={sidebarMode === 'expanded'}
                unmountOnExit
                delay={{
                  enter: utils.handleParseDurationForFramer(
                    utils.handleReturnNumberFromString(theme.transition.duration.slow, 'ms')
                  ),
                  exit: 0
                }}>
                <Text align='left' fontSize='lg' fontWeight='semibold' whiteSpace='nowrap'>
                  {label}
                </Text>
              </ScaleFade>
            </HStack>

            {children && renderChildren ? (
              <ScaleFade
                in={sidebarMode === 'expanded'}
                unmountOnExit
                delay={{
                  enter: utils.handleParseDurationForFramer(
                    utils.handleReturnNumberFromString(theme.transition.duration.slow, 'ms')
                  ),
                  exit: 0
                }}>
                <Icon
                  as={ChevronRightOutlinedIcon}
                  sx={{
                    fontSize: `${theme.fontSizes['2xl']} !important`,
                    transform: `rotate(${isOpen ? '90deg' : '0deg'})`
                  }}
                  onMouseEnter={() => setIsHovering.on()}
                  onMouseLeave={() => setIsHovering.off()}
                />
              </ScaleFade>
            ) : null}
          </HStack>
        </CUILink>
      </Tooltip>

      {children && renderChildren ? (
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
