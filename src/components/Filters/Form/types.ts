import { ReactElement, ReactNode } from 'react';

import { Color } from '../../../theme/types';
import { Filters, FiltersMediaTypes } from '../types';

export type RenderButtonProps = {
	color: keyof Color;
	icon: ReactNode;
	onClick: () => void;
};

export type FiltersFormProps = {
	renderButton: (props: RenderButtonProps) => ReactElement;
	mediaType: FiltersMediaTypes;
	onFilter: (filters: Filters) => void;
};
