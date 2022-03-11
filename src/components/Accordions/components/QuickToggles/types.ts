import { ColorMode } from '@chakra-ui/react';

import { Color } from '../../../../theme/types';

export type QuickToggle = {
	id: string;
	title: string;
};

export type QuickTogglesProps = {
	accordions: QuickToggle[];
	openedPanels: number;
	color?: keyof Color;
	colorMode: ColorMode;
	isLoading?: boolean;
	isDisabled?: boolean;
	onToggleAccordion: (id: QuickToggle['id']) => void;
	onToggleAllAccordions: () => void;
};
