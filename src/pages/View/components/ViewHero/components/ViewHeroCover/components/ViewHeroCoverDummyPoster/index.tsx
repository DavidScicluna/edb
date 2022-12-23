import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Box } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';

const ViewHeroCoverDummyPoster: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<Box width={['100%', '100%', '250px', '300px']} borderRadius='base'>
			{/* TODO: Go over all Skeleton check that we are passing colorMode */}
			<Skeleton colorMode={colorMode} borderRadius='base' isLoaded={false} variant='rectangle' />
		</Box>
	);
};

export default ViewHeroCoverDummyPoster;
