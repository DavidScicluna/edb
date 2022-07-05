import { ReactElement, useState, useCallback, useEffect } from 'react';

import { useTheme, IconButton, Icon } from '@davidscicluna/component-library';

import { useBoolean, Box, SlideFade } from '@chakra-ui/react';

import debounce from 'lodash/debounce';
import { useWindowSize } from 'usehooks-ts';

import { useSelector } from '../../../../common/hooks';
import Tooltip from '../../../../components/Tooltip';
import { defaultUser, getUser } from '../../../../store/slices/Users';

const ScrollToTop = (): ReactElement => {
	const theme = useTheme();

	const { height } = useWindowSize();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [scrollHeight, setScrollHeight] = useState<number>(0);

	const [isHovering, setIsHovering] = useBoolean();

	const handleScroll = useCallback(
		debounce(() => {
			const scroll = document?.scrollingElement?.scrollTop || 0;

			if (scroll <= height) {
				setIsHovering.off();
			}

			setScrollHeight(scroll);
		}, 250),
		[document, setScrollHeight]
	);

	useEffect(() => {
		handleScroll();

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<Box
			position='fixed'
			bottom={theme.space[2]}
			right={theme.space[2]}
			zIndex={theme.zIndices.toast}
			borderRadius='lg'
			boxShadow='lg'
			backgroundColor='transparent'
		>
			<SlideFade in={scrollHeight > screen.height} unmountOnExit offsetY={theme.space[2]}>
				<Tooltip
					aria-label='Scroll to top'
					label='Scroll to the top'
					placement='left'
					isOpen={isHovering}
					gutter={6}
				>
					<IconButton
						aria-label='Scroll to top'
						color={color}
						onClick={() => document.scrollingElement?.scrollTo(0, 0)}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
					>
						<Icon icon='arrow_upward' category='outlined' />
					</IconButton>
				</Tooltip>
			</SlideFade>
		</Box>
	);
};

export default ScrollToTop;
