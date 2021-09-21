import { ReactElement } from 'react';

import { useColorMode, HStack, Text, SlideFade } from '@chakra-ui/react';

import { DisplayProps } from './types';

const Display = ({ query = '', mediaType, hasUnsubmitted, totalResults }: DisplayProps): ReactElement => {
  const { colorMode } = useColorMode();

  const handleMultiply = (): number => {
    return (totalResults?.movies || 0) + (totalResults?.tv || 0) + (totalResults?.people || 0);
  };

  const handleReturnMediaTypeResults = (): number => {
    switch (mediaType) {
      case 'person':
        return totalResults?.people || 0;
      case 'tv':
        return totalResults?.tv || 0;
      case 'movie':
        return totalResults?.movies || 0;
      default:
        return 0;
    }
  };

  const handleReturnMediaTypeLabel = (): string => {
    if (mediaType) {
      const total = handleReturnMediaTypeResults();

      switch (mediaType) {
        case 'person':
          return `${total > 1 ? 'People' : 'Person'}`;
        case 'tv':
          return `TV Show${total > 1 ? 's' : ''}`;
        case 'movie':
          return `Movie${total > 1 ? 's' : ''}`;
        default:
          return '';
      }
    } else {
      const total = handleMultiply();

      return `result${total > 1 ? 's' : ''}`;
    }
  };

  return (
    <SlideFade in={Boolean(totalResults) && !hasUnsubmitted} offsetY={-7} unmountOnExit style={{ width: '100%' }}>
      <HStack width='100%' justifyContent='space-between'>
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          fontSize='sm'>{`Your search results for "${query}"`}</Text>
        <Text align='right' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>{`${
          mediaType ? handleReturnMediaTypeResults() : handleMultiply()
        } ${handleReturnMediaTypeLabel()} found`}</Text>
      </HStack>
    </SlideFade>
  );
};

export default Display;
