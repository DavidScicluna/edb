import { ReactNode } from 'react';

import { Location } from 'react-router';

import { TabsOnChangeProps, TabListTab, TabsProps } from '@davidscicluna/component-library';

import {
	CastMovieCredit,
	CastTVCredit,
	Credits,
	CrewMovieCredit,
	CrewTVCredit
} from '../../../../../common/types/person';
import { UsePersonQueryResult } from '../../../../../common/queries/usePersonQuery';
import { UsePersonMovieCreditsQueryResult } from '../../../../../common/queries/usePersonMovieCreditsQuery';
import { UsePersonTVShowCreditsQueryResult } from '../../../../../common/queries/usePersonTVShowCreditsQuery';
import { UsePersonImagesQueryResult } from '../../../../../common/queries/usePersonImagesQuery';

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

export type PersonKnownForCredits = NonNullable<Credits['cast'] | Credits['crew']>;

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
	personQuery?: UsePersonQueryResult;
	movieCreditsQuery?: UsePersonMovieCreditsQueryResult;
	tvShowCreditsQuery?: UsePersonTVShowCreditsQueryResult;
	imagesQuery?: UsePersonImagesQueryResult;
	onSetActiveTab: (props: TabsOnChangeProps) => void;
};
