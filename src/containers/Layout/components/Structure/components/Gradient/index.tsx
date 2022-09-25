import { FC, useContext, useState } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { transparentize } from 'color2k';
import { useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../common/hooks';
import { LayoutContext } from '../../../..';
import { LayoutContext as LayoutContextType } from '../../../../types';
import { spacing as defaultSpacing } from '../../../../common/data/defaultPropValues';

import { GradientProps } from './types';

const { getColor } = utils;

const Gradient: FC<GradientProps> = ({ deg = 0, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { spacing = defaultSpacing } = useContext<LayoutContextType>(LayoutContext);

	const [color, setColor] = useState<string>(getColor({ theme, colorMode, type: 'background' }));

	useUpdateEffect(() => setColor(getColor({ theme, colorMode, type: 'background' })), [colorMode]);

	return (
		<Center
			{...rest}
			width='100%'
			height={theme.space[spacing]}
			sx={{
				background: `linear-gradient(${deg}deg, ${transparentize(color, 0)} 0%, ${transparentize(
					color,
					1
				)} 100%)`
			}}
		/>
	);
};

export default Gradient;
