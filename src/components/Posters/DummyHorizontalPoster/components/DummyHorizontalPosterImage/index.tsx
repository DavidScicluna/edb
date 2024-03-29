import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { AspectRatio } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import { getRatio } from '../../../../../common/utils/ratio';

export const width = ['100px', '132px', '164px', '196px', '228px', '260px'];

const commonStyleProps = {
	width: 'inherit',
	height: 'inherit',
	borderRadius: 'inherit'
};

const DummyHorizontalPosterImage: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<AspectRatio
			{...commonStyleProps}
			width={width}
			ratio={getRatio({ orientation: 'portrait' })}
			overflow='hidden'
			borderRadius='base'
		>
			<Skeleton
				{...commonStyleProps}
				colorMode={colorMode}
				width='100%'
				height='100%'
				borderRadius='none'
				isLoaded={false}
			/>
		</AspectRatio>
	);
};

export default DummyHorizontalPosterImage;
