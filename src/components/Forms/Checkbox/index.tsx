import { ReactElement } from 'react';

import { ColorMode, useTheme, useColorMode, Checkbox as CUICheckbox } from '@chakra-ui/react';

import merge from 'lodash/merge';

import { Theme } from '../../../theme/types';

import useStyles from './styles';
import { CheckboxProps } from './types';


const Checkbox = (props: CheckboxProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const { color, colorMode: colorModeProp, isChecked = false, isDisabled = false, ...rest } = props;

	const style = useStyles(theme, { color, isChecked, isDisabled });

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	return (
		<CUICheckbox
			{...rest}
			color={color}
			isChecked={isChecked}
			isDisabled={isDisabled}
			sx={{ ...merge(style.checkbox, style[colorMode]) }}
		/>
	);
};

export default Checkbox;
