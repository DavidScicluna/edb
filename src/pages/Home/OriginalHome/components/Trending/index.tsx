import { FC, useState } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import HomeHorizontalGrid from '../HomeHorizontalGrid';
import { formatMediaType } from '../../../../../common/utils';

import { TrendingProps } from './types';

const Trending: FC<TrendingProps> = ({ moviesQuery, tvShowsQuery, peopleQuery }) => {
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

	const {
		data: people,
		isFetching: isFetchingPeople = false,
		isLoading: isPeopleLoading = false,
		isError: isPeopleError = false,
		isSuccess: isPeopleSuccess = false
	} = peopleQuery;

	return (
		<HomeHorizontalGrid
			activeTab={activeTabDebounced}
			title='Trending'
			subtitle='A list containing the most trending Movies, TV Shows & People at the moment.'
			to={({ mediaType }) => {
				return { pathname: '/trending', hash: formatMediaType({ mediaType }) };
			}}
			mediaTypes={['movie', 'tv', 'person']}
			data={{
				movie: movies?.results || [],
				tv: shows?.results || [],
				person: people?.results || []
			}}
			isLoading={{
				movie: isFetchingMovies || isMoviesLoading,
				tv: isFetchingShows || isShowsLoading,
				person: isFetchingPeople || isPeopleLoading
			}}
			isError={{
				movie: isMoviesError,
				tv: isShowsError,
				person: isPeopleError
			}}
			isSuccess={{
				movie: isMoviesSuccess,
				tv: isShowsSuccess,
				person: isPeopleSuccess
			}}
			onChange={({ index }) => setActiveTab(index)}
		/>
	);
};

export default Trending;
