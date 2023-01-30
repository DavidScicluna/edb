import { AccordionType } from '@davidscicluna/component-library';

import { UseMediaTypeCreditsQueryResult } from '../../../../../common/queries/useMediaTypeCreditsQuery';
import { MediaType } from '../../../../../common/types';
import { MovieCrew as MovieCrew } from '../../../../../common/types/movie';
import { TVShowCrew as TVShowCrew } from '../../../../../common/types/tv';

export type ViewCrewMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewCrewGetDepartmentType<MT extends ViewCrewMediaType> = MT extends 'movie' ? MovieCrew : TVShowCrew;

export type ViewCrewDepartment<MT extends ViewCrewMediaType> = AccordionType<ViewCrewGetDepartmentType<MT>[]>;
export type ViewCrewDepartments<MT extends ViewCrewMediaType> = ViewCrewDepartment<MT>[];

type Picked = 'isFetching' | 'isLoading' | 'isError' | 'isSuccess' | 'refetch';

export type ViewCrewProps<MT extends ViewCrewMediaType> = Partial<Pick<UseMediaTypeCreditsQueryResult<MT>, Picked>> & {
	mediaType: MT;
	departments?: ViewCrewDepartments<MT>;
	name?: string;
	isLoading?: boolean;
	isError?: boolean;
	isSuccess?: boolean;
	refetch?: () => void;
};
