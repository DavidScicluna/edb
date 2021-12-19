import { ReactElement } from 'react';

import { useTheme, Link as CUILink, Box, Icon } from '@chakra-ui/react';
import _ from 'lodash';

import Skeleton from '../../../../../../components/Skeleton';
import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { LinkProps } from './types';

const Link = (props: LinkProps): ReactElement => {
  const theme = useTheme<Theme>();

  const style = useStyles(theme, props);

  const { name, type, href, icon, isDisabled = false } = props;

  const iconComponent = (
    <Skeleton isLoaded={!isDisabled}>
      <Icon as={icon} sx={{ ..._.merge(style.common.icon) }} />
    </Skeleton>
  );

  return !isDisabled ? (
    <CUILink
      aria-label={`${name ? `"${name}"` : ''} ${type} link`}
      href={!isDisabled ? href : ''}
      isExternal
      sx={{ ...style.common.link }}
    >
      {iconComponent}
    </CUILink>
  ) : (
    <Box p={1}>{iconComponent}</Box>
  );
};

export default Link;
