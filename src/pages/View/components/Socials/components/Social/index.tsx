import { ReactElement } from 'react';

import { useTheme, Center } from '@chakra-ui/react';
import _ from 'lodash';

import Link from '../../../../../../components/Clickable/Link';
import Skeleton from '../../../../../../components/Skeleton';
import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { LinkProps } from './types';

const Social = (props: LinkProps): ReactElement => {
  const theme = useTheme<Theme>();

  const style = useStyles(theme, props);

  const { name, type, href, icon, isDisabled = false } = props;

  return (
    <Link
      aria-label={`${name ? `"${name}"` : ''} ${type} link`}
      href={href}
      to={{}}
      isExternal
      isDisabled={isDisabled}
      sx={{ ...style.common.link }}
    >
      <Center sx={{ ..._.merge(style.common.icon) }}>
        <Skeleton isLoaded={!isDisabled}>{icon}</Skeleton>
      </Center>
    </Link>
  );
};

export default Social;
