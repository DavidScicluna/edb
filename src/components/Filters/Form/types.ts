import { ReactElement, ReactNode } from 'react';

import { Color } from '@davidscicluna/component-library';

import { Filters, FiltersMediaTypes } from '../types';

export type RenderButtonProps = {
	color: Color;
	icon: ReactNode;
	onClick: () => void;
};

export type FiltersFormProps = {
	renderButton: (props: RenderButtonProps) => ReactElement;
	mediaType: FiltersMediaTypes;
	onFilter: (filters: Filters) => void;
};
