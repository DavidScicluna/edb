import React, { ReactElement } from 'react';

import { Style, Button, Icon } from '@davidscicluna/component-library';

import { useConst, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import { useSelector } from '../../../../../../../../common/hooks';
import Link from '../../../../../../../../components/Clickable/Link';
import { toggleDisplay, toggleUserSwitcher } from '../../../../../../../../store/slices/Modals';
import { defaultUser, getUser, guest } from '../../../../../../../../store/slices/Users';

const sx: Style = { px: 0, justifyContent: 'flex-start' };

const Actions = (): ReactElement => {
	const dispatch = useDispatch();
	const id = useSelector((state) => state.app.data.user);
	const users = useSelector((state) =>
		state.users.data.users.filter((user) => user.data.id !== guest.data.id || user.data.id !== id)
	);

	const isDisplayModalOpen = useSelector((state) => state.modals.ui.isDisplayModalOpen);
	const isUserSwitcherModalOpen = useSelector((state) => state.modals.ui.isUserSwitcherModalOpen);

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const location = useLocation();

	const isGuest = useConst<boolean>(guest.data.id === id);

	return (
		<VStack width='100%' spacing={0}>
			{!isGuest ? (
				<Link to='/profile' isDisabled={location.pathname === '/profile'} isFullWidth>
					<Button
						renderLeft={({ fontSize }) => (
							<Icon
								icon='person'
								category={location.pathname === '/profile' ? 'filled' : 'outlined'}
								fontSize={fontSize}
							/>
						)}
						color={location.pathname === '/profile' ? color : 'gray'}
						isFullWidth
						size='lg'
						variant='text'
						sx={{ front: { ...sx } }}
					>
						Profile
					</Button>
				</Link>
			) : null}

			{!isGuest ? (
				<Link to='/liked' isDisabled={location.pathname === '/liked'} isFullWidth>
					<Button
						renderLeft={({ fontSize }) => (
							<Icon
								icon={location.pathname === '/liked' ? 'favorite' : 'favorite_border'}
								category='outlined'
								fontSize={fontSize}
							/>
						)}
						color={location.pathname === '/liked' ? color : 'gray'}
						isFullWidth
						size='lg'
						variant='text'
						sx={{ front: { ...sx } }}
					>
						Liked
					</Button>
				</Link>
			) : null}

			{!isGuest ? (
				<Link to='/lists' isDisabled={location.pathname === '/lists'} isFullWidth>
					<Button
						renderLeft={({ fontSize }) => (
							<Icon
								icon={location.pathname === '/lists' ? 'bookmark' : 'bookmark_border'}
								category='outlined'
								fontSize={fontSize}
							/>
						)}
						color={location.pathname === '/lists' ? color : 'gray'}
						isFullWidth
						size='lg'
						variant='text'
						sx={{ front: { ...sx } }}
					>
						Lists
					</Button>
				</Link>
			) : null}

			{users.length > 0 ? (
				<Button
					renderLeft={({ fontSize }) => <Icon icon='sync' category='outlined' fontSize={fontSize} />}
					color={isUserSwitcherModalOpen ? color : 'gray'}
					isFullWidth
					onClick={() => dispatch(toggleUserSwitcher(true))}
					size='lg'
					variant='text'
					sx={{ front: { ...sx } }}
				>
					Switch User
				</Button>
			) : null}

			<Button
				renderLeft={({ fontSize }) => (
					<Icon icon='palette' category={isDisplayModalOpen ? 'filled' : 'outlined'} fontSize={fontSize} />
				)}
				color={isDisplayModalOpen ? color : 'gray'}
				isFullWidth
				onClick={() => dispatch(toggleDisplay(true))}
				size='lg'
				variant='text'
				sx={{ front: { ...sx } }}
			>
				Display
			</Button>
		</VStack>
	);
};

export default Actions;
