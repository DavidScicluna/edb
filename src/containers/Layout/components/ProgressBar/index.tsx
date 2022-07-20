import { FC } from 'react';

import { ColorHues, useTheme, Collapse, utils } from '@davidscicluna/component-library';

import { Progress } from '@chakra-ui/react';

import { useIsFetching, useIsMutating } from 'react-query';

import { useSelector, useUserTheme } from '../../../../common/hooks';

const lightShades: ColorHues[] = [
	50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 800, 700, 600, 500, 400, 300, 200, 100, 50
];
const darkShades: ColorHues[] = [
	900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
];

const { getColor } = utils;

const ProgressBar: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const isQuickViewOpen = useSelector((state) => state.modals.ui.quickViewModal.isOpen);

	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	return (
		<Collapse
			in={!isQuickViewOpen && (isFetching > 0 || isMutating) > 0}
			unmountOnExit
			style={{ position: 'fixed', top: 0, zIndex: 950, width: '100%' }}
		>
			<Progress
				width='100%'
				height={theme.space['0.5']}
				background={getColor({ theme, colorMode, type: 'divider' })}
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
		</Collapse>
	);
};

export default ProgressBar;
