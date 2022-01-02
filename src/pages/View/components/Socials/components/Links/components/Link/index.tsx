import { ReactElement } from 'react';

import { useTheme, Center, Link as CUILink } from '@chakra-ui/react';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import _ from 'lodash';

import Skeleton from '../../../../../../../../components/Skeleton';
import { Theme } from '../../../../../../../../theme/types';
import useStyles from './styles';
import { LinkProps } from './types';

const Link = (props: LinkProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { defaultColor, color, name, type, href, icon, isDisabled = false } = props;

  const style = useStyles(theme, { defaultColor, color });

  return (
    <CUILink
      aria-label={`${name ? `"${name}"` : ''} ${type} link`}
      isExternal
      href={href}
      target='_blank'
      onClick={isDisabled ? (event) => event.preventDefault() : undefined}
      sx={{ ...style.common.link }}
    >
      <Center sx={{ ..._.merge(style.common.icon) }}>
        <Skeleton isLoaded={!isDisabled}>{icon || <ErrorOutlineOutlinedIcon />}</Skeleton>
      </Center>
    </CUILink>
  );
};

export default Link;
