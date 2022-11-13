import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';

import Color from './components/Color';
import ColorMode from './components/ColorMode';
import { UserThemeCustomizationProps } from './types';

const UserThemeCustomization: FC<UserThemeCustomizationProps> = (props) => {
	const { form, color = defaultColor, colorMode = defaultColorMode } = props;

	return (
		<VStack width='100%' spacing={4}>
			<ColorMode form={form} color={color} colorMode={colorMode} />

			<Color form={form} color={color} colorMode={colorMode} />
		</VStack>
	);
};

export default UserThemeCustomization;
