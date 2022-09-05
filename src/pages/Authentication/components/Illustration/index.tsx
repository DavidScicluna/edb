import { ReactElement, forwardRef } from 'react';

import { useConst, Box } from '@chakra-ui/react';

import { sample } from 'lodash';

import signin from '../../../../common/assets/illustrations';
import { colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';

import { IllustrationIndex, IllustrationIndexes, IllustrationRef, IllustrationProps } from './types';

const illustrations: IllustrationIndexes = [1, 2, 3, 4, 5, 6];

const Illustration = forwardRef<IllustrationRef, IllustrationProps>(function Illustration(props, ref): ReactElement {
	const { colorMode = defaultColorMode } = props;

	const random = useConst<IllustrationIndex>(sample(illustrations) || 3);

	return (
		<Box
			{...props}
			ref={ref}
			width='50%'
			height='100vh'
			sx={{
				backgroundImage: `url(${signin[colorMode][random]})`,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
			}}
		/>
	);
});

export default Illustration;
