import { PartialTV } from '../../../../../../../common/types/tv';

export type HorizontalSearchTVProps = {
	query: string;
	shows?: PartialTV[];
	total?: number;
};
