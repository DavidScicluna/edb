import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import HorizontalScroll from '../../../../../../../../../../components/HorizontalScroll';

import Genre from './components/Genre';
import { GenresProps } from './types';


const Genres = ({ genres = [], isLoading = true }: GenresProps): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<HorizontalScroll
			renderDivider={({ padding }) => (
				<Text align='left' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='md' pr={padding}>
					,
				</Text>
			)}
			isDisabled={isLoading}
		>
			{genres.map((genre) => (
				<Genre key={genre.id} {...genre} isLoading={isLoading} />
			))}
		</HorizontalScroll>
	);
};

export default Genres;
