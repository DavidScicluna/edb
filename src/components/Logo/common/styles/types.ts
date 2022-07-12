import { Style, Theme } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import { UserThemeColor } from '../../../../store/slices/Users/types';
import { LogoProps } from '../../types';

export type LogoStyleProps = {
	theme: Theme;
	color: UserThemeColor;
	colorMode: ColorMode;
} & Pick<LogoProps, 'isClickable' | 'size'>;

export type LogoStyleReturn = {
	logo: Style;
};
