import { FC } from 'react';

import { useTheme, Card, CardBody, utils } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import Avatar from '../../../../../../../../components/Avatar';
import { useUserTheme } from '../../../../../../../../common/hooks';

import { UserProps } from './types';

const { getColor } = utils;

const User: FC<UserProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { user, isSelected = false, onClick } = props;
	const { name, avatar_path } = user.data.info;

	return (
		<Card
			color={isSelected ? color : 'gray'}
			colorMode={colorMode}
			isClickable
			onClick={!isSelected ? () => onClick() : undefined}
			p={1}
		>
			<CardBody>
				<VStack width='100%' spacing={1}>
					<Avatar alt={name} borderRadius='base' src={{ full: avatar_path }} size={theme.space[5]} />

					<Text
						align='center'
						color={getColor({ theme, colorMode, type: 'text.primary' })}
						fontSize='md'
						fontWeight='semibold'
					>
						{name}
					</Text>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default User;
