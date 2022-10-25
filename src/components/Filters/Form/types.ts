import { ReactElement, ReactNode } from 'react';

import { ButtonProps } from '@davidscicluna/component-library';

import { FiltersForm, FiltersMediaType } from '../types';

export type RenderButtonProps = Pick<ButtonProps, 'color' | 'colorMode' | 'onClick'> & {
	icon: ReactNode;
};

export type FiltersFormProps = {
	mediaType: FiltersMediaType;
	renderButton: (props: RenderButtonProps) => ReactElement;
	onFilter: (filters: FiltersForm) => void;
};
