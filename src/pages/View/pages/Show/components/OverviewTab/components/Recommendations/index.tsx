import { ReactElement } from 'react';

import range from 'lodash/range';


import { PartialTV } from '../../../../../../../../common/types/tv';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../../components/Grid/Horizontal/Default';
import VerticalTVShowPoster from '../../../../../../../TV/components/Poster/Vertical';

import { RecommendationsProps } from './types';

const width = ['185px', '205px', '230px'];

// TODO: Add Actions button with tooltip explaining how Recommendations works

const Recommendations = (props: RecommendationsProps): ReactElement => {
	const { name, recommendations = [], isError = false, isSuccess = false, isLoading = true } = props;

	return (
		<HorizontalGrid
			title='Recommended Movies'
			isDisabled={isLoading || recommendations.length === 0}
			variant='outlined'
		>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${name ? `"${name}"` : ''} recommendations list!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && recommendations && recommendations.length === 0 ? (
				<Empty
					label='Oh no! Something went wrong'
					description={`${name ? `"${name}"` : ''} recommendations list is currently empty!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && recommendations && recommendations.length > 0 ? (
				recommendations.map((show: PartialTV) => (
					<VerticalTVShowPoster key={show.id} width={width} show={show} isLoading={false} />
				))
			) : (
				range(0, 20).map((_dummy, index: number) => (
					<VerticalTVShowPoster key={index} width={width} isLoading />
				))
			)}
		</HorizontalGrid>
	);
};

export default Recommendations;
