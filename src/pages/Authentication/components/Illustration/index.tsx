import { FC } from 'react';

import { useConst, Box } from '@chakra-ui/react';

import { sample } from 'lodash';

import signin from '../../../../common/assets/illustrations/signin';
import { useUserTheme } from '../../../../common/hooks';

const illustrations: [1, 2, 3, 4, 5, 6] = [1, 2, 3, 4, 5, 6];

const Illustration: FC = () => {
	const { colorMode } = useUserTheme();

	const illustration = useConst<string>(signin[colorMode][sample(illustrations) || 3]);

	return (
		<Box
			width='100%'
			height='inherit'
			sx={{
				backgroundImage: `url(${illustration})`,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
			}}
		/>
	);
};

export default Illustration;
