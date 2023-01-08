import { FC } from 'react';

import { useOutletContext } from 'react-router';

import {
	CollapsibleCard,
	CollapsibleCardHeader,
	CollapsibleCardBody,
	HorizontalScroll
} from '@davidscicluna/component-library';

import { useBoolean, Box, Text } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import { useSelector } from '../../../../../../../../common/hooks';
import { colorMode as defaultColorMode } from '../../../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../../../types';

import { SigninUsersProps } from './types';
import SigninUsersUser from './components/SigninUsersUser';
import SigninUsersCreateUser from './components/SigninUsersCreateUser';

const SigninUsers: FC<SigninUsersProps> = ({ selectedUserID, onUserClick }) => {
	const { colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	const users = useSelector((state) => state.users.data.users || []);

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
					<HorizontalScroll colorMode={colorMode} renderDivider={({ padding }) => <Box padding={padding} />}>
						{[
							...sort([...users])
								.desc((u) => u.data.signedInAt)
								.map((user) => (
									<SigninUsersUser
										key={user.data.id}
										user={{ ...user }}
										isSelected={selectedUserID === user.data.id}
										onClick={() =>
											onUserClick(selectedUserID !== user.data.id ? { ...user } : undefined)
										}
									/>
								)),

							<SigninUsersCreateUser key='ds-edb-signin-create-user' />
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

export default SigninUsers;
