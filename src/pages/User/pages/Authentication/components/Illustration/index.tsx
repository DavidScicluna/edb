import { FC } from 'react';

import { useOutletContext } from 'react-router';

import { useConst, Box } from '@chakra-ui/react';

import { sample } from 'lodash';

import signin from '../../../../../../common/assets/illustrations';
import { colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../types';

import { IllustrationIndex, IllustrationIndexes, IllustrationProps } from './types';

const illustrations: IllustrationIndexes = [1, 2, 3, 4, 5, 6];

const Illustration: FC<IllustrationProps> = (props) => {
	const { colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	const random = useConst<IllustrationIndex>(sample(illustrations) || 3);

	return (
		<Box
			{...props}
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
