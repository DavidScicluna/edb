import React, { ReactElement } from 'react';

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
import _ from 'lodash';

import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { InputProps } from './types';

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
          isInvalid={!_.isNil(error)}
          sx={{ ..._.merge(style.formLabel.default, style.formLabel[size], style[colorMode].formLabel.default, sx) }}
          _invalid={{ ..._.merge(style[colorMode].formLabel.invalid) }}
        >
          {label}
        </FormLabel>
      ) : null}
      <CUIInput
        {...rest}
        autoComplete={autoComplete || 'off'}
        isInvalid={!_.isNil(error)}
        isRequired={isRequired}
        isDisabled={isDisabled}
        id={name}
        name={name}
        sx={{ ..._.merge(style.input.default, style.input[size], style[colorMode].input.default, sx) }}
        _invalid={{ ..._.merge(style[colorMode].input.invalid) }}
      />
      <Collapse in={!_.isNil(error)} unmountOnExit>
        <FormHelperText
          sx={{
            ..._.merge(style.formHelperText.default, style.formHelperText[size], style[colorMode].formHelperText, sx)
          }}
        >
          {error?.message || ''}
        </FormHelperText>
      </Collapse>
    </FormControl>
  );
};

export default Input;
