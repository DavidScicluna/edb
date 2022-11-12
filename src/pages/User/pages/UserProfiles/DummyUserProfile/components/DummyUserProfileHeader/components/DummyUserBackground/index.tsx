import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Box, AspectRatio } from '@chakra-ui/react';

import { colorMode as defaultColorMode } from '../../../../../../../../../common/data/defaultPropValues';

import { DummyUserBackgroundProps } from './types';

const DummyUserBackground: FC<DummyUserBackgroundProps> = ({ colorMode = defaultColorMode }) => {
	return (
		<Box width='inherit' height='inherit'>
			<AspectRatio borderRadius='none' ratio={20 / 5}>
				<Skeleton colorMode={colorMode} borderRadius='none' isLoaded={false} variant='rectangle' />
			</AspectRatio>
		</Box>
	);
};

export default DummyUserBackground;
