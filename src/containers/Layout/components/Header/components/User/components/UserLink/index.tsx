import React, { ReactElement } from 'react';

import { useTheme, useColorMode, HStack, Icon, Text, Link } from '@chakra-ui/react';
import _ from 'lodash';
import { useLocation, Link as RRDLink } from 'react-router-dom';

import { Theme } from '../../../../../../../../theme/types';
import { UserLink as UserLinkType } from '../../types';
import useStyles from './styles';

const UserLink = (props: UserLinkType): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const location = useLocation();

  const { label, path, icon, iconActive, onClick } = props;

  const isActive: boolean = location.pathname === path;

  const style = useStyles(theme, isActive);

  return path ? (
    <Link width='100%' as={RRDLink} to={path} sx={{ ...style.common.link }}>
      <HStack
        width='100%'
        justifyContent='flex-start'
        px={2}
        py={1}
        spacing={1}
        sx={{ ..._.merge(style.common.container, style[colorMode]) }}>
        <Icon as={isActive ? iconActive : icon} sx={{ fontSize: `${theme.fontSizes['2xl']} !important` }} />
        <Text align='left' fontSize='md' fontWeight='semibold' whiteSpace='nowrap'>
          {label}
        </Text>
      </HStack>
    </Link>
  ) : (
    <HStack
      width='100%'
      justifyContent='flex-start'
      px={2}
      py={1}
      spacing={1}
      onClick={onClick ? () => onClick() : undefined}
      sx={{ ..._.merge(style.common.container, style[colorMode]) }}>
      <Icon as={isActive ? iconActive : icon} sx={{ fontSize: `${theme.fontSizes['2xl']} !important` }} />
      <Text align='left' fontSize='md' fontWeight='semibold' whiteSpace='nowrap'>
        {label}
      </Text>
    </HStack>
  );
};

export default UserLink;
