import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Box } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';

const ViewHeroCoverDummyBackdrop: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<Box width='100%' height='100%' maxHeight='75vh' borderRadius='none'>
			{/* TODO: Go over all Skeleton check that we are passing colorMode */}
			<Skeleton colorMode={colorMode} borderRadius='none' isLoaded={false} variant='rectangle' />
		</Box>
	);
};

export default ViewHeroCoverDummyBackdrop;
