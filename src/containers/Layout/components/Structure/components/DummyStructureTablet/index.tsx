import { FC, useContext } from 'react';

import {
	useTheme,
	Skeleton,
	DummyButton,
	DummyIconButton,
	IconButtonIcon,
	Fade,
	utils
} from '@davidscicluna/component-library';

import { VStack, HStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../common/hooks';
import Gradient from '../Gradient';
import {
	isGuest as defaultIsGuest,
	isAuthenticationRoute as defaultIsAuthenticationRoute
} from '../../../../common/data/defaultPropValues';
import { StructureCommonProps as DummyStructureTabletProps } from '../../common/types';
import InternationalizationIconButton from '../InternationalizationIconButton';
import { LayoutContext } from '../../../..';
import { LayoutContext as LayoutContextType } from '../../../../types';
import DummyFooter from '../Footer';

const { getColor } = utils;

const DummyStructureTablet: FC<DummyStructureTabletProps> = ({ children }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { isGuest = defaultIsGuest, isAuthenticationRoute = defaultIsAuthenticationRoute } =
		useContext<LayoutContextType>(LayoutContext);

	const [headerRef, { height: headerHeight }] = useElementSize();

	return (
		<VStack width='100%' minHeight='100vh' position='relative' spacing={0}>
			{!isAuthenticationRoute && (
				<HStack
					ref={headerRef}
					position='fixed'
					top={0}
					zIndex={1}
					width='100%'
					justifyContent='space-between'
					background={getColor({ theme, colorMode, type: 'background' })}
					borderBottomWidth='2px'
					borderBottomStyle='solid'
					borderBottomColor={getColor({ theme, colorMode, type: 'divider' })}
					p={2}
				>
					<DummyIconButton
						aria-label='SideBar Navigation Menu Dummy Button'
						colorMode={colorMode}
						variant='icon'
					>
						<IconButtonIcon icon='menu' />
					</DummyIconButton>

					<HStack spacing={1.5}>
						<Center as={Fade} in={location.pathname !== '/search'}>
							<DummyIconButton aria-label='Search Dummy Button' colorMode={colorMode} variant='icon'>
								<IconButtonIcon icon='search' />
							</DummyIconButton>
						</Center>

						<InternationalizationIconButton isDummy />

						{!isGuest ? (
							<Skeleton
								colorMode={colorMode}
								width={theme.fontSizes['5xl']}
								height={theme.fontSizes['5xl']}
								variant='circle'
							/>
						) : (
							<DummyButton color={color} colorMode={colorMode}>
								Sign in
							</DummyButton>
						)}
					</HStack>
				</HStack>
			)}

			{!isAuthenticationRoute && (
				<Center width='100%' position='fixed' top={`${headerHeight}px`} zIndex={1}>
					<Gradient deg={180} />
				</Center>
			)}

			<VStack
				width='100%'
				height='100%'
				minHeight={!isAuthenticationRoute ? `calc(100vh - ${headerHeight}px)` : '100vh'}
				position='relative'
				top={0}
				zIndex={0}
				alignItems='stretch'
				justifyContent='stretch'
				spacing={0}
				pt={!isAuthenticationRoute ? `${headerHeight}px` : 0}
			>
				<Center width='100%' height='100%' minHeight='100vh' alignItems='stretch' justifyContent='stretch'>
					{children}
				</Center>

				{!isAuthenticationRoute && <DummyFooter isDummy />}
			</VStack>
		</VStack>
	);
};

export default DummyStructureTablet;
