import { ReactElement } from 'react';

import { range } from 'lodash';

import { SimilarProps } from './types';

import { PartialTV } from '../../../../../../../../common/types/tv';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../../components/Grid/Horizontal/Default';
import VerticalTVShowPoster from '../../../../../../../TV/components/Poster/Vertical';

const width = ['185px', '205px', '230px'];

// TODO: Add Actions button with tooltip explaining how similar works

const Similar = (props: SimilarProps): ReactElement => {
	const { name, similar = [], isError = false, isSuccess = false, isLoading = true } = props;

	return (
		<HorizontalGrid title='Similar Movies' isDisabled={isLoading || similar.length === 0} variant='outlined'>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${name ? `"${name}"` : ''} similar list!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && similar && similar.length === 0 ? (
				<Empty
					label='Oh no! Something went wrong'
					description={`${name ? `"${name}"` : ''} similar list is currently empty!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && similar && similar.length > 0 ? (
				similar.map((show: PartialTV) => (
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

export default Similar;
