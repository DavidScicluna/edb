import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { transparentize } from 'color2k';

import { useUserTheme } from '../../../../common/hooks';
import Glass from '../../../Glass';
import { GlassProps as PosterGlassProps } from '../../../Glass/types';

const { getColor } = utils;

const PosterGlass: FC<PosterGlassProps> = ({ children, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<Glass
			{...rest}
			backgroundColor={transparentize(getColor({ theme, colorMode, type: 'dark' }), 0.25)}
			borderRadius='full'
			p={0.25}
		>
			{children}
		</Glass>
	);
};

export default PosterGlass;
