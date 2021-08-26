import React, { ReactElement } from 'react';

import { Link as CUILink, useTheme } from '@chakra-ui/react';
import { Link as RRDLink } from 'react-router-dom';

import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { LinkProps } from './types';

const Link = (props: LinkProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { children, to, isDisabled = false, isFullWidth = false, ...rest } = props;

  const style = useStyles(theme, isFullWidth);

  return (
    <CUILink
      {...rest}
      as={RRDLink}
      to={{ ...to }}
      onClick={isDisabled ? (event) => event.preventDefault() : undefined}
      sx={{ ...style }}>
      {children}
    </CUILink>
  );
};

export default Link;
