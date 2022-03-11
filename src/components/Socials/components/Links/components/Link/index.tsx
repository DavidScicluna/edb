import { ReactElement } from 'react';

import { useTheme, useColorMode, Center, Link as CUILink } from '@chakra-ui/react';

import merge from 'lodash/merge';

import useStyles from './styles';
import { LinkProps } from './types';

import { Theme } from '../../../../../../theme/types';
import Icon from '../../../../../Icon';
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
			<Center sx={{ ...merge(style.common.icon) }}>
				<Skeleton isLoaded={!isDisabled}>{icon || <Icon icon='error_outline' type='outlined' />}</Skeleton>
			</Center>
		</CUILink>
	);
};

export default Link;
