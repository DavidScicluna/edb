import { Color } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

export type QuickToggle = {
	id: string;
	title: string;
};

export type QuickTogglesProps = {
	accordions: QuickToggle[];
	openedPanels: number;
	color?: Color;
	colorMode: ColorMode;
	isLoading?: boolean;
	isDisabled?: boolean;
	onToggleAccordion: (id: QuickToggle['id']) => void;
	onToggleAllAccordions: () => void;
};
