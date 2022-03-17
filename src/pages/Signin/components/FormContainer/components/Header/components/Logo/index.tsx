import { ReactElement } from 'react';

import { useColorMode, Center, AspectRatio } from '@chakra-ui/react';

import { color } from '../../../..';
import { handleReturnRatio } from '../../../../../../../../common/utils';

const Logo = (): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<AspectRatio width='120px' ratio={handleReturnRatio('square')}>
			<Center
				sx={{
					borderWidth: '4px',
					borderStyle: 'solid',
					borderColor: `${color}.${colorMode === 'light' ? 500 : 400}`,
					borderRadius: 'full',

					backgroundColor: `${color}.${colorMode === 'light' ? 500 : 400}`,
					color: `gray.${colorMode === 'light' ? 50 : 900}`,

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
