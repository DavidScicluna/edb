import { FC } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { AspectRatio } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import { getRatio } from '../../../../../common/utils/ratio';

const commonStyleProps = {
	width: 'inherit',
	height: 'inherit',
	borderRadius: 'inherit'
};

const DummyVerticalPosterImage: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<AspectRatio
			{...commonStyleProps}
			width='100%'
			ratio={getRatio({ orientation: 'portrait' })}
			overflow='hidden'
			borderRadius={`13px 13px ${theme.radii.none} ${theme.radii.none}`}
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

export default DummyVerticalPosterImage;
