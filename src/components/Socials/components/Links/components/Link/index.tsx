import { ReactElement } from 'react';

import { useTheme, useColorMode, Center, Link as CUILink } from '@chakra-ui/react';

import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import _ from 'lodash';

import useStyles from './styles';
import { LinkProps } from './types';

import { Theme } from '../../../../../../theme/types';
import Skeleton from '../../../../../Skeleton';

const Link = (props: LinkProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const { color, href, icon, isDisabled = false } = props;

	const style = useStyles(theme, { colorMode, color });

	return (
		<CUILink
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
