import React, { ReactElement } from 'react';

import { Link as CUILink } from '@chakra-ui/react';
import { Link as RRDLink } from 'react-router-dom';

import { LinkProps } from './types';

const Link = (props: LinkProps): ReactElement => {
  const { children, to, isDisabled = false, ...rest } = props;

  return (
    <CUILink
      {...rest}
      as={RRDLink}
      to={!isDisabled ? { ...to } : {}}
      _hover={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      {children}
    </CUILink>
  );
};

export default Link;
