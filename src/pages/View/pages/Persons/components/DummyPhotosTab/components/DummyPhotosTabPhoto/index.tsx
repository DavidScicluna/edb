import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { useConst, AspectRatio } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import { getRatio } from '../../../../../../../../common/utils';
import { useUserTheme } from '../../../../../../../../common/hooks';

const DummyPhotosTabPhoto: FC = () => {
	const { colorMode } = useUserTheme();

	const heights = useConst<number[]>(range(250, 550, 75));
	const height = useConst<number>(sample(heights) || 400);

	return (
		<AspectRatio
			width='100%'
			height={`${height}px`}
			overflow='hidden'
			borderRadius='lg'
			ratio={getRatio({ orientation: 'portrait' })}
		>
			<Skeleton colorMode={colorMode} width='inherit' height='inherit' isLoaded={false} variant='rectangle' />
		</AspectRatio>
	);
};

export default DummyPhotosTabPhoto;
