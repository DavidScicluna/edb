import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { AspectRatio, Center } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import { getRatio } from '../../../../../common/utils';

const commonStyleProps = {
	width: 'inherit',
	height: 'inherit',
	borderRadius: 'inherit'
};

const DummyVerticalPosterImage: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<AspectRatio width='100%' borderRadius='base' ratio={getRatio({ orientation: 'portrait' })}>
			<Skeleton {...commonStyleProps} colorMode={colorMode} isLoaded={false}>
				<Center />
			</Skeleton>
		</AspectRatio>
	);
};

export default DummyVerticalPosterImage;
