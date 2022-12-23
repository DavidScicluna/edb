import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { useConst, AspectRatio } from '@chakra-ui/react';

import { sample } from 'lodash';

import {
	landscapeDefaultHeight,
	landscapeHeights,
	portraitDefaultHeight,
	portraitHeights,
	squareDefaultHeight,
	squareHeights
} from '../../common/data/heights';
import { useUserTheme } from '../../../../../../common/hooks';
import { getRatio } from '../../../../../../common/utils';

import { ViewPhotosDummyPhotoProps } from './types';

const ViewPhotosDummyPhoto: FC<ViewPhotosDummyPhotoProps> = ({ orientation }) => {
	const { colorMode } = useUserTheme();

	const height = useConst<number>(
		orientation === 'landscape'
			? sample(landscapeHeights) || landscapeDefaultHeight
			: orientation === 'portrait'
			? sample(portraitHeights) || portraitDefaultHeight
			: sample(squareHeights) || squareDefaultHeight
	);

	return (
		<AspectRatio
			width='100%'
			height={`${height}px`}
			overflow='hidden'
			borderRadius='lg'
			ratio={getRatio({ orientation })}
		>
			<Skeleton colorMode={colorMode} width='inherit' height='inherit' isLoaded={false} variant='rectangle' />
		</AspectRatio>
	);
};

export default ViewPhotosDummyPhoto;
