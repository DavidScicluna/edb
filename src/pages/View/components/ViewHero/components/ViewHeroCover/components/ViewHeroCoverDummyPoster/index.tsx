import { FC } from 'react';

import { useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { Box } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';

const { getColor } = utils;

const ViewHeroCoverDummyPoster: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<Box
			width={['100%', '100%', '250px', '300px']}
			borderWidth={['0px', '0px', '4px', '4px']}
			borderStyle='solid'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='base'
		>
			{/* TODO: Go over all Skeleton check that we are passing colorMode */}
			<Skeleton colorMode={colorMode} borderRadius='base' isLoaded={false} variant='rectangle' />
		</Box>
	);
};

export default ViewHeroCoverDummyPoster;
