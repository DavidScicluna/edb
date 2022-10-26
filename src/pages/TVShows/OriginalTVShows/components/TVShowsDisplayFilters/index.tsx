import { FC } from 'react';

import { Collapse } from '@davidscicluna/component-library';

import { DisplayFilters } from '../../../../../components';

import { TVShowsDisplayFiltersProps } from './types';

const TVShowsDisplayFilters: FC<TVShowsDisplayFiltersProps> = ({ total, onTagDelete, onClear }) => {
	return (
		<Collapse in={total > 0} style={{ width: '100%' }}>
			<DisplayFilters mediaType='tv' onTagDelete={onTagDelete} onClear={onClear} />
		</Collapse>
	);
};

export default TVShowsDisplayFilters;
