import { ReactElement } from 'react';

import { ColorMode, useTheme, useColorMode, Button as CUIButton, Center } from '@chakra-ui/react';

import isNil from 'lodash/isNil';
import merge from 'lodash/merge';

import { Theme } from '../../../../../../../../../theme/types';

import useStyles from './styles';
import { DayProps } from './types';


const Day = (props: DayProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const { children, color = 'gray', colorMode: colorModeProp, variant = 'contained', ...rest } = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const style = useStyles(theme, { color });

	return (
		<CUIButton
			{...rest}
			tabIndex={0}
			variant='unstyled'
			sx={{ ...merge(style.day.default, style[colorMode][variant]) }}
			_disabled={{ ...merge(style.day.disabled, style[colorMode].disabled[variant]) }}
		>
			<Center sx={{ opacity: !isNil(children) ? 1 : 0 }}>{children || '#'}</Center>
		</CUIButton>
	);
};

export default Day;
