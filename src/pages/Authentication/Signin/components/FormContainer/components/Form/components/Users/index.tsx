import React, { ReactElement } from 'react';

import { useColorMode, VStack, Center, HStack, Text } from '@chakra-ui/react';

import Avatar from '../../../../../../../../../components/Avatar';

import { UsersProps } from './types';


const Users = ({ users, onUserClick }: UsersProps): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<VStack width='100%' spacing={1.5}>
			<Center
				width='100%'
				justifyContent='flex-start'
				borderBottomWidth='2px'
				borderBottomStyle='solid'
				borderBottomColor={`gray.${colorMode === 'light' ? 200 : 700}`}
				pb={0.75}
			>
				<Text
					align='left'
					color={`gray.${colorMode === 'light' ? 900 : 50}`}
					fontSize='sm'
					fontWeight='medium'
					textTransform='uppercase'
					isTruncated
					overflow='hidden'
					whiteSpace='nowrap'
				>
					Recent Users
				</Text>
			</Center>
			<HStack width='100%' spacing={2}>
				{users.map((user) => (
					<Avatar
						key={user.data.id}
						alt={user.data.info?.name || 'Name'}
						cursor='pointer'
						borderRadius='lg'
						onClick={() => onUserClick(user.data.credentials)}
						src={user.data.info?.avatar_path || ''}
						size='lg'
					/>
				))}
			</HStack>
		</VStack>
	);
};

export default Users;
