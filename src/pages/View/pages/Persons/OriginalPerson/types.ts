import { ReactNode } from 'react';

import { Location } from 'react-router';

import { TabListTab, TabsOnChangeProps, TabsProps } from '@davidscicluna/component-library';

import { CastMovieCredit, CastTVCredit, CrewMovieCredit, CrewTVCredit } from '../../../../../common/types/person';
import { UseMediaTypeQueryResult } from '../../../../../common/queries/useMediaTypeQuery';
import { UsePersonCreditsQueryResult } from '../../../../../common/queries/usePersonCreditsQuery';
import { UseMediaTypeImagesQueryResult } from '../../../../../common/queries/useMediaTypeImagesQuery';

// TODO: Use TabListTabRenderProps type once exported
type RenderBadgeProps = Pick<TabsProps, 'color' | 'colorMode' | 'size'> & {
	isActive: boolean;
	total: number;
};

export type PersonTab = Pick<TabListTab, 'label'> & {
	path: Partial<Location>;
	renderBadge?: (props: RenderBadgeProps) => ReactNode;
};
export type PersonTabs = PersonTab[];

export type PersonParams = { id: string };

type PersonDepartmentID = 'acting' | string;

type PersonDepartmentLabel = 'Acting' | string;

export type PersonCredit = CastMovieCredit & CastTVCredit & CrewMovieCredit & CrewTVCredit;
export type PersonCredits<C> = Record<string, C[]>;

export type PersonDepartment<Cast extends PersonCredit, Crew extends PersonCredit> = {
	id: PersonDepartmentID;
	label: PersonDepartmentLabel;
	credits: {
		cast: PersonCredits<Cast>;
		crew: PersonCredits<Crew>;
	};
};
export type PersonDepartments<Cast extends PersonCredit, Crew extends PersonCredit> = PersonDepartment<Cast, Crew>[];

export type PersonMovieDepartment = PersonDepartment<CastMovieCredit, CrewMovieCredit>;
export type PersonMovieDepartments = PersonMovieDepartment[];

export type PersonTVShowDepartment = PersonDepartment<CastTVCredit, CrewTVCredit>;
export type PersonTVShowDepartments = PersonTVShowDepartment[];

export type PersonContext = {
	personQuery?: UseMediaTypeQueryResult<'person'>;
	movieCreditsQuery?: UsePersonCreditsQueryResult<'movie'>;
	tvShowCreditsQuery?: UsePersonCreditsQueryResult<'tv'>;
	imagesQuery?: UseMediaTypeImagesQueryResult;
	onSetActiveTab: (props: TabsOnChangeProps) => void;
};
