import { FC, useCallback } from 'react';

import { useTheme, Tooltip, IconButton, Icon, ScaleFade } from '@davidscicluna/component-library';

import { useBoolean, Center } from '@chakra-ui/react';

import { debounce } from 'lodash';
import { useWindowEventListener, useWindowSize } from 'rooks';

import { useUserTheme } from '../../../../common/hooks';

const ScrollToTop: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { height } = useWindowSize();

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
				setIsHovering.on();
			}
		}, 250),
		[document, height]
	);

	useWindowEventListener('scroll', () => handleScroll());

	return (
		<Center
			position='fixed'
			bottom={theme.space[2]}
			right={theme.space[2]}
			zIndex={theme.zIndices.toast}
			// borderRadius='lg'
			// boxShadow='lg'
			background='transparent'
			backgroundColor='transparent'
		>
			<ScaleFade in={isVisible} unmountOnExit>
				<Tooltip
					colorMode={colorMode}
					aria-label='Scroll to top'
					label='Scroll to the top'
					placement='left'
					isOpen={isHovering}
					// gutter={6}
				>
					<IconButton
						aria-label='Scroll to top'
						color={color}
						colorMode={colorMode}
						onClick={() => document.scrollingElement?.scrollTo(0, 0)}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
					>
						<Icon colorMode={colorMode} icon='keyboard_double_arrow_up' category='outlined' />
					</IconButton>
				</Tooltip>
			</ScaleFade>
		</Center>
	);
};

export default ScrollToTop;
