import { Location } from 'react-router';

import { TabListTab } from '@davidscicluna/component-library';

export type DummyMovieTab = Pick<TabListTab, 'label'> & { path: Partial<Location> };
export type DummyMovieTabs = DummyMovieTab[];
