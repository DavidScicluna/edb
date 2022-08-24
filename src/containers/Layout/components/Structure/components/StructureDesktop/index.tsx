import { FC, useState } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { HStack, Center, VStack } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import { isGuest as defaultIsGuest } from '../../common/data/defaultPropValues';
import { StructureCommonProps as StructureDesktopProps } from '../../common/types';
import { useSelector } from '../../../../../../common/hooks';
import useStyle from '../../../../common/styles';
import { sidebar } from '../../../../common/data/sidebar';

import Sidebar from './components/Sidebar';

const StructureDesktop: FC<StructureDesktopProps> = ({ children, isGuest = defaultIsGuest }) => {
	const theme = useTheme();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const [sidebarWidth, setSidebarWidth] = useState<number>(sidebar[sidebarMode]);

	const style = useStyle({ theme });

	useUpdateEffect(() => setSidebarWidth(sidebar[sidebarMode]), [sidebarMode]);

	return (
		<HStack width='100%' minHeight='100vh' position='relative' spacing={0} sx={{ ...style }}>
			<Center width={sidebarWidth} position='fixed' top={0} left={0} sx={{ ...style }}>
				<Sidebar isGuest={isGuest} />
			</Center>

			<VStack
				width={`calc(100% - ${sidebarWidth}px)`}
				minHeight='100vh'
				position='absolute'
				top={0}
				left={`${sidebarWidth}px`}
				alignItems='center'
				justifyContent='center'
				spacing={0}
				sx={{ ...style }}
			>
				{children}

				{/* <VStack width='100%' spacing={4} sx={{ ...style }}>
					<Box
						width='100%'
						minHeight={`calc(100vh - ${
							headerHeight + convertREMToPixels(convertStringToNumber(theme.space[4], 'rem'))
						}px)`}
						sx={{ ...style }}
					>
						<Outlet />
					</Box>

					{/* <Footer /> */}
				{/* </VStack> */}
			</VStack>
		</HStack>
	);
};

export default StructureDesktop;
