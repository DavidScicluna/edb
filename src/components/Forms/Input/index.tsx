import { ReactElement } from 'react';

import {
	ColorMode,
	useTheme,
	useColorMode,
	FormControl,
	FormLabel,
	Input as CUIInput,
	FormHelperText,
	Collapse
} from '@chakra-ui/react';

import isNil from 'lodash/isNil';
import merge from 'lodash/merge';

import useStyles from './styles';
import { InputProps } from './types';

import { Theme } from '../../../theme/types';

const Input = (props: InputProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const {
		autoComplete,
		color = 'gray',
		colorMode: colorModeProp,
		name,
		label,
		isDisabled = false,
		isRequired = false,
		isFullWidth = false,
		error,
		size = 'md',
		sx,
		...rest
	} = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const style = useStyles(theme, { color, isDisabled, isFullWidth });

	return (
		<FormControl id={name} isRequired={isRequired}>
			{label ? (
				<FormLabel
					sx={{
						...merge(
							style.formLabel.default,
							style.formLabel[size],
							style[colorMode].formLabel.default,
							sx?.formLabel || {}
						)
					}}
					_invalid={{ ...merge(style[colorMode].formLabel.invalid) }}
				>
					{label}
				</FormLabel>
			) : null}
			<CUIInput
				{...rest}
				autoComplete={autoComplete || 'off'}
				isInvalid={!isNil(error)}
				isRequired={isRequired}
				isDisabled={isDisabled}
				id={name}
				name={name}
				sx={{
					...merge(style.input.default, style.input[size], style[colorMode].input.default, sx?.input || {})
				}}
				_invalid={{ ...merge(style[colorMode].input.invalid) }}
			/>
			<Collapse in={!isNil(error)} unmountOnExit>
				<FormHelperText
					sx={{
						...merge(
							style.formHelperText.default,
							style.formHelperText[size],
							style[colorMode].formHelperText,
							sx?.formHelperText || {}
						)
					}}
				>
					{error?.message || ''}
				</FormHelperText>
			</Collapse>
		</FormControl>
	);
};

export default Input;
