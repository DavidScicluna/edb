import { ReactElement } from 'react';

import { Center, AspectRatio } from '@chakra-ui/react';

import { color } from '../../../..';
import { handleReturnRatio } from '../../../../../../../../common/utils';

const Logo = (): ReactElement => {
	return (
		<AspectRatio width='120px' ratio={handleReturnRatio('square')}>
			<Center
				sx={{
					borderWidth: '4px',
					borderStyle: 'solid',
					borderColor: `${color}.500`,
					borderRadius: 'full',

					backgroundColor: `${color}.500`,
					color: 'gray.50',

					fontFamily: '"Pacifico", cursive',
					fontSize: '5xl',
					fontWeight: 400,
					lineHeight: 'normal',
					textTransform: 'lowercase'
				}}
			>
				edb
			</Center>
		</AspectRatio>
	);
};

export default Logo;
