import { ReactElement } from 'react';

import range from 'lodash/range';

import { SimilarProps } from './types';

import { PartialMovie } from '../../../../../../../../common/types/movie';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../../components/Grid/Horizontal/Default';
import VerticalMoviePoster from '../../../../../../../Movies/components/Poster/Vertical';

const width = ['185px', '205px', '230px'];

// TODO: Add Actions button with tooltip explaining how similar works

const Similar = (props: SimilarProps): ReactElement => {
	const { title, similar = [], isError = false, isSuccess = false, isLoading = true } = props;

	return (
		<HorizontalGrid title='Similar Movies' isDisabled={isLoading || similar.length === 0} variant='outlined'>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${title ? `"${title}"` : ''} similar list!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && similar && similar.length === 0 ? (
				<Empty
					label='Oh no! Something went wrong'
					description={`${title ? `"${title}"` : ''} similar list is currently empty!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && similar && similar.length > 0 ? (
				similar.map((movie: PartialMovie) => (
					<VerticalMoviePoster key={movie.id} width={width} movie={movie} isLoading={false} />
				))
			) : (
				range(0, 20).map((_dummy, index: number) => <VerticalMoviePoster key={index} width={width} isLoading />)
			)}
		</HorizontalGrid>
	);
};

export default Similar;
