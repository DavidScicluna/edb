import { ReactElement } from 'react';

import { useTheme, Card, CardBody } from '@davidscicluna/component-library';

import { useColorMode, VStack, Text } from '@chakra-ui/react';

import { useSelector } from '../../../../../../../common/hooks';
import Avatar from '../../../../../../../components/Avatar';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';

import { UserProps } from './types';

const User = ({ user, isActive = false, onClick }: UserProps): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<Card
			// color={isActive ? color : 'gray'}
			color={isActive ? 'blue' : 'gray'}
			isFullWidth
			isClickable
			onClick={!isActive ? () => onClick() : undefined}
			isLight
			p={3}
		>
			<CardBody>
				<VStack width='100%' spacing={2}>
					<Avatar
						key={user.data.id}
						alt={user.data.info?.name || 'Name'}
						borderRadius='full'
						src={user.data.info?.avatar_path || ''}
						size='xl'
					/>
					<VStack width='100%' spacing={0}>
						<Text
							align='center'
							color={
								isActive
									? `${color}.${colorMode === 'light' ? 400 : 500}`
									: `gray.${colorMode === 'light' ? 900 : 50}`
							}
							fontSize='2xl'
							fontWeight='semibold'
							lineHeight='normal'
							noOfLines={1}
							sx={{
								transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
							}}
						>
							{user.data.info.name}
						</Text>
						<Text
							align='left'
							color={
								isActive
									? `${color}.${colorMode === 'light' ? 400 : 500}`
									: `gray.${colorMode === 'light' ? 400 : 500}`
							}
							fontSize='md'
							fontWeight='medium'
							noOfLines={1}
							sx={{
								transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
							}}
						>
							{`@${user.data.credentials?.username || ''}`}
						</Text>
					</VStack>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default User;
