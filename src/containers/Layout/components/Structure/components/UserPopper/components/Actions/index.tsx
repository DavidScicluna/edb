import { FC } from 'react';

import { useLocation } from 'react-router-dom';

import { InternalLink, Button, Icon } from '@davidscicluna/component-library';

import { useBoolean, VStack } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';

import { useSelector, useUserTheme } from '../../../../../../../../common/hooks';
import { guest } from '../../../../../../../../store/slices/Users';
import { toggleUserSwitcherModal, toggleUserThemeModal } from '../../../../../../../../store/slices/Modals';
import { sx } from '../../common/styles';

const Actions: FC = () => {
	const { color, colorMode } = useUserTheme();

	const location = useLocation();

	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);
	const users = useSelector((state) => state.users.data.users.filter((user) => user.data.id !== activeUser.data.id));

	const isUserThemeModalOpen = useSelector((state) => state.modals.ui.isUserThemeModalOpen);
	const isUserSwitcherModalOpen = useSelector((state) => state.modals.ui.isUserSwitcherModalOpen);

	const [isGuest, setIsGuest] = useBoolean(guest.data.id === activeUser.data.id);

	useUpdateEffect(() => setIsGuest[guest.data.id === activeUser.data.id ? 'on' : 'off'](), [activeUser]);

	return (
		<VStack width='100%' spacing={0}>
			{!isGuest && (
				<InternalLink to='/profile' isDisabled={location.pathname === '/profile'} isFullWidth>
					<Button
						color={location.pathname === '/profile' ? color : 'gray'}
						colorMode={colorMode}
						renderLeft={(props) => (
							<Icon
								{...props}
								icon='person'
								category={location.pathname === '/profile' ? 'filled' : 'outlined'}
							/>
						)}
						isFullWidth
						size='lg'
						variant='text'
						sx={{ ...sx }}
					>
						Profile
					</Button>
				</InternalLink>
			)}

			{!isGuest && (
				<InternalLink to='/liked' isDisabled={location.pathname === '/liked'} isFullWidth>
					<Button
						color={location.pathname === '/liked' ? color : 'gray'}
						colorMode={colorMode}
						renderLeft={(props) => (
							<Icon
								{...props}
								icon={location.pathname === '/liked' ? 'favorite' : 'favorite_border'}
								category='outlined'
							/>
						)}
						isFullWidth
						size='lg'
						variant='text'
						sx={{ ...sx }}
					>
						Liked
					</Button>
				</InternalLink>
			)}

			{!isGuest && (
				<InternalLink to='/lists' isDisabled={location.pathname === '/lists'} isFullWidth>
					<Button
						color={location.pathname === '/lists' ? color : 'gray'}
						colorMode={colorMode}
						renderLeft={(props) => (
							<Icon
								{...props}
								icon={location.pathname === '/lists' ? 'bookmark' : 'bookmark_border'}
								category='outlined'
							/>
						)}
						isFullWidth
						size='lg'
						variant='text'
						sx={{ ...sx }}
					>
						Lists
					</Button>
				</InternalLink>
			)}

			{users.length > 0 && (
				<Button
					color={isUserSwitcherModalOpen ? color : 'gray'}
					colorMode={colorMode}
					renderLeft={(props) => <Icon {...props} icon='sync' category='outlined' />}
					isFullWidth
					onClick={() => dispatch(toggleUserSwitcherModal(true))}
					size='lg'
					variant='text'
					sx={{ ...sx }}
				>
					Switch User
				</Button>
			)}

			<Button
				color={isUserThemeModalOpen ? color : 'gray'}
				colorMode={colorMode}
				renderLeft={(props) => (
					<Icon {...props} icon='palette' category={isUserThemeModalOpen ? 'filled' : 'outlined'} />
				)}
				isFullWidth
				onClick={() => dispatch(toggleUserThemeModal(true))}
				size='lg'
				variant='text'
				sx={{ ...sx }}
			>
				Display
			</Button>
		</VStack>
	);
};

export default Actions;
