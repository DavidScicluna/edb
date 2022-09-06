import { FC, useState } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { useElementSize, useUpdateEffect } from 'usehooks-ts';
import { round } from 'lodash';

import Avatar from './components/Avatar';
import Background from './components/Background';
import Details from './components/Details';
import { ProfileProps } from './types';

// TODO: Use Profile component with edit mode on

const { getColor, convertREMToPixels, convertStringToNumber } = utils;

const Profile: FC<ProfileProps> = (props) => {
	const theme = useTheme();
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const [backgroundRef, { height: backgroundHeight }] = useElementSize();
	const [avatarRef, { width: avatarWidth, height: avatarHeight }] = useElementSize();
	const [detailsRef, { height: detailsHeight }] = useElementSize();

	const { form, firstName, lastName, username, color, colorMode } = props;

	const [alt, setAlt] = useState<string>(`${firstName} ${lastName} (@${username})`);

	useUpdateEffect(() => setAlt(`${firstName} ${lastName} (@${username})`), [firstName, lastName, username]);

	return (
		<VStack
			width='100%'
			height='auto'
			minHeight={`${round((backgroundHeight + avatarHeight + detailsHeight) / 1.75)}px`}
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
				<Avatar form={form} color={color} colorMode={colorMode} alt={alt} />
			</Center>

			<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={0}>
				{isMd && (
					<Center ref={backgroundRef} width='100%'>
						<Background form={form} color={color} colorMode={colorMode} alt={alt} />
					</Center>
				)}

				<Center
					ref={detailsRef}
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
					<Details
						firstName={firstName}
						lastName={lastName}
						username={username}
						color={color}
						colorMode={colorMode}
					/>
				</Center>
			</VStack>
		</VStack>
	);
};

export default Profile;
