import { ReactElement } from 'react';

import { Color } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant = 'transparent' | 'outlined';

export type EmptyProps = {
	button?: ReactElement;
	color?: Color;
	colorMode?: ColorMode;
	label: string;
	description?: string;
	hasIllustration?: boolean;
	size?: Size;
	variant?: Variant;
};
