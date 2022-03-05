import { ReactElement } from 'react';

import { useColorMode, Progress } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import { ColorShades } from '../../../../theme/types';

const lightShades: ColorShades[] = [
	50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 800, 700, 600, 500, 400, 300, 200, 100, 50
];
const darkShades: ColorShades[] = [
	900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
];

const ProgressBar = (): ReactElement => {
	const { colorMode } = useColorMode();

	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<Progress
			width='100%'
			height='4px'
			background={`gray.${colorMode === 'light' ? 200 : 700}`}
			borderRadius='none'
			isIndeterminate
			hasStripe
			variant='unstyled'
			sx={{
				'& div': {
					bgGradient: `linear(to-r, ${(colorMode === 'light' ? lightShades : darkShades)
						.map((shade) => `${color}.${shade}`)
						.join(', ')})`
				}
			}}
		/>
	);
};

export default ProgressBar;
