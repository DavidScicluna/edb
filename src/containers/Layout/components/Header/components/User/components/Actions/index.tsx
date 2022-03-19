import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import { VStack } from '@chakra-ui/react';

import { useSelector } from '../../../../../../../../common/hooks';
import { Style } from '../../../../../../../../common/types';
import Button from '../../../../../../../../components/Clickable/Button';
import Link from '../../../../../../../../components/Clickable/Link';
import Icon from '../../../../../../../../components/Icon';
import { toggleDisplay, toggleUserSwitcher } from '../../../../../../../../store/slices/Modals';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';

const sx: Style = { px: 0, justifyContent: 'flex-start' };

const Actions = (): ReactElement => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);

	const isDisplayModalOpen = useSelector((state) => state.modals.ui.isDisplayModalOpen);
	const isUserSwitcherModalOpen = useSelector((state) => state.modals.ui.isUserSwitcherModalOpen);

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const location = useLocation();

	return (
		<VStack width='100%' spacing={0}>
			<Link to='/profile' isDisabled={location.pathname === '/profile'} isFullWidth>
				<Button
					renderLeft={({ fontSize }) => (
						<Icon
							icon='person'
							type={location.pathname === '/profile' ? 'filled' : 'outlined'}
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

			<Link to='/liked' isDisabled={location.pathname === '/liked'} isFullWidth>
				<Button
					renderLeft={({ fontSize }) => (
						<Icon
							icon={location.pathname === '/liked' ? 'favorite' : 'favorite_border'}
							type='outlined'
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

			<Link to='/lists' isDisabled={location.pathname === '/lists'} isFullWidth>
				<Button
					renderLeft={({ fontSize }) => (
						<Icon
							icon={location.pathname === '/lists' ? 'bookmark' : 'bookmark_border'}
							type='outlined'
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

			{users.length > 1 ? (
				<Button
					renderLeft={({ fontSize }) => <Icon icon='sync' type='outlined' fontSize={fontSize} />}
					color={isUserSwitcherModalOpen ? color : 'gray'}
					isFullWidth
					onClick={() => dispatch(toggleUserSwitcher())}
					size='lg'
					variant='text'
					sx={{ front: { ...sx } }}
				>
					Switch User
				</Button>
			) : null}

			<Button
				renderLeft={({ fontSize }) => (
					<Icon icon='palette' type={isDisplayModalOpen ? 'filled' : 'outlined'} fontSize={fontSize} />
				)}
				color={isDisplayModalOpen ? color : 'gray'}
				isFullWidth
				onClick={() => dispatch(toggleDisplay())}
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
