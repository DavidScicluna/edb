import { FC } from 'react';

import { useOutletContext } from 'react-router';

import { useTheme, Card, CardBody, CardFooter, Icon, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import Avatar from '../../../../../../../../../../components/Avatar';
import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../../../../../types';
import { ClickableMedia } from '../../../../../../../../../../components';
import { getRatio } from '../../../../../../../../../../common/utils/ratio';

import { SigninUsersUserProps } from './types';

const { getColor } = utils;

const SigninUsersUser: FC<SigninUsersUserProps> = (props) => {
	const theme = useTheme();

	const { color = defaultColor, colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	const { user, isSelected = false, onClick } = props;
	const { name, avatar_path } = user.data.info;

	return (
		<Card
			color={isSelected ? color : 'gray'}
			colorMode={colorMode}
			isLight={!isSelected}
			isDivisible={false}
			isClickable
			isFullWidth={false}
			onClick={() => onClick()}
			p={2}
			sx={{ height: '100%' }}
		>
			<CardBody>
				<ClickableMedia
					colorMode={colorMode}
					width={theme.space[8]}
					height={theme.space[8]}
					borderRadius='base'
					ratio={getRatio({ orientation: 'square' })}
					renderIcon={(props) => <Icon {...props} icon='check' category='outlined' />}
					isActive={isSelected}
				>
					<Avatar alt={name} borderRadius='base' src={{ full: avatar_path }} size={theme.space[8]} />
				</ClickableMedia>
			</CardBody>
			<CardFooter>
				<Text
					align='center'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize='sm'
					fontWeight='semibold'
					noOfLines={1}
				>
					{name}
				</Text>
			</CardFooter>
		</Card>
	);
};

export default SigninUsersUser;
