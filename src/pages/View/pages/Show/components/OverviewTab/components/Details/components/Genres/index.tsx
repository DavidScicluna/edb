
import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import Genre from './components/Genre';
import { GenresProps } from './types';

import HorizontalScroll from '../../../../../../../../../../components/HorizontalScroll';

const Genres = ({ genres = [], isLoading = true }: GenresProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <HorizontalScroll
      renderDivider={({ padding }) => (
        <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' pr={padding}>
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