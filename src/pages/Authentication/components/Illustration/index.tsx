import { ReactElement, forwardRef } from 'react';

import { useConst, Box } from '@chakra-ui/react';

import { sample } from 'lodash';

import signin from '../../../../common/assets/illustrations/signin';
import { useUserTheme } from '../../../../common/hooks';

import { IllustrationRef, IllustrationProps } from './types';

const illustrations: [1, 2, 3, 4, 5, 6] = [1, 2, 3, 4, 5, 6];

const Illustration = forwardRef<IllustrationRef, IllustrationProps>(function Illustration(props, ref): ReactElement {
	const { colorMode } = useUserTheme();

	const illustration = useConst<string>(signin[colorMode][sample(illustrations) || 3]);

	return (
		<Box
			{...props}
			ref={ref}
			width='50%'
			height='100vh'
			sx={{
				backgroundImage: `url(${illustration})`,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
			}}
		/>
	);
});

export default Illustration;
