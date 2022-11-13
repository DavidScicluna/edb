import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';

import { UserProfileStructureProps } from './types';

const { convertREMToPixels, convertStringToNumber, getColor } = utils;

const UserProfileStructure: FC<UserProfileStructureProps> = (props) => {
	const theme = useTheme();
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const [avatarRef, { width: avatarWidth }] = useElementSize();

	const {
		color = defaultColor,
		colorMode = defaultColorMode,
		renderUserAvatar,
		renderUserBackground,
		renderUserDetails
	} = props;

	return (
		<VStack
			width='100%'
			height='auto'
			// minHeight={`${round((backgroundHeight + avatarHeight + detailsHeight) / 1.75)}px`}
			alignItems='stretch'
			justifyContent='stretch'
			position='relative'
			borderWidth='2px'
			borderStyle='solid'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='xl'
			overflowX='hidden'
			overflowY='hidden'
			spacing={0}
		>
			<Center
				ref={avatarRef}
				position={['relative', 'relative', 'absolute']}
				zIndex={5}
				bottom={[0, 0, 2, 4]}
				left={[0, 0, 2, 4]}
				p={[2, 2, 0]}
			>
				{renderUserAvatar({ color, colorMode })}
			</Center>

			<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={0}>
				{isMd && <Center width='100%'>{renderUserBackground({ color, colorMode })}</Center>}

				<Center
					width={[
						'100%',
						'100%',
						`calc(100% - ${
							avatarWidth + convertREMToPixels(convertStringToNumber(theme.space[2], 'rem'))
						}px)`,
						`calc(100% - ${
							avatarWidth + convertREMToPixels(convertStringToNumber(theme.space[4], 'rem'))
						}px)`
					]}
					alignSelf='flex-end'
				>
					{renderUserDetails({ color, colorMode })}
				</Center>
			</VStack>
		</VStack>
	);
};

export default UserProfileStructure;
