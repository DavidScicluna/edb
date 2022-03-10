import { ReactElement } from 'react';

import { range } from 'lodash';

import { HorizontalTVProps } from './types';

import { PartialTV } from '../../../../../common/types/tv';
import Empty from '../../../../../components/Empty';
import Error from '../../../../../components/Error';
import VerticalTVShowPoster from '../../Poster/Vertical';

const HorizontalTV = (props: HorizontalTVProps): ReactElement => {
	const { isError = false, isSuccess = false, isLoading = true, shows } = props;

	return !isLoading && isError ? (
		<Error label='Oh no! Something went wrong' description='Failed to fetch TV Shows list!' variant='transparent' />
	) : !isLoading && isSuccess && shows && shows.length === 0 ? (
		<Empty label='TV Shows list is currently empty!' variant='transparent' />
	) : !isLoading && isSuccess && shows && shows.length > 0 ? (
		<>
			{shows.map((show: PartialTV) => (
				<VerticalTVShowPoster key={show.id} width={['185px', '205px', '230px']} show={show} isLoading={false} />
			))}
		</>
	) : (
		<>
			{range(0, 20).map((_dummy, index: number) => (
				<VerticalTVShowPoster key={index} width={['185px', '205px', '230px']} isLoading />
			))}
		</>
	);
};

export default HorizontalTV;
