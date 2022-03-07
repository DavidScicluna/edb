import { ReactElement, forwardRef } from 'react';

import { useColorMode, Center } from '@chakra-ui/react';

import { IconRef, IconProps } from './types';

import * as fallback from '../../common/assets/fallback';
import { useSelector } from '../../common/hooks';

const Icon = forwardRef<IconRef, IconProps>(function Icon(props, ref): ReactElement {
	const { colorMode } = useColorMode();

	const hasLoaded = useSelector((state) => state.app.data.hasLoadedIcons);

	const { w, width, h, height, icon, type, color, background, borderRadius, ...rest } = props;

	return (
		<Center
			{...rest}
			as='span'
			ref={ref}
			w={w}
			width={width}
			h={h}
			height={height}
			className={`material-icons${type === 'outlined' ? '-outlined' : ''} edb-icon`}
			sx={{
				maxWidth: w || width || '24px',
				maxHeight: h || height || '24px',

				color: !hasLoaded ? `gray.${colorMode === 'light' ? 200 : 700}` : color,
				background: !hasLoaded
					? `url(${colorMode === 'light' ? fallback.default.light : fallback.default.dark})`
					: background,
				borderRadius: !hasLoaded ? 'base' : borderRadius,

				overflow: 'hidden',
				textTransform: 'ellipsis',
				whiteSpace: 'nowrap'
			}}
		>
			{hasLoaded ? icon : ''}
		</Center>
	);
});

export default Icon;
