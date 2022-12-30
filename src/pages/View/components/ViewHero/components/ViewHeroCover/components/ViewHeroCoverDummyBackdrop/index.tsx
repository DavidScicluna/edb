import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { AspectRatio } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { getRatio } from '../../../../../../../../common/utils';

const ViewHeroCoverDummyBackdrop: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<AspectRatio
			width='100%'
			height='100%'
			maxHeight='75vh'
			borderRadius='none'
			ratio={getRatio({ orientation: 'landscape' })}
		>
			{/* TODO: Go over all Skeleton check that we are passing colorMode */}
			<Skeleton colorMode={colorMode} borderRadius='none' isLoaded={false} variant='rectangle' />
		</AspectRatio>
	);
};

export default ViewHeroCoverDummyBackdrop;
