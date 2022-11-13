import { FC } from 'react';

import { useOutletContext } from 'react-router';

import UserThemeCustomization from '../../../../../../components/UserThemeCustomization';
import { AuthenticationOutletContext } from '../../../../types';
import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';

import { CustomizationStepProps } from './types';

const CustomizationStep: FC<CustomizationStepProps> = (props) => {
	const { color = defaultColor, colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	return <UserThemeCustomization {...props} color={color} colorMode={colorMode} />;
};

export default CustomizationStep;
