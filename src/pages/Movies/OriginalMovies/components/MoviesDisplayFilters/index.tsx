import { FC } from 'react';

import { Collapse } from '@davidscicluna/component-library';

import { DisplayFilters } from '../../../../../components';

import { MoviesDisplayFiltersProps } from './types';

const MoviesDisplayFilters: FC<MoviesDisplayFiltersProps> = ({ total, onTagDelete, onClear }) => {
	return (
		<Collapse in={total > 0} style={{ width: '100%' }}>
			<DisplayFilters mediaType='movie' onTagDelete={onTagDelete} onClear={onClear} />
		</Collapse>
	);
};

export default MoviesDisplayFilters;
