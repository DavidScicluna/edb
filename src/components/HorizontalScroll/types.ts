import { ReactElement } from 'react';

import { ColorMode } from '@chakra-ui/react';

export type HorizontalScrollRef = HTMLDivElement | null;

type RenderProps = {
	padding?: string;
};

export type HorizontalScrollProps = {
	children: ReactElement[];
	renderDivider?: (props: RenderProps) => ReactElement;
	colorMode?:ColorMode
	isFullWidth?: boolean;
	isDisabled?: boolean;
};
