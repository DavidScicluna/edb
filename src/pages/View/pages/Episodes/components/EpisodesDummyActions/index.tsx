import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, HStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../common/hooks';

import { EpisodesDummyActionsProps } from './types';

const EpisodesDummyActions: FC<EpisodesDummyActionsProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	const { spacing } = useLayoutContext();

	return isMd ? (
		<VStack {...props} width='100%' spacing={spacing}>
			<DummyButton colorMode={colorMode} isFullWidth size={isSm ? 'md' : 'lg'} variant='outlined'>
				Go back to TV Show seasons
			</DummyButton>

			<HStack width='100%' spacing={spacing}>
				<DummyButton colorMode={colorMode} hasLeft isFullWidth size={isSm ? 'md' : 'lg'} variant='outlined'>
					S# • E#
				</DummyButton>

				<DummyButton colorMode={colorMode} hasRight isFullWidth size={isSm ? 'md' : 'lg'} variant='outlined'>
					S# • E#
				</DummyButton>
			</HStack>
		</VStack>
	) : (
		<HStack {...props} width='100%' spacing={spacing}>
			<DummyButton colorMode={colorMode} hasLeft size={isSm ? 'md' : 'lg'} variant='outlined'>
				S# • E#
			</DummyButton>
			<DummyButton colorMode={colorMode} isFullWidth size={isSm ? 'md' : 'lg'} variant='outlined'>
				Go back to TV Show seasons
			</DummyButton>
			<DummyButton colorMode={colorMode} hasRight size={isSm ? 'md' : 'lg'} variant='outlined'>
				S# • E#
			</DummyButton>
		</HStack>
	);
};

export default EpisodesDummyActions;
