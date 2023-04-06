import { FC } from 'react';

import { Image } from '@davidscicluna/component-library';

import { Box, AspectRatio } from '@chakra-ui/react';

import { useSelector } from '../../../../../../../../../common/hooks';

import { UserBackgroundProps } from './types';

const UserBackground: FC<UserBackgroundProps> = ({ alt }) => {
	const background_path = useSelector((state) => state.users.data.activeUser.data.info.background_path);

	return (
		<Box width='inherit' height='inherit'>
			<AspectRatio borderRadius='none' ratio={20 / 5}>
				<Image
					alt={`${alt} Background`}
					width='inherit'
					height='inherit'
					borderRadius='none'
					src={{ full: background_path }}
				/>
			</AspectRatio>
		</Box>
	);
};

export default UserBackground;
