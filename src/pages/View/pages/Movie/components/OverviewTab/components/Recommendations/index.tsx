import { ReactElement } from 'react';

import { range } from 'lodash';

import { RecommendationsProps } from './types';

import { PartialMovie } from '../../../../../../../../common/types/movie';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../../components/Grid/Horizontal/Default';
import VerticalMoviePoster from '../../../../../../../Movies/components/Poster/Vertical';

const width = ['185px', '205px', '230px'];

// TODO: Add Actions button with tooltip explaining how Recommendations works

const Recommendations = (props: RecommendationsProps): ReactElement => {
	const { title, recommendations = [], isError = false, isSuccess = false, isLoading = true } = props;

	return (
		<HorizontalGrid
			title='Recommended Movies'
			isDisabled={isLoading || recommendations.length === 0}
			variant='outlined'
		>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${title ? `"${title}"` : ''} recommendations list!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && recommendations && recommendations.length === 0 ? (
				<Empty
					label='Oh no! Something went wrong'
					description={`${title ? `"${title}"` : ''} recommendations list is currently empty!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && recommendations && recommendations.length > 0 ? (
				recommendations.map((movie: PartialMovie) => (
					<VerticalMoviePoster key={movie.id} width={width} movie={movie} isLoading={false} />
				))
			) : (
				range(0, 20).map((_dummy, index: number) => <VerticalMoviePoster key={index} width={width} isLoading />)
			)}
		</HorizontalGrid>
	);
};

export default Recommendations;
