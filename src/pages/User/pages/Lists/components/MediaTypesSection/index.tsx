import { ReactElement, useState, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import isNil from 'lodash/isNil';

import { MediaType } from '../../../../../../common/types';
import Divider from '../../../../../../components/Divider';
import Tabs from '../../../../../../components/Tabs';
import TabPanels from '../../../../../../components/Tabs/components/TabPanels';
import MediaTypesHeader from '../../../../components/MediaTypesHeader';
import MediaTypesPicker from '../../../../components/MediaTypesPicker';
import Movies from '../../../../components/Movies';
import TV from '../../../../components/TV';

import { MediaTypesSectionProps } from './types';

const MediaTypesSection = ({ movies, tv, renderActions }: MediaTypesSectionProps): ReactElement => {
	const [activeTab, setActiveTab] = useState<number>();

	const handleReturnMediaTypes = (): MediaType[] => {
		const mediaTypes: MediaType[] = [];

		if (movies.length > 0) {
			mediaTypes.push('movie');
		}

		if (tv.length > 0) {
			mediaTypes.push('tv');
		}

		return mediaTypes;
	};

	const handleSetMediaType = (mediaType: MediaType): void => {
		switch (mediaType) {
			case 'movie':
				setActiveTab(0);
				return;
			case 'tv':
				setActiveTab(1);
				return;
		}
	};

	useEffect(() => {
		setActiveTab(undefined);
	}, [movies, tv]);

	return (
		<Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
			<VStack width='100%' divider={<Divider orientation='horizontal' />} spacing={2}>
				<MediaTypesHeader
					mediaTypes={['movie', 'tv']}
					renderActions={renderActions}
					activeTab={activeTab}
					total={{
						movie: movies.length,
						tv: tv.length
					}}
				/>

				{isNil(activeTab) ? (
					<MediaTypesPicker
						mediaTypes={handleReturnMediaTypes()}
						label='Oh no! 😢'
						description='Please add an item to the list to be able to view it here.'
						onSetMediaType={handleSetMediaType}
					/>
				) : (
					<TabPanels>
						<Movies movies={movies} />
						<TV shows={tv} />
					</TabPanels>
				)}
			</VStack>
		</Tabs>
	);
};

export default MediaTypesSection;
