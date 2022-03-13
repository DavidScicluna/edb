import { ReactElement } from 'react';

import { ColorMode } from '@chakra-ui/react';

import { Color } from '../../theme/types';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant = 'transparent' | 'outlined';

export type EmptyProps = {
	button?: ReactElement;
	color?: keyof Color;
	colorMode?: ColorMode;
	label: string;
	description?: string;
	hasIllustration?: boolean;
	size?: Size;
	variant?: Variant;
};
