import { FC } from 'react';

import { useTheme, InternalLink, Button, Icon, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, VStack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';
import { useSelector } from '../../../../../../../../common/hooks';

import { UserDetailsProps } from './types';

const { getColor, convertREMToPixels, convertStringToNumber } = utils;

const UserDetails: FC<UserDetailsProps> = ({ color = defaultColor, colorMode = defaultColorMode }) => {
	const theme = useTheme();
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const {
		info: { name },
		credentials: { username }
	} = useSelector((state) => state.users.data.activeUser.data);

	const [buttonRef, { width: buttonWidth }] = useElementSize();

	const handleConvertSpacing = (spacing: string): number => {
		return convertREMToPixels(convertStringToNumber(spacing, 'rem'));
	};

	return (
		<Stack
			width='100%'
			direction={['column', 'column', 'row']}
			alignItems={['flex-start', 'flex-start', 'center']}
			justifyContent='space-between'
			spacing={[4, 4, 6, 6]}
			px={[2, 2, 4, 4]}
			py={[2, 2, 8, 8]}
		>
			<VStack
				width={['100%', '100%', `calc(100% - ${buttonWidth + handleConvertSpacing(theme.space[6])}px)`]}
				alignItems='flex-start'
				spacing={0}
			>
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize='4xl'
					fontWeight='semibold'
					noOfLines={1}
				>
					{name}
				</Text>
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					fontSize='md'
					fontWeight='medium'
					noOfLines={1}
				>
					{username}
				</Text>
			</VStack>

			<Center ref={buttonRef} width={!isMd ? '100%' : 'auto'}>
				<InternalLink to='/profile/edit'>
					<Button
						color={color}
						colorMode={colorMode}
						renderLeft={({ colorMode, height }) => (
							<Icon
								width={`${height}px`}
								height={`${height}px`}
								fontSize={`${height}px`}
								colorMode={colorMode}
								icon='edit'
								category='outlined'
							/>
						)}
						isFullWidth
						variant='outlined'
					>
						Edit
					</Button>
				</InternalLink>
			</Center>
		</Stack>
	);
};

export default UserDetails;
