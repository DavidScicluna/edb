import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Link, HStack, Text, Box } from '@chakra-ui/react';
import _ from 'lodash';
import { useLocation, Link as RRDLink } from 'react-router-dom';

import Tooltip from '../../../../../../../../components/Tooltip';
import { Theme } from '../../../../../../../../theme/types';
import useStyles from './styles';
import { NavItemChildProps } from './types';

const NavItemChild = ({ label, path, isExpanded = false, isLastChild = false }: NavItemChildProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const location = useLocation();
  const isActive: boolean = location.pathname === path;
  const style = useStyles(theme, isActive, isExpanded, isLastChild);

  /**
   * This method will get the label and return the initials of that label
   *
   * @returns - Initials
   */
  const handleGetInitials = (): string => {
    const parts = label.split(' ');
    let initials = '';

    parts.forEach((part) => {
      if (part) {
        initials += part[0];
      }
    });

    return initials;
  };

  return (
    <Link width='100%' as={RRDLink} to={path} sx={{ ...style.common.link }}>
      <HStack width='100%' spacing='15px'>
        {isExpanded ? (
          <Box height='44px' borderLeft='solid2' borderLeftColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />
        ) : null}
        <Tooltip
          aria-label={!isExpanded ? label : ''}
          closeOnClick={false}
          label={!isExpanded ? label : ''}
          placement='right'>
          <HStack
            width='100%'
            justifyContent={isExpanded ? 'flex-start' : 'center'}
            px={isExpanded ? 2 : 1}
            py={1}
            spacing={0}
            sx={{ ..._.merge(style.common.child, style[colorMode].child) }}>
            <Text
              align='left'
              fontSize={isExpanded ? 'md' : 'sm'}
              fontWeight='semibold'
              whiteSpace='nowrap'
              textTransform={isExpanded ? 'capitalize' : 'uppercase'}>
              {isExpanded ? label : handleGetInitials()}
            </Text>
          </HStack>
        </Tooltip>
      </HStack>
    </Link>
  );
};

export default NavItemChild;
