import { FC, useContext } from 'react';

import { useLocation } from 'react-router';

import { useTheme, InternalLink } from '@davidscicluna/component-library';

import { useMediaQuery, Stack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';
import navItems from '../../common/data/navItems';
import { LayoutContext } from '../../../../../..';
import { LayoutContext as LayoutContextType } from '../../../../../../types';
import { spacing as defaultSpacing } from '../../../../../../common/data/defaultPropValues';

const FooterNavigation: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const location = useLocation();

	const { spacing = defaultSpacing } = useContext<LayoutContextType>(LayoutContext);

	return (
		<Stack
			width='100%'
			direction={isSm ? 'column' : 'row'}
			alignItems='center'
			justifyContent='space-around'
			spacing={spacing}
		>
			{navItems.map((navItem) => (
				<InternalLink
					key={navItem.title}
					color={location.pathname === navItem.path.pathname ? color : 'gray'}
					colorMode={colorMode}
					to={{ ...navItem.path }}
					isDisabled={location.pathname === navItem.path.pathname}
					isFullWidth={isSm}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',

						fontSize: 'md',
						fontWeight: 'semibold',
						textTransform: 'uppercase',
						textDecoration: 'none !important'
					}}
				>
					{navItem.title}
				</InternalLink>
			))}
		</Stack>
	);
};

export default FooterNavigation;
