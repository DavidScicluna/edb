import { FC, useState } from 'react';

import { useTheme, Card, CardHeader, CardBody, Icon, ScaleFade, utils } from '@davidscicluna/component-library';

import { ColorMode, Center, Text } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../common/data/defaultPropValues';

import { ColorItemProps } from './types';

const { getColor, getColorMode } = utils;

const ColorItem: FC<ColorItemProps> = (props) => {
	const theme = useTheme();

	const { label, color = defaultColor, colorMode: userColorMode = defaultColorMode, isActive, ...rest } = props;

	const [colorMode, setColorMode] = useState<ColorMode>(userColorMode === 'system' ? getColorMode() : userColorMode);

	useUpdateEffect(() => setColorMode(userColorMode === 'system' ? getColorMode() : userColorMode), [userColorMode]);

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
					<ScaleFade in={isActive} unmountOnExit={false}>
						<Icon icon='check' color={getColor({ theme, colorMode, color, type: 'color' })} />
					</ScaleFade>
				}
			/>
			<CardBody>
				<Center
					width='100%'
					height={theme.fontSizes['8xl']}
					background={getColor({ theme, colorMode, color, type: 'color' })}
					borderRadius='base'
				/>
			</CardBody>
		</Card>
	);
};

export default ColorItem;
