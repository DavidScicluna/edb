import { ReactElement, forwardRef } from 'react';

import { useColorMode, Center } from '@chakra-ui/react';

import { IconRef, IconProps } from './types';

import * as fallback from '../../common/assets/fallback';
import { useSelector } from '../../common/hooks';

const Icon = forwardRef<IconRef, IconProps>(function Icon(props, ref): ReactElement {
	const { colorMode } = useColorMode();

	const hasLoaded = useSelector((state) => state.app.data.hasLoadedIcons);

	const { icon, type, color, background, borderRadius, ...rest } = props;

	return (
		<Center
			{...rest}
			ref={ref}
			alt={`${icon} icon`}
			className={`material-icons${type === 'outlined' ? '-outlined' : ''} edb-icon`}
			sx={{
				color: !hasLoaded ? `gray.${colorMode === 'light' ? 200 : 700}` : color,
				background: !hasLoaded
					? `url(${colorMode === 'light' ? fallback.default.light : fallback.default.dark})`
					: background,
				borderRadius: !hasLoaded ? 'base' : borderRadius
			}}
		>
			{hasLoaded ? icon : ''}
		</Center>
	);
});

export default Icon;