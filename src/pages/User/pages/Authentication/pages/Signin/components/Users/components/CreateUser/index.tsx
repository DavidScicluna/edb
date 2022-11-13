import { FC } from 'react';

import { useOutletContext } from 'react-router';

import { useTheme, InternalLink, Card, CardBody, CardFooter, Icon, utils } from '@davidscicluna/component-library';

import { Center, Text } from '@chakra-ui/react';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../../../../../types';

const { getColor } = utils;

const CreateUser: FC = () => {
	const theme = useTheme();

	const { color = defaultColor, colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	return (
		<InternalLink to='/authentication/register' isFullWidth sx={{ height: '100%' }}>
			<Card
				colorMode={colorMode}
				isLight
				isDivisible={false}
				isClickable
				isFullWidth={false}
				p={2}
				sx={{ height: '100%' }}
			>
				<CardBody>
					<Center>
						<Icon
							color={getColor({ theme, colorMode, color, type: 'color' })}
							colorMode={colorMode}
							width={theme.space[8]}
							height={theme.space[8]}
							fontSize={theme.space[8]}
							icon='add_circle_outline'
							skeletonColor={color}
						/>
					</Center>
				</CardBody>
				<CardFooter>
					<Text
						align='center'
						color={getColor({ theme, colorMode, type: 'text.primary' })}
						fontSize='sm'
						fontWeight='semibold'
						noOfLines={1}
					>
						Create New Account
					</Text>
				</CardFooter>
			</Card>
		</InternalLink>
	);
};

export default CreateUser;
