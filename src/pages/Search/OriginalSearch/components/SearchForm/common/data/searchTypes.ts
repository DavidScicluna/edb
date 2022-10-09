import { ButtonColor } from '@davidscicluna/component-library';

import { UserSearchType } from '../../../../../../../store/slices/Users/types';

export type SearchType = {
	value: UserSearchType;
	label: string;
	color: ButtonColor;
};

const searchTypes: SearchType[] = [
	{
		value: 'movie',
		label: 'Movies',
		color: 'blue'
	},
	{
		value: 'tv',
		label: 'TV Shows',
		color: 'orange'
	},
	{
		value: 'person',
		label: 'People',
		color: 'yellow'
	},
	{
		value: 'collection',
		label: 'Collections',
		color: 'pink'
	},
	{
		value: 'company',
		label: 'Companies',
		color: 'purple'
	}
];

export default searchTypes;
