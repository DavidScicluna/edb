import { FC, useCallback } from 'react';

import { Space, useTheme, Card, CardBody, Fade, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst, VStack, HStack, Text } from '@chakra-ui/react';

import { Transition } from 'framer-motion';
import { useElementSize, useUpdateEffect } from 'usehooks-ts';

import useStyles from '../../../../../../../../common/styles';
import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';
import UserPopper from '../../../../../UserPopper';
import Avatar from '../../../../../../../../../../components/Avatar';
import { guest } from '../../../../../../../../../../store/slices/Users';

const { getTransitionDelay, convertREMToPixels, convertStringToNumber, getColor } = utils;

const spacing: Space = 2;

const User: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [avatarRef, { width: avatarWidth }] = useElementSize();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);
	const activeUser = useSelector((state) => state.users.data.activeUser);
	const { name, avatar_path } = activeUser.data.info;
	const { username } = activeUser.data.credentials;

	const [isGuest, setIsGuest] = useBoolean(guest.data.id === activeUser.data.id);

	const style = useStyles({ theme });

	const delay = useConst<number>(getTransitionDelay({ theme, duration: 'ultra-slow' }));
	const config = useConst<Transition>({ delay });

	const handleAvatarWidth = useCallback(() => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${avatarWidth + spacingWidth}px)`;
	}, [theme, spacing, avatarWidth]);

	useUpdateEffect(() => setIsGuest[guest.data.id === activeUser.data.id ? 'on' : 'off'](), [activeUser]);

	return (
		<UserPopper
			gutter={36}
			placement='right-end'
			renderAction={({ isOpen }) => (
				<Card
					color={isOpen ? color : 'gray'}
					colorMode={colorMode}
					isFullWidth
					isClickable
					p={sidebarMode === 'expanded' ? 2 : 1}
					sx={{ ...style, '*, *::before, *::after': { ...style } }}
				>
					<CardBody>
						<HStack width='100%' alignItems='center' justifyContent='stretch' spacing={spacing}>
							<Avatar
								ref={avatarRef}
								alt={name}
								borderRadius='base'
								src={{ full: avatar_path }}
								size={theme.space[sidebarMode === 'expanded' ? 7 : 4.25]}
							/>

							<Fade
								in={sidebarMode === 'expanded'}
								unmountOnExit
								transition={{ enter: { ...config } }}
								style={{ flex: 1 }}
							>
								<VStack width={handleAvatarWidth()} alignItems='flex-start' spacing={0.5}>
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
										{`@${isGuest ? name : username}`}
									</Text>
								</VStack>
							</Fade>
						</HStack>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default User;
