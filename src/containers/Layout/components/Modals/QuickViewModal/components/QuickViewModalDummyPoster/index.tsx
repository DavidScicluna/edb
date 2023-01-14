import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Center, AspectRatio } from '@chakra-ui/react';

import { getRatio } from '../../../../../../../common/utils/ratio';
import { useUserTheme } from '../../../../../../../common/hooks';

import { QuickViewModalDummyPosterProps } from './types';

const QuickViewModalDummyPoster: FC<QuickViewModalDummyPosterProps> = (props) => {
	const { colorMode } = useUserTheme();

	return (
		<Center {...props} width='100%' height='auto'>
			<AspectRatio width='100%' height='auto' ratio={getRatio({ orientation: 'portrait' })} borderRadius='base'>
				{/* TODO: Go over all Skeleton check that we are passing colorMode */}
				<Skeleton colorMode={colorMode} borderRadius='base' isLoaded={false} variant='rectangle' />
			</AspectRatio>
		</Center>
	);
};

export default QuickViewModalDummyPoster;
