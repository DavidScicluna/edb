import { ReactElement, useCallback } from 'react';

import {
	ColorMode,
	useTheme,
	useColorMode,
	FormControl,
	FormLabel,
	InputGroup,
	Input as CUIInput,
	FormHelperText,
	HStack,
	Center,
	Collapse
} from '@chakra-ui/react';

import isNil from 'lodash/isNil';
import merge from 'lodash/merge';
import { useElementSize } from 'usehooks-ts';

import useStyles from './styles';
import { RenderProps, InputProps } from './types';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../common/utils';
import { Theme } from '../../../theme/types';

const Input = (props: InputProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const [inputLeftPanelRef, { width: inputLeftPanelWidth }] = useElementSize();
	const [inputRef, { width: inputWidth, height: inputHeight }] = useElementSize();
	const [inputRightPanelRef, { width: inputRightPanelWidth }] = useElementSize();

	const {
		autoComplete,
		color = 'gray',
		colorMode: colorModeProp,
		name,
		label,
		isDisabled = false,
		isRequired = false,
		isFullWidth = false,
		renderInputLeftPanel,
		renderInputRightPanel,
		error,
		size = 'md',
		sx,
		...rest
	} = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const renderProps: RenderProps = {
		fontSize: size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md',
		width: inputWidth,
		height: inputHeight
	};

	const style = useStyles(theme, { color, isDisabled, isFullWidth });

	const handleReturnInputWidth = useCallback((): number => {
		const hasLeft = !isNil(renderInputLeftPanel);
		const hasRight = !isNil(renderInputRightPanel);

		if (hasLeft || hasRight) {
			let width = handleConvertREMToPixels(
				handleConvertStringToNumber(
					size === 'sm' ? theme.space[0.5] : size === 'md' ? theme.space[1] : theme.space[2],
					'rem'
				)
			);

			if (hasLeft) {
				width = width + inputLeftPanelWidth;
			}

			if (hasRight) {
				width = width + inputRightPanelWidth;
			}

			return width;
		}
		return 0;
	}, [size, theme.space, renderInputLeftPanel, inputLeftPanelWidth, renderInputRightPanel, inputRightPanelWidth]);

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

			<HStack
				as={InputGroup}
				aria-invalid={!isNil(error)}
				justifyContent='stretch'
				spacing={size === 'sm' ? 0.5 : size === 'md' ? 1 : 2}
				sx={{
					...merge(style.group.default, style.group[size], style[colorMode].group.default, sx?.input || {})
				}}
				_invalid={{ ...merge(style[colorMode].group.invalid) }}
			>
				{renderInputLeftPanel ? (
					<Center ref={inputLeftPanelRef}>{renderInputLeftPanel({ ...renderProps })}</Center>
				) : null}
				<CUIInput
					{...rest}
					ref={inputRef}
					width={`calc(100% - ${handleReturnInputWidth()}px)`}
					autoComplete={autoComplete || 'off'}
					isInvalid={!isNil(error)}
					isRequired={isRequired}
					isDisabled={isDisabled}
					id={name}
					name={name}
					variant='unstyled'
					sx={{ ...merge(style.input.default, style.input[size], sx?.input || {}) }}
				/>
				{renderInputRightPanel ? (
					<Center ref={inputRightPanelRef}>{renderInputRightPanel({ ...renderProps })}</Center>
				) : null}
			</HStack>

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
