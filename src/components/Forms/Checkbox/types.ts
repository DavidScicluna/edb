import { ColorMode, CheckboxProps as CUICheckboxProps } from '@chakra-ui/react';

import { Color } from '../../../theme/types';

export type CheckboxProps = { color?: keyof Color; colorMode?: ColorMode } & Omit<
	CUICheckboxProps,
	'color' | 'colorScheme' | 'iconColor' | 'size' | 'value' | 'variant'
>;
