import { ReactElement } from 'react';

import { ButtonSize, Color } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

export type DescriptionRef = HTMLDivElement | null;

export type RenderActionsProps = {
	color: Color;
	colorMode: ColorMode;
	size: ButtonSize;
};

export type ErrorProps = {
	code: number;
	title: string;
	subtitle: string;
	renderActions?: ({ color, colorMode, size }: RenderActionsProps) => ReactElement;
};
