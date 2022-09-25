import { FC, useCallback } from 'react';

import { useTheme, Tooltip, IconButton, IconButtonIcon, ScaleFade, utils } from '@davidscicluna/component-library';

import { useBoolean, Center } from '@chakra-ui/react';

import { debounce } from 'lodash';
import { useWindowEventListener } from 'rooks';
import { useWindowSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../common/hooks';

const { convertREMToPixels, convertStringToNumber } = utils;

const ScrollToTop: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { height = 0 } = useWindowSize();

	const [isVisible, setIsVisible] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	const handleScroll = useCallback(
		debounce(() => {
			const scroll = document?.scrollingElement?.scrollTop || 0;

			if (scroll <= height) {
				setIsVisible.off();
				setIsHovering.off();
			} else {
				setIsVisible.on();
				setIsHovering.off();
			}
		}, 1000),
		[document, height]
	);

	useWindowEventListener('scroll', () => handleScroll());

	return (
		<Center
			position='fixed'
			bottom={`${convertREMToPixels(convertStringToNumber(theme.space[2], 'rem')) + 88}px`}
			right={theme.space[2]}
			zIndex={theme.zIndices.toast}
			background='transparent'
		>
			<ScaleFade in={isVisible}>
				<Tooltip
					colorMode={colorMode}
					aria-label='Scroll to top'
					label='Scroll to the top'
					placement='left'
					isOpen={isHovering}
				>
					<IconButton
						aria-label='Scroll to top'
						color={color}
						colorMode={colorMode}
						onClick={() => document.scrollingElement?.scrollTo(0, 0)}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
					>
						<IconButtonIcon icon='keyboard_double_arrow_up' category='outlined' />
					</IconButton>
				</Tooltip>
			</ScaleFade>
		</Center>
	);
};

export default ScrollToTop;
