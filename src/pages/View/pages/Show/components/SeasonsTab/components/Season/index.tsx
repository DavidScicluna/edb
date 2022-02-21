import { ReactElement, useEffect } from 'react';
import { useQuery } from 'react-query';

import { VStack, Collapse } from '@chakra-ui/react';

import axios from 'axios';
import _ from 'lodash';

import Episodes from './components/Episodes';
import { SeasonProps } from './types';

import axiosInstance from '../../../../../../../../common/scripts/axios';
import { FullSeason } from '../../../../../../../../common/types/tv';
import Paragraph from '../../../../../../../../components/Paragraph';

const Season = (props: SeasonProps): ReactElement => {
	const source = axios.CancelToken.source();

	const { showId, title, season, isOpen = false } = props;
	const { season_number: number, overview } = season || {};

	// Fetching tv show season
	const seasonQuery = useQuery(
		[`tv-show-${showId}-season-${number}`, showId],
		async () => {
			const { data } = await axiosInstance.get<FullSeason>(`/tv/${showId}/season/${number}`, {
				cancelToken: source.token
			});
			return data;
		},
		{ enabled: isOpen }
	);

	useEffect(() => {
		return () => source.cancel();
	}, []);

	return (
		<VStack width='100%' spacing={2}>
			<Collapse
				in={
					(!_.isNil(seasonQuery.data?.overview || overview) &&
						!_.isEmpty(seasonQuery.data?.overview || overview)) ||
					seasonQuery.isFetching ||
					seasonQuery.isLoading
				}
				unmountOnExit
				style={{ width: '100%' }}
			>
				<Paragraph
					title='Overview'
					paragraphs={overview}
					isLoading={seasonQuery.isFetching || seasonQuery.isLoading}
				/>
			</Collapse>

			<Episodes
				showId={showId}
				title={title}
				episodes={seasonQuery.data?.episodes}
				isError={seasonQuery.isError}
				isSuccess={seasonQuery.isSuccess}
				isLoading={seasonQuery.isFetching || seasonQuery.isLoading}
			/>
		</VStack>
	);
};

export default Season;