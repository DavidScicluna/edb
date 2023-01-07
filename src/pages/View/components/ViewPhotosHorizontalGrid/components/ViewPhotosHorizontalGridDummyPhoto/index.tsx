import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { AspectRatio } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import { getRatio } from '../../../../../../common/utils/ratio';
import { getDimensions } from '../../common/utils';

import { ViewPhotosHorizontalGridDummyPhotoProps } from './types';

const ViewPhotosHorizontalGridDummyPhoto: FC<ViewPhotosHorizontalGridDummyPhotoProps> = ({ orientation }) => {
	const { colorMode } = useUserTheme();

	return (
		<AspectRatio
			width={getDimensions({ orientation })}
			overflow='hidden'
			borderRadius='lg'
			ratio={getRatio({ orientation })}
		>
			<Skeleton colorMode={colorMode} width='inherit' height='inherit' isLoaded={false} variant='rectangle' />
		</AspectRatio>
	);
};

export default ViewPhotosHorizontalGridDummyPhoto;
