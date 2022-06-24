import { ReactElement } from 'react';

import { useTheme, Skeleton, Icon } from '@davidscicluna/component-library';

import { useColorMode, Center, Link as CUILink } from '@chakra-ui/react';
import merge from 'lodash/merge';

import { LinkProps } from './types';
import useStyles from './styles';

const Link = (props: LinkProps): ReactElement => {
	const theme = useTheme();
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
				<Skeleton isLoaded={!isDisabled}>{icon || <Icon icon='error_outline' category='outlined' />}</Skeleton>
			</Center>
		</CUILink>
	);
};

export default Link;
