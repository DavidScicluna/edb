import { FC } from 'react';

import { useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { useMediaQuery, AspectRatio } from '@chakra-ui/react';

import { getRatio } from '../../../../../../../../../common/utils';
import { colorMode as defaultColorMode } from '../../../../../../../../../common/data/defaultPropValues';

import { DummyUserAvatarProps } from './types';

const { getColor } = utils;

const DummyUserAvatar: FC<DummyUserAvatarProps> = ({ colorMode = defaultColorMode }) => {
	const theme = useTheme();
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

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
			<Skeleton colorMode={colorMode} borderRadius='none' isLoaded={false} variant='rectangle' />
		</AspectRatio>
	);
};

export default DummyUserAvatar;
