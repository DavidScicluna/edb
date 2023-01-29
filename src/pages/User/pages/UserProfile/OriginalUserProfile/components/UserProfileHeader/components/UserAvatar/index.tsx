import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery, AspectRatio } from '@chakra-ui/react';

import { getRatio } from '../../../../../../../../../common/utils/ratio';
import Image from '../../../../../../../../../components/Image';
import { colorMode as defaultColorMode } from '../../../../../../../../../common/data/defaultPropValues';
import { useSelector } from '../../../../../../../../../common/hooks';

import { UserAvatarProps } from './types';

const { getColor } = utils;

const UserAvatar: FC<UserAvatarProps> = ({ colorMode = defaultColorMode, alt }) => {
	const theme = useTheme();
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const avatar_path = useSelector((state) => state.users.data.activeUser.data.info.avatar_path);

	return (
		<AspectRatio
			width={['100%', '100%', '200px', '250px']}
			ratio={getRatio({ orientation: isMd ? 'portrait' : 'square' })}
			borderWidth={['0px', '0px', '4px', '6px']}
			borderStyle='solid'
			borderColor={getColor({ theme, colorMode, type: 'background' })}
			borderRadius='lg'
			overflowX='hidden'
			overflowY='hidden'
		>
			<Image
				alt={`${alt} Avatar`}
				width='inherit'
				height='inherit'
				borderRadius='none'
				src={{ full: avatar_path }}
			/>
		</AspectRatio>
	);
};

export default UserAvatar;
