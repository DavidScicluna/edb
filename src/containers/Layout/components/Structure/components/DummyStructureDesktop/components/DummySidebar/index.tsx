import { FC } from 'react';

import { useTheme, Divider, Skeleton, utils } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import Logo from '../../../../../../../../components/Logo';
import { useSelector, useUserTheme } from '../../../../../../../../common/hooks';
import Navigation from '../../../Navigation';
import { useLayoutContext } from '../../../../../../common/hooks';

import DummyUser from './components/DummyUser';
import DummySignInButton from './components/DummySignInButton';

const { getColor } = utils;

const DummySidebar: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { isGuest } = useLayoutContext();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	return (
		<VStack
			width='100%'
			height='100vh'
			position='relative'
			alignItems='stretch'
			justifyContent='space-between'
			background={getColor({ theme, colorMode, type: 'background' })}
			borderRightWidth='2px'
			borderRightStyle='solid'
			borderRightColor={getColor({ theme, colorMode, type: 'divider' })}
			p={2}
			spacing={4}
		>
			<VStack width='100%' alignItems='flex-start' divider={<Divider colorMode={colorMode} />} spacing={2}>
				<Skeleton colorMode={colorMode} isLoaded={false} variant='rectangle'>
					<Logo isClickable={false} isSquare size={sidebarMode === 'expanded' ? 'xl' : 'md'} />
				</Skeleton>

				<Navigation isDummy />
			</VStack>

			{!isGuest ? <DummyUser /> : <DummySignInButton />}
		</VStack>
	);
};

export default DummySidebar;
