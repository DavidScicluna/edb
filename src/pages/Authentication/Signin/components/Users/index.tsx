import { FC } from 'react';

import { Card, CardHeader, CardBody } from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import { useSelector, useUserTheme } from '../../../../../common/hooks';

import { UsersProps } from './types';
import User from './components/User';
import CreateUser from './components/CreateUser';

// TODO: Refactor to be a collapsible Card
const Users: FC<UsersProps> = ({ selectedUserID, onUserClick }) => {
	const { colorMode } = useUserTheme();

	const users = useSelector((state) => state.users.data.users || []);

	return (
		<Card colorMode={colorMode} isFullWidth>
			<CardHeader
				renderTitle={(props) => <Text {...props}>Recent Sign-Ins</Text>}
				renderSubtitle={(props) => <Text {...props}>Click your picture or create a new account.</Text>}
			/>
			<CardBody>
				<HStack width='100%' spacing={1}>
					{/* Users */}
					{sort([...users])
						.desc((u) => u.data.signedInAt)
						.map((user) => (
							<User
								key={user.data.id}
								user={{ ...user }}
								isSelected={selectedUserID === user.data.id}
								onClick={() => onUserClick({ ...user })}
							/>
						))}

					{/* Create New Account Button */}
					<CreateUser />
				</HStack>
			</CardBody>
		</Card>
	);
};

export default Users;
