import { FC, useState } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import qs from 'query-string';

import HomeHorizontalGrid from '../HomeHorizontalGrid';
import { formatMediaType } from '../../../../../common/utils';

import { TopRatedProps } from './types';

const TopRated: FC<TopRatedProps> = ({ moviesQuery, tvShowsQuery }) => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const {
		data: movies,
		isFetching: isFetchingMovies = false,
		isLoading: isMoviesLoading = false,
		isError: isMoviesError = false,
		isSuccess: isMoviesSuccess = false
	} = moviesQuery;

	const {
		data: shows,
		isFetching: isFetchingShows = false,
		isLoading: isShowsLoading = false,
		isError: isShowsError = false,
		isSuccess: isShowsSuccess = false
	} = tvShowsQuery;

	return (
		<HomeHorizontalGrid
			activeTab={activeTabDebounced}
			title='Top Rated'
			subtitle='A list containing the highest-rated Movies & TV Shows of all time.'
			to={({ mediaType }) => {
				return {
					pathname: formatMediaType({ mediaType }),
					search: qs.stringify({ 'sort_by': 'vote_average.desc', 'vote_count.gte': 250 })
				};
			}}
			mediaTypes={['movie', 'tv']}
			data={{
				movie: movies?.results || [],
				tv: shows?.results || [],
				person: []
			}}
			isLoading={{
				movie: isFetchingMovies || isMoviesLoading,
				tv: isFetchingShows || isShowsLoading,
				person: false
			}}
			isError={{
				movie: isMoviesError,
				tv: isShowsError,
				person: false
			}}
			isSuccess={{
				movie: isMoviesSuccess,
				tv: isShowsSuccess,
				person: false
			}}
			onChange={({ index }) => setActiveTab(index)}
		/>
	);
};

export default TopRated;
