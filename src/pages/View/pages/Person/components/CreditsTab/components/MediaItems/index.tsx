import { ReactElement, useState, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import sort from 'array-sort';

import Divider from '../../../../../../../../components/Divider';
import Tabs from '../../../../../../../../components/Tabs';
import TabPanels from '../../../../../../../../components/Tabs/components/TabPanels';

import Header from './components/Header';
import Movies from './components/Movies';
import TVShows from './components/TVShows';
import { MediaItemsProps } from './types';

const MediaItems = (props: MediaItemsProps): ReactElement => {
	const { movies = [], shows = [], label, job } = props;

	const [activeTab, setActiveTab] = useState<number>(0);

	useEffect(() => {
		if (movies.length > 0) {
			setActiveTab(0);
		} else if (shows.length > 0) {
			setActiveTab(1);
		}

		return () => setActiveTab(0);
	}, []);

	return (
		<Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
			<VStack width='100%' divider={<Divider />} spacing={2}>
				<Header movies={movies.length} shows={shows.length} />
				<TabPanels>
					<Movies movies={sort([...movies], 'release_date', { reverse: true })} label={label} job={job} />
					<TVShows shows={sort([...shows], 'first_air_date', { reverse: true })} label={label} job={job} />
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default MediaItems;
