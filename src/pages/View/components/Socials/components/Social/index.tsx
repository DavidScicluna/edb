import { ReactElement } from 'react';

import { useTheme, Center, Link } from '@chakra-ui/react';
import _ from 'lodash';

import Skeleton from '../../../../../../components/Skeleton';
import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { SocialProps } from './types';

const Social = (props: SocialProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { defaultColor, color, name, type, href, icon, isDisabled = false } = props;

  const style = useStyles(theme, { defaultColor, color, isDisabled });

  return (
    <Link
      aria-label={`${name ? `"${name}"` : ''} ${type} link`}
      href={href}
      target='_blank'
      onClick={isDisabled ? (event) => event.preventDefault() : undefined}
      sx={{ ...style.common.link }}
    >
      <Center sx={{ ..._.merge(style.common.icon) }}>
        <Skeleton isLoaded={!isDisabled}>{icon}</Skeleton>
      </Center>
    </Link>
  );
};

export default Social;
