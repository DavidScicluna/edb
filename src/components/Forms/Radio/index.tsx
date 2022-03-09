import { ReactElement } from 'react';

import { ColorMode, useTheme, useColorMode, Radio as CUIRadio } from '@chakra-ui/react';

import { merge } from 'lodash';

import useStyles from './styles';
import { RadioProps } from './types';

import { Theme } from '../../../theme/types';

const Radio = (props: RadioProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const { color, colorMode: colorModeProp, isChecked = false, isDisabled = false, ...rest } = props;

	const style = useStyles(theme, { color, isChecked, isDisabled });

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	return (
		<CUIRadio
			{...rest}
			color={color}
			isChecked={isChecked}
			isDisabled={isDisabled}
			sx={{ ...merge(style.radio, style[colorMode]) }}
		/>
	);
};

export default Radio;
