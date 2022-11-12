import { FC } from 'react';

import { useConst, Box } from '@chakra-ui/react';

import { sample } from 'lodash';

import signin from '../../../../../../common/assets/illustrations';
import { colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';

import { IllustrationIndex, IllustrationIndexes, IllustrationProps } from './types';

const illustrations: IllustrationIndexes = [1, 2, 3, 4, 5, 6];

const Illustration: FC<IllustrationProps> = ({ colorMode = defaultColorMode, ...rest }) => {
	const random = useConst<IllustrationIndex>(sample(illustrations) || 3);

	return (
		<Box
			{...rest}
			sx={{
				backgroundImage: `url(${signin[colorMode][random]})`,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
			}}
		/>
	);
};

export default Illustration;
