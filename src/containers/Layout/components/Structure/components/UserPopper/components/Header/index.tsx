import { FC, useCallback } from 'react';

import { Space, useTheme, utils } from '@davidscicluna/component-library';

import { HStack, VStack, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useSelector, useUserTheme } from '../../../../../../../../common/hooks';
import Avatar from '../../../../../../../../components/Avatar';

const { convertREMToPixels, convertStringToNumber, getColor } = utils;

const spacing: Space = 2;

const Header: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const activeUser = useSelector((state) => state.users.data.activeUser);
	const { name, avatar_path } = activeUser.data.info;
	const { username } = activeUser.data.credentials;

	const [avatarRef, { width: avatarWidth }] = useElementSize();

	const handleContentWidth = useCallback(() => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${avatarWidth + spacingWidth}px)`;
	}, [theme, spacing, avatarWidth]);

	return (
		<HStack width='100%' spacing={spacing}>
			<Avatar
				ref={avatarRef}
				alt={name}
				borderRadius='base'
				src={{ full: avatar_path }}
				size={theme.fontSizes['7xl']}
			/>

			<VStack width={handleContentWidth()} alignItems='flex-start' spacing={0.5}>
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize='2xl'
					fontWeight='bold'
					lineHeight='normal'
					noOfLines={1}
				>
					{name}
				</Text>
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					fontSize='sm'
					lineHeight='normal'
					noOfLines={1}
				>
					{`@${username}`}
				</Text>
			</VStack>
		</HStack>
	);
};

export default Header;
