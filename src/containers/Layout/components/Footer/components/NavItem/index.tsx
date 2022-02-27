import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import { useColorMode, VStack, Text, useTheme } from '@chakra-ui/react';

import { useSelector } from '../../../../../../common/hooks';
import Link from '../../../../../../components/Clickable/Link';
import { NavItem as NavItemProps } from '../../../../../../components/NavItem/types';
import { Theme } from '../../../../../../theme/types';

const NavItem = (props: NavItemProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const location = useLocation();

	const color = useSelector((state) => state.user.ui.theme.color);

	const { children, label, path } = props;

	const isActive: boolean = location.pathname === path;

	const renderChildren: boolean = children ? children.every((child) => child.renderChild) : false;

	return (
		<VStack alignItems='flex-start' justifyContent='flex-start'>
			<Link to={{ pathname: path }} isDisabled={isActive}>
				<Text
					cursor={isActive ? 'default' : 'pointer'}
					align='left'
					color={
						isActive
							? `${color}.${colorMode === 'light' ? 500 : 400}`
							: `gray.${colorMode === 'light' ? 400 : 500}`
					}
					fontSize='md'
					fontWeight='semibold'
					textTransform='uppercase'
					sx={{ transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}` }}
					_focus={{ boxShadow: 'none' }}
					_hover={{
						color: isActive
							? `${color}.${colorMode === 'light' ? 600 : 300}`
							: `gray.${colorMode === 'light' ? 900 : 50}`
					}}
				>
					{label}
				</Text>
			</Link>

			{children && children.length > 0 && renderChildren
				? children.map((child, index) => (
						<Link key={index} to={{ pathname: child.path }} isDisabled={location.pathname === child.path}>
							<Text
								cursor={location.pathname === child.path ? 'default' : 'pointer'}
								align='left'
								color={
									location.pathname === child.path
										? `${color}.${colorMode === 'light' ? 400 : 500}`
										: `gray.${colorMode === 'light' ? 400 : 500}`
								}
								fontSize='md'
								fontWeight='medium'
								textTransform='capitalize'
								sx={{
									transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
								}}
								_focus={{ boxShadow: 'none' }}
								_hover={{
									color:
										location.pathname === child.path
											? `${color}.${colorMode === 'light' ? 500 : 400}`
											: `gray.${colorMode === 'light' ? 900 : 50}`
								}}
							>
								{child.label}
							</Text>
						</Link>
				  ))
				: null}
		</VStack>
	);
};

export default NavItem;
