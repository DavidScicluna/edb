import { FC } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { AspectRatio } from '@chakra-ui/react';

import { getRatio } from '../../../../common/utils';
import { useUserTheme } from '../../../../common/hooks';

const ViewDummyPoster: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<AspectRatio width={theme.fontSizes['9xl']} ratio={getRatio({ orientation: 'portrait' })} borderRadius='base'>
			{/* TODO: Go over all Skeleton check that we are passing colorMode */}
			<Skeleton colorMode={colorMode} borderRadius='base' isLoaded={false} variant='rectangle' />
		</AspectRatio>
	);
};

export default ViewDummyPoster;
