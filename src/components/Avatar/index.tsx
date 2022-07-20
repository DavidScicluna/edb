import { ReactElement, forwardRef } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { AspectRatio, Center } from '@chakra-ui/react';

import { getRatio } from '../../common/utils';
import Image from '../Image';

import { AvatarRef, AvatarProps } from './types';

const Avatar = forwardRef<AvatarRef, AvatarProps>(function Avatar(props, ref): ReactElement {
	const theme = useTheme();

	const { borderRadius, isLoading = false, size = theme.fontSizes['2xl'], ...rest } = props;

	return (
		<AspectRatio
			ref={ref}
			width={size}
			minWidth={size}
			maxWidth={size}
			height={size}
			minHeight={size}
			maxHeight={size}
			ratio={getRatio({ orientation: 'square' })}
		>
			<Center as={Skeleton} isLoaded={!isLoading} borderRadius={borderRadius}>
				<Image {...rest} borderRadius={borderRadius} />
			</Center>
		</AspectRatio>
	);
});

export default Avatar;
