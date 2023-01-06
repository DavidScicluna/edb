import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { AspectRatio } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { getRatio, getRatioDimensions } from '../../../../../../../../common/utils';

const ViewHeroCoverDummyBackdrop: FC = () => {
	const { colorMode } = useUserTheme();

	const [aspectRatioRef, { width: aspectRatioWidth }] = useElementSize();

	return (
		<AspectRatio
			ref={aspectRatioRef}
			width='100%'
			height='100%'
			minHeight={getRatioDimensions({ width: aspectRatioWidth, orientation: 'landscape' })}
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
