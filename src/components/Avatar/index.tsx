import React, { ReactElement, forwardRef } from 'react';

import { useTheme, AspectRatio, Center } from '@chakra-ui/react';

import { AvatarRef, AvatarProps } from './types';

import { handleReturnRatio } from '../../common/utils';
import { Theme } from '../../theme/types';
import Image from '../Image';
import Skeleton from '../Skeleton';

const Avatar = forwardRef<AvatarRef, AvatarProps>(function Avatar(props, ref): ReactElement {
	const theme = useTheme<Theme>();

	const { alt, borderRadius, isLoading = false, size = 'md', src, ...rest } = props;

	const handeReturnWidth = (): string => {
		switch (size) {
			case 'xs':
				return theme.fontSizes['xl'];
			case 'sm':
				return theme.fontSizes['3xl'];
			case 'lg':
				return theme.fontSizes['7xl'];
			case 'xl':
				return theme.fontSizes['9xl'];
			default:
				return theme.fontSizes['5xl'];
		}
	};

	return (
		<AspectRatio
			ref={ref}
			width={handeReturnWidth()}
			borderRadius={borderRadius}
			ratio={handleReturnRatio('square')}
		>
			<Center as={Skeleton} borderRadius={borderRadius} isLoaded={!isLoading}>
				<Image
					{...rest}
					alt={`${alt} Avatar`}
					boringType='beam'
					borderRadius={borderRadius}
					thumbnailSrc={src}
					fullSrc={src}
				/>
			</Center>
		</AspectRatio>
	);
});

export default Avatar;
