import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import _ from 'lodash';

import { PartsTabProps } from './types';

import { PartialMovie } from '../../../../../../common/types/movie';
import { handleReturnDate } from '../../../../../../common/utils';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import HorizontalMoviePoster from '../../../../../Movies/components/Poster/Horizontal';
import VerticalMoviePoster from '../../../../../Movies/components/Poster/Vertical';

const incrementBy = 20;

const PartsTab = (props: PartsTabProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { name, parts = [], isLoading = true, isError = false, isSuccess = false } = props;

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	const handleSortParts = (parts: PartialMovie[] = []): PartialMovie[] => {
		return parts.sort(
			(a, b) =>
				Number(handleReturnDate(b.release_date || '', 'full')) -
				Number(handleReturnDate(a.release_date || '', 'full'))
		);
	};

	return !isLoading && isError ? (
		<Error
			label='Oh no! Something went wrong'
			description={`Failed to fetch ${name ? `"${name}"` : 'Collection'} parts!`}
			variant='outlined'
		/>
	) : !isLoading && isSuccess && parts && parts.length === 0 ? (
		<Empty
			label='Oh no!'
			description={`${name ? `"${name}"` : 'Collection'} parts list is currently empty!`}
			variant='outlined'
		/>
	) : !isLoading && isSuccess && parts && parts.length > 0 ? (
		<VStack width='100%' spacing={4}>
			<VerticalGrid>
				{({ displayMode }) =>
					handleSortParts([...parts])
						.filter((_movie, index) => index < totalVisible)
						.map((movie: PartialMovie) =>
							displayMode === 'list' ? (
								<HorizontalMoviePoster key={movie.id} movie={movie} isLoading={false} />
							) : (
								<VerticalMoviePoster key={movie.id} movie={movie} isLoading={false} />
							)
						)
				}
			</VerticalGrid>

			<ScaleFade in={!isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
				<LoadMore
					amount={totalVisible}
					total={parts.length || 0}
					label={`${name ? `"${name}"` : 'Collection'} parts`}
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
				/>
			</ScaleFade>
		</VStack>
	) : (
		<VerticalGrid>
			{({ displayMode }) =>
				_.range(0, isSuccess && parts && parts.length > 0 ? parts.length : 20).map((_dummy, index: number) =>
					displayMode === 'list' ? (
						<HorizontalMoviePoster key={index} isLoading />
					) : (
						<VerticalMoviePoster key={index} isLoading />
					)
				)
			}
		</VerticalGrid>
	);
};

export default PartsTab;
