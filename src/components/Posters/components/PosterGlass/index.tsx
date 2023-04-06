import { FC } from 'react';

import { useTheme, Glass, GlassProps as PosterGlassProps, utils } from '@davidscicluna/component-library';

import { transparentize } from 'color2k';

import { useUserTheme } from '../../../../common/hooks';

const { getColor } = utils;

const PosterGlass: FC<PosterGlassProps> = ({ children, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<Glass
			{...rest}
			backgroundColor={transparentize(getColor({ theme, colorMode, type: 'dark' }), 0.25)}
			borderRadius='full'
			size={1}
			p={0.25}
		>
			{children}
		</Glass>
	);
};

export default PosterGlass;
