import { ReactNode } from 'react';

import { MediaType } from '../../../../common/types';

type RenderProps = {
	isActive: boolean;
	fontSize: string;
};

export type MediaTypeItem = {
	renderLeft: (props: RenderProps) => ReactNode;
	label: string;
	value: MediaType;
};

export type MediaTypeItemProps = {
	isActive?: boolean;
	onClick: (mediaType: MediaType) => void;
} & MediaTypeItem;
