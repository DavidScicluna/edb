import { ReactElement } from 'react';

import { MediaType, Icon } from '../../../common/types';
import { Color } from '../../../theme/types';
import { Filters } from '../types';

export type RenderButtonProps = {
	color: keyof Color;
	icon: Icon;
	onClick: () => void;
};

export type FiltersProps = {
	renderButton: (props: RenderButtonProps) => ReactElement;
	mediaType: Omit<MediaType, 'person' | 'collection' | 'company'>;
	onFilter: (filters: Filters) => void;
};
