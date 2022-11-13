import { FC } from 'react';

import { useOutletContext } from 'react-router';

import { useTheme, Card, CardBody, CardFooter, Icon, Fade, utils } from '@davidscicluna/component-library';

import { Center, Text } from '@chakra-ui/react';

import { transparentize } from 'color2k';

import Avatar from '../../../../../../../../../../components/Avatar';
import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../../../../../types';

import { UserProps } from './types';

const { getColor } = utils;

const User: FC<UserProps> = (props) => {
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
			onClick={!isSelected ? () => onClick() : undefined}
			p={2}
			sx={{ height: '100%' }}
		>
			<CardBody>
				<Center width={theme.space[8]} height={theme.space[8]} position='relative'>
					<Center
						width='100%'
						height='100%'
						position='absolute'
						zIndex={1}
						borderRadius='base'
						sx={{
							background: isSelected
								? transparentize(getColor({ theme, colorMode, type: 'divider' }), 0.5)
								: theme.colors.transparent
						}}
					>
						<Fade in={isSelected}>
							<Icon
								color={getColor({ theme, colorMode, type: 'text.primary' })}
								colorMode={colorMode}
								width={theme.fontSizes['4xl']}
								height={theme.fontSizes['4xl']}
								fontSize={theme.fontSizes['4xl']}
								icon='check'
							/>
						</Fade>
					</Center>

					<Avatar alt={name} borderRadius='base' src={{ full: avatar_path }} size={theme.space[8]} />
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
					{name}
				</Text>
			</CardFooter>
		</Card>
	);
};

export default User;
