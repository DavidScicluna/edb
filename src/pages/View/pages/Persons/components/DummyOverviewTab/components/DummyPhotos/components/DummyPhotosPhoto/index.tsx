import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { AspectRatio } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../../common/hooks';
import { getRatio } from '../../../../../../../../../../common/utils';

const DummyPhotosPhoto: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<AspectRatio
			width={['185px', '205px', '230px', '260px']}
			overflow='hidden'
			borderRadius='lg'
			ratio={getRatio({ orientation: 'portrait' })}
		>
			<Skeleton colorMode={colorMode} width='inherit' height='inherit' isLoaded={false} variant='rectangle' />
		</AspectRatio>
	);
};

export default DummyPhotosPhoto;
