import { FC } from 'react';

import {
	CollapsibleCard,
	CollapsibleCardHeader,
	CollapsibleCardBody,
	HorizontalScroll
} from '@davidscicluna/component-library';

import { useBoolean, Box, Text } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import { useSelector } from '../../../../../../common/hooks';
import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';

import { UsersProps } from './types';
import User from './components/User';
import CreateUser from './components/CreateUser';

// TODO: Refactor to be a collapsible Card & to HorizontalGrid with arrows in Header action
const Users: FC<UsersProps> = (props) => {
	const users = useSelector((state) => state.users.data.users || []);

	const { color = defaultColor, colorMode = defaultColorMode, selectedUserID, onUserClick } = props;

	const [isOpen, setIsOpen] = useBoolean();

	return (
		<CollapsibleCard
			header={
				<CollapsibleCardHeader
					renderTitle={(props) => (
						<Text {...props} fontSize='md' fontWeight='semibold'>
							Recent Sign ins
						</Text>
					)}
					renderSubtitle={(props) => <Text {...props}>Click your picture or create a new account.</Text>}
				/>
			}
			body={
				<CollapsibleCardBody>
					<HorizontalScroll colorMode={colorMode} renderDivider={() => <Box padding={1} />}>
						{[
							...sort([...users])
								.desc((u) => u.data.signedInAt)
								.map((user) => (
									<User
										key={user.data.id}
										color={color}
										colorMode={colorMode}
										user={{ ...user }}
										isSelected={selectedUserID === user.data.id}
										onClick={() => onUserClick({ ...user })}
									/>
								)),

							<CreateUser key='ds-edb-signin-create-user' color={color} colorMode={colorMode} />
						].map((user) => user)}
					</HorizontalScroll>
				</CollapsibleCardBody>
			}
			colorMode={colorMode}
			isOpen={isOpen}
			isFullWidth
			onOpen={() => setIsOpen.toggle()}
			p={2}
		/>
	);
};

export default Users;
