import { FC } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { Center, AspectRatio } from '@chakra-ui/react';

import { getRatio } from '../../../../common/utils/ratio';
import { useUserTheme } from '../../../../common/hooks';

import { ViewDummyPosterProps } from './types';

const ViewDummyPoster: FC<ViewDummyPosterProps> = ({ isFullWidth = false, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<Center {...rest} width={isFullWidth ? '100%' : theme.fontSizes['9xl']} height='auto'>
			<AspectRatio
				width={isFullWidth ? '100%' : theme.fontSizes['9xl']}
				height='auto'
				ratio={getRatio({ orientation: 'portrait' })}
				borderRadius='base'
			>
				{/* TODO: Go over all Skeleton check that we are passing colorMode */}
				<Skeleton colorMode={colorMode} borderRadius='base' isLoaded={false} variant='rectangle' />
			</AspectRatio>
		</Center>
	);
};

export default ViewDummyPoster;
