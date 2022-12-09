import { FC } from 'react';

import { Space, useTheme, Card, CardBody, Fade, utils } from '@davidscicluna/component-library';

import { useConst, VStack, HStack, Text } from '@chakra-ui/react';

import { Transition } from 'framer-motion';

import useStyles from '../../../../../../../../common/styles';
import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';
import UserPopper from '../../../../../UserPopper';
import Avatar from '../../../../../../../../../../components/Avatar';
import { useLayoutContext } from '../../../../../../../../common/hooks';

const { getTransitionConfig, getTransitionDelay, getColor } = utils;

const spacing: Space = 2;

const User: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { isGuest } = useLayoutContext();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);
	const {
		data: {
			info: { name, avatar_path },
			credentials: { username }
		}
	} = useSelector((state) => state.users.data.activeUser);

	const style = useStyles({ theme });

	const delay = useConst<number>(getTransitionDelay({ theme, duration: 'slow' }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), delay });

	return (
		<UserPopper
			gutter={36}
			placement='right-end'
			renderAction={({ isOpen }) => (
				<Card
					color={isOpen ? color : 'gray'}
					colorMode={colorMode}
					isClickable
					isFullWidth
					isLight={!isOpen}
					p={sidebarMode === 'expanded' ? 2 : 1}
					sx={{ ...style, '*, *::before, *::after': { ...style } }}
				>
					<CardBody>
						<HStack width='100%' alignItems='center' justifyContent='stretch' spacing={spacing}>
							<Avatar
								alt={name}
								borderRadius='base'
								src={{ full: avatar_path }}
								size={theme.space[sidebarMode === 'expanded' ? 7 : 4.25]}
							/>

							<Fade
								in={sidebarMode === 'expanded'}
								transition={{ enter: { ...config } }}
								style={{ flex: 1 }}
							>
								<VStack alignItems='flex-start' spacing={0.5}>
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
										fontSize='md'
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
