import { MediaType } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';
import { LinkProps } from '../../../../components/Clickable/Link/types';
import { HorizontalGridTabbedRef } from '../../../../components/Grid/Horizontal/Tabbed/types';

export type HomeHorizontalGridRef = HorizontalGridTabbedRef;

type MediaTypeBooleans = {
	[key in MediaType]?: boolean;
};

type ToProps = {
	mediaType: MediaType;
};

export type HomeHorizontalGridProps = {
	activeTab: number;
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
	onTabChange: (index: number) => void;
};
