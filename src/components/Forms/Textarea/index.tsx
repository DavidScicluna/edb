import { ReactElement } from 'react';

import {
	ColorMode,
	useTheme,
	useColorMode,
	FormControl,
	FormLabel,
	Textarea as CUITextarea,
	FormHelperText,
	Collapse
} from '@chakra-ui/react';

import isNil from 'lodash/isNil';
import merge from 'lodash/merge';

import { Theme } from '../../../theme/types';

import useStyles from './styles';
import { TextareaProps } from './types';


const Textarea = (props: TextareaProps): ReactElement => {
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
			<CUITextarea
				{...rest}
				autoComplete={autoComplete || 'off'}
				isInvalid={!isNil(error)}
				isRequired={isRequired}
				isDisabled={isDisabled}
				id={name}
				name={name}
				sx={{
					...merge(
						style.textarea.default,
						style.textarea[size],
						style[colorMode].textarea.default,
						sx?.textarea || {}
					)
				}}
				_invalid={{ ...merge(style[colorMode].textarea.invalid) }}
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

export default Textarea;
