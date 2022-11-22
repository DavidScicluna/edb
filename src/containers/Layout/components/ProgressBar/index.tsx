import { FC, useState, useCallback, useEffect } from 'react';

import { useLocation } from 'react-router';

import { useTheme, Collapse, utils } from '@davidscicluna/component-library';

import { useBoolean, Progress } from '@chakra-ui/react';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';

import { toRgba } from 'color2k';
import { useUpdateEffect } from 'usehooks-ts';

import { useSelector, useUserTheme } from '../../../../common/hooks';

import { ProgressBarProps } from './types';

const { getColor } = utils;

const ProgressBar: FC<ProgressBarProps> = ({ maxWidth }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const location = useLocation();

	const isQuickViewOpen = useSelector((state) => state.modals.ui.quickViewModal.isOpen);

	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	const [isRerouting, setIsReouting] = useBoolean();

	const [dividerColor, setDividerColor] = useState(getColor({ theme, colorMode, type: 'divider' }));

	const handleIsReouting = useCallback((): void => {
		setIsReouting.on();

		setTimeout(() => setIsReouting.off(), 2500);
	}, []);

	useEffect(() => handleIsReouting(), [location.key]);

	useUpdateEffect(() => setDividerColor(getColor({ theme, colorMode, type: 'divider' })), [colorMode]);

	return (
		<Collapse
			in={!isQuickViewOpen && (isRerouting || isFetching > 0 || isMutating) > 0}
			style={{ width: '100%', maxWidth, position: 'fixed', top: 0, zIndex: theme.zIndices.banner }}
		>
			<Progress
				width='100%'
				height={theme.space['0.75']}
				background={dividerColor}
				borderRadius='none'
				isIndeterminate
				variant='unstyled'
				sx={{
					'& div': {
						background: `linear-gradient(90deg, ${toRgba(dividerColor)} 0%, ${toRgba(
							getColor({ theme, colorMode, color, type: 'color' })
						)} 50%, ${toRgba(dividerColor)} 100%)`
					}
				}}
			/>
		</Collapse>
	);
};

export default ProgressBar;
