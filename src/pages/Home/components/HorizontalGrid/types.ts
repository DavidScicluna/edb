import { MediaType } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';
import { LinkProps } from '../../../../components/Clickable/Link/types';

type MediaTypeBooleans = {
	[key in MediaType]?: boolean;
};

type ToProps = {
	mediaType: MediaType;
};

export type HomeHorizontalGridProps = {
	title: string;
	to: (props: ToProps) => LinkProps['to'];
	mediaTypes: MediaType[];
	data: {
		movie?: PartialMovie[];
		tv?: PartialTV[];
		person?: PartialPerson[];
	};
	isLoading: MediaTypeBooleans;
	isError: MediaTypeBooleans;
	isSuccess: MediaTypeBooleans;
};
