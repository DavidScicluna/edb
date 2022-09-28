import { InternalLinkProps, TabsProps } from '@davidscicluna/component-library';

import { MediaType } from '../../../../../common/types';
import { PartialMovie } from '../../../../../common/types/movie';
import { PartialPerson } from '../../../../../common/types/person';
import { PartialTV } from '../../../../../common/types/tv';

type HomeHorizontalGridMediaType = Exclude<MediaType, 'company' | 'collection'>;

type MediaTypeBooleans = {
	[key in HomeHorizontalGridMediaType]: boolean;
};

type ToProps = { mediaType: HomeHorizontalGridMediaType };

export type HomeHorizontalGridProps = Pick<TabsProps, 'activeTab' | 'onChange'> & {
	title: string;
	subtitle?: string;
	to: (props: ToProps) => InternalLinkProps['to'];
	mediaTypes: HomeHorizontalGridMediaType[];
	data: { movie: PartialMovie[]; tv: PartialTV[]; person: PartialPerson[] };
	isLoading: MediaTypeBooleans;
	isError: MediaTypeBooleans;
	isSuccess: MediaTypeBooleans;
};
