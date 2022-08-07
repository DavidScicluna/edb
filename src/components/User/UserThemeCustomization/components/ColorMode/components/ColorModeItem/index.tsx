import { FC, useState } from 'react';

import { useTheme, Card, CardHeader, CardBody, Icon, ScaleFade, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../common/data/defaultPropValues';

import { ColorModeItemProps } from './types';

const { getColor, getColorMode } = utils;

const ColorModeItem: FC<ColorModeItemProps> = (props) => {
	const theme = useTheme();

	const {
		color = defaultColor,
		colorMode: colorModeProp = defaultColorMode,
		isActive = false,
		label,
		value,
		...rest
	} = props;

	const [colorMode, setcolorMode] = useState(colorModeProp === 'system' ? getColorMode() : colorModeProp);

	useUpdateEffect(() => setcolorMode(colorModeProp === 'system' ? getColorMode() : colorModeProp), [colorModeProp]);

	return (
		<Card
			{...rest}
			color={isActive ? color : 'gray'}
			colorMode={colorMode}
			isLight={!isActive}
			isClickable
			isFullWidth
			p={2}
		>
			<CardHeader
				renderTitle={(props) => (
					<Text {...props} fontSize='md' fontWeight='medium'>
						{label}
					</Text>
				)}
				actions={
					<ScaleFade in={isActive}>
						<Icon icon='check' color={getColor({ theme, colorMode, color, type: 'color' })} />
					</ScaleFade>
				}
			/>
			<CardBody>
				<Icon
					width={theme.fontSizes['8xl']}
					height={theme.fontSizes['8xl']}
					fontSize={theme.fontSizes['8xl']}
					icon={value === 'light' ? 'light_mode' : value === 'dark' ? 'dark_mode' : 'autorenew'}
				/>
			</CardBody>
		</Card>
	);
};

export default ColorModeItem;
