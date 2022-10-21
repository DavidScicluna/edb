import { ReactNode } from 'react';

import { ButtonProps } from '@davidscicluna/component-library';

import { MediaType } from '../../common/types';

export type SortByMediaType = Exclude<MediaType, 'person' | 'collection' | 'company'>;

export type Sort = { label: string; value: string };
export type SortBy = Sort[];

export type SortDirection = 'asc' | 'desc';

export type SortByForm = {
	sortBy: Sort;
	direction: SortDirection;
};

export type RenderButtonProps = Pick<ButtonProps, 'color' | 'colorMode' | 'onClick'> & {
	icon: ReactNode;
};

export type SortByProps = {
	mediaType: SortByMediaType;
	renderButton: (props: RenderButtonProps) => ReactNode;
	onSort: (form: SortByForm) => void;
};
