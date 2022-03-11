import { ReactElement } from 'react';

import range from 'lodash/range';

import { VerticalTVProps } from './types';

import { PartialTV } from '../../../../../common/types/tv';
import Empty from '../../../../../components/Empty';
import Error from '../../../../../components/Error';
import VerticalGrid from '../../../../../components/Grid/Vertical';
import HorizontalTVShowPoster from '../../Poster/Horizontal';
import VerticalTVShowPoster from '../../Poster/Vertical';

const VerticalTV = (props: VerticalTVProps): ReactElement => {
	const { isError = false, isSuccess = false, isLoading = true, shows } = props;

	return !isLoading && isError ? (
		<Error label='Oh no! Something went wrong' description='Failed to fetch TV Shows list!' variant='outlined' />
	) : !isLoading && isSuccess && shows && shows.length === 0 ? (
		<Empty label='TV Shows list is currently empty!' variant='outlined' />
	) : !isLoading && isSuccess && shows && shows.length > 0 ? (
		<VerticalGrid>
			{({ displayMode }) =>
				shows.map((show: PartialTV) =>
					displayMode === 'list' ? (
						<HorizontalTVShowPoster key={show.id} show={show} isLoading={false} />
					) : (
						<VerticalTVShowPoster key={show.id} show={show} isLoading={false} />
					)
				)
			}
		</VerticalGrid>
	) : (
		<VerticalGrid>
			{({ displayMode }) =>
				range(0, isSuccess && shows && shows.length > 0 ? shows.length : 20).map((_dummy, index: number) =>
					displayMode === 'list' ? (
						<HorizontalTVShowPoster key={index} isLoading />
					) : (
						<VerticalTVShowPoster key={index} isLoading />
					)
				)
			}
		</VerticalGrid>
	);
};

export default VerticalTV;
