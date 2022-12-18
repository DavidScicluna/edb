import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { AspectRatio } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import { getRatio } from '../../../../../../common/utils';
import widths from '../../common/data/widths';

const ViewVideosHorizontalGridDummyVideo: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<AspectRatio width={widths} overflow='hidden' borderRadius='lg' ratio={getRatio({ orientation: 'square' })}>
			<Skeleton colorMode={colorMode} width='inherit' height='inherit' isLoaded={false} variant='rectangle' />
		</AspectRatio>
	);
};

export default ViewVideosHorizontalGridDummyVideo;
