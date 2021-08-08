import React, { ReactElement } from 'react';

import { Link as CUILink, useTheme } from '@chakra-ui/react';
import { Link as RRDLink } from 'react-router-dom';

import { Theme } from '../../../theme/types';
import { LinkProps } from './types';

const Link = (props: LinkProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { children, to, isDisabled = false, ...rest } = props;

  return (
    <CUILink
      {...rest}
      as={RRDLink}
      to={!isDisabled ? { ...to } : {}}
      sx={{ transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}` }}
      _hover={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      {children}
    </CUILink>
  );
};

export default Link;
