import { FC } from 'react';

import { useTheme, IconButton, utils } from '@davidscicluna/component-library';

import { useUserTheme, useSelector } from '../../../../../../../../common/hooks';
import UserPopper from '../../../UserPopper';
import Avatar from '../../../../../../../../components/Avatar';

const { getColor } = utils;

const User: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const activeUser = useSelector((state) => state.users.data.activeUser);
	const { name, avatar_path } = activeUser.data.info;

	return (
		<UserPopper
			gutter={32}
			renderAction={({ isOpen }) => (
				<IconButton
					aria-label='SideBar Navigation User Menu Button'
					colorMode={colorMode}
					variant='icon'
					sx={{
						width: 'auto',
						height: 'auto',
						borderRadius: theme.radii.full,
						outlineOffset: theme.space['0.5'],
						outline: `${isOpen ? 2 : 0}px solid ${
							isOpen
								? getColor({
										theme,
										colorMode,
										color,
										type: 'color'
								  })
								: theme.colors.transparent
						}`
					}}
				>
					<Avatar alt={name} borderRadius='full' src={{ full: avatar_path }} size={theme.fontSizes['5xl']} />
				</IconButton>
			)}
		/>
	);
};

export default User;
