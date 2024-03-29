import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { AspectRatio } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import { getRatio } from '../../../../../../common/utils/ratio';

const ViewVideosDummyVideo: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<AspectRatio
			width='100%'
			height='100%'
			overflow='hidden'
			borderRadius='lg'
			ratio={getRatio({ orientation: 'square' })}
		>
			<Skeleton colorMode={colorMode} width='inherit' height='inherit' isLoaded={false} variant='rectangle' />
		</AspectRatio>
	);
};

export default ViewVideosDummyVideo;
