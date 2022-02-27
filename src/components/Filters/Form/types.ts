import { ReactElement } from 'react';

import { MediaType, Icon, Genre, Certification } from '../../../common/types';
import { Color } from '../../../theme/types';

type FormDate = string | null;

type FormNumber = number | null;

export type Form = {
	date: { gte: FormDate; lte: FormDate };
	genres: Genre['id'][];
	certifications: Certification['certification'][];
	rating: FormNumber[];
	count: FormNumber[];
	runtime: FormNumber[];
	adult: boolean;
};

export type RenderButtonProps = {
	color: keyof Color;
	icon: Icon;
	onClick: () => void;
};

export type FiltersProps = {
	renderButton: (props: RenderButtonProps) => ReactElement;
	mediaType: Omit<MediaType, 'person' | 'collection' | 'company'>;
	onFilter: (filters: Form) => void;
};
