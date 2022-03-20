import { ReactElement } from 'react';

import { useColorMode, Center } from '@chakra-ui/react';

import { IconProps } from './types';

import * as fallback from '../../common/assets/fallback';
import { useSelector } from '../../common/hooks';

const Icon = (props: IconProps): ReactElement => {
	const { colorMode } = useColorMode();

	const hasLoaded = useSelector((state) => state.app.data.hasLoadedIcons);

	const { fontSize, icon, type, color, background, borderRadius, ...rest } = props;

	return (
		<Center
			{...rest}
			as='span'
			fontSize={fontSize}
			className={`material-icons${type === 'outlined' ? '-outlined' : ''} edb-icon`}
			sx={{
				maxWidth: fontSize || '24px',
				maxHeight: fontSize || '24px',

				color: !hasLoaded ? `gray.${colorMode === 'light' ? 200 : 700}` : color,
				background: !hasLoaded
					? `url(${colorMode === 'light' ? fallback.default.light : fallback.default.dark})`
					: background,
				borderRadius: !hasLoaded ? 'base' : borderRadius,

				overflow: 'hidden',
				whiteSpace: 'nowrap'
			}}
		>
			{hasLoaded ? icon : ''}
		</Center>
	);
};

export default Icon;
