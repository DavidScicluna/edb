import { FC } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { ViewHeroCoverProps } from './types';

const ViewHeroCover: FC<ViewHeroCoverProps> = ({ renderPoster, renderBackdrop }) => {
	const theme = useTheme();

	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	return (
		<VStack
			width='100%'
			height='auto'
			alignItems='stretch'
			justifyContent='stretch'
			position='relative'
			borderRadius={`${theme.radii.lg} ${theme.radii.lg} 0px 0px`}
			overflowX='hidden'
			overflowY='hidden'
			spacing={0}
		>
			<Center
				position={['relative', 'relative', 'absolute']}
				zIndex={5}
				bottom={[0, 0, 2, 4]}
				left={[0, 0, 2, 4]}
				p={[2, 2, 0]}
			>
				{renderPoster()}
			</Center>

			{isMd && renderBackdrop()}
		</VStack>
	);
};

export default ViewHeroCover;
