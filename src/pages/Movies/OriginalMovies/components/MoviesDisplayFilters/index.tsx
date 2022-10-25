import React, { FC, useState } from 'react';

import { useLocation } from 'react-router';

import { Collapse } from '@davidscicluna/component-library';

import { useDebounce, useUpdateEffect } from 'usehooks-ts';

import { getTotalFilters } from '../../../../../components/Filters/common/utils';
import { DisplayFilters } from '../../../../../components';

import { MoviesDisplayFiltersProps } from './types';

const MoviesDisplayFilters: FC<MoviesDisplayFiltersProps> = ({ onTagDelete, onClear }) => {
	const location = useLocation();

	const [total, setTotal] = useState<number>(getTotalFilters({ location, mediaType: 'movie' }) || 0);
	const totalDebounced = useDebounce<number>(total, 500);

	useUpdateEffect(() => setTotal(getTotalFilters({ location, mediaType: 'movie' }) || 0), [location.search]);

	return (
		<Collapse in={totalDebounced > 0} style={{ width: '100%' }}>
			<DisplayFilters mediaType='movie' onTagDelete={onTagDelete} onClear={onClear} />
		</Collapse>
	);
};

export default MoviesDisplayFilters;
