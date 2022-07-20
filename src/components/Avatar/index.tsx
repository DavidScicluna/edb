import { ReactElement, forwardRef, useState, useCallback } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { AspectRatio, Center } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import { getRatio } from '../../common/utils';
import Image from '../Image';

import { AvatarRef, AvatarProps } from './types';

const Avatar = forwardRef<AvatarRef, AvatarProps>(function Avatar(props, ref): ReactElement {
	const theme = useTheme();

	const { borderRadius, isLoading = false, size = 'md', ...rest } = props;

	const [fontSize, setFontSize] = useState<string>(theme.fontSizes[size]);

	const handeGetWidth = useCallback((): void => {
		setFontSize(theme.fontSizes[size]);
	}, [theme, size]);

	useUpdateEffect(() => handeGetWidth(), [size]);

	return (
		<AspectRatio ref={ref} width={fontSize} height={fontSize} ratio={getRatio({ orientation: 'square' })}>
			<Center as={Skeleton} isLoaded={!isLoading} borderRadius={borderRadius}>
				<Image {...rest} borderRadius={borderRadius} />
			</Center>
		</AspectRatio>
	);
});

export default Avatar;
