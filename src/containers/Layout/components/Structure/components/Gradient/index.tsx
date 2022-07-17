import { FC, useState } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { transparentize } from 'color2k';
import { useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../common/hooks';

import { GradientProps } from './types';

const { getColor } = utils;

const Gradient: FC<GradientProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [color, setColor] = useState<string>(getColor({ theme, colorMode, type: 'background' }));

	useUpdateEffect(() => setColor(getColor({ theme, colorMode, type: 'background' })), [colorMode]);

	return (
		<Center
			{...props}
			width='100%'
			height={theme.space[4]}
			sx={{
				background: `linear-gradient(0deg, ${transparentize(color, 0)} 25%, ${transparentize(color, 1)} 100%)`
			}}
		/>
	);
};

export default Gradient;
