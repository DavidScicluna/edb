import { ReactElement } from 'react';

import { Link as CUILink, useTheme } from '@chakra-ui/react';
import _ from 'lodash';
import { Link as RRDLink } from 'react-router-dom';

import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { LinkProps } from './types';

const Link = (props: LinkProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { children, to, isDisabled = false, isFullWidth = false, sx, ...rest } = props;

  const style = useStyles(theme, isFullWidth);

  return (
    <CUILink
      {...rest}
      as={RRDLink}
      to={{ ...to }}
      onClick={isDisabled ? (event) => event.preventDefault() : undefined}
      sx={{ ..._.merge(style, sx || {}) }}
    >
      {children}
    </CUILink>
  );
};

export default Link;
