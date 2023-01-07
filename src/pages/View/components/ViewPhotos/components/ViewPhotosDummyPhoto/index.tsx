import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { AspectRatio } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import { getRatio } from '../../../../../../common/utils/ratio';

import { ViewPhotosDummyPhotoProps } from './types';

const ViewPhotosDummyPhoto: FC<ViewPhotosDummyPhotoProps> = (props) => {
	const { colorMode } = useUserTheme();

	const { data } = props;
	const { height, orientation } = data;

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
