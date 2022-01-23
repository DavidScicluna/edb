import { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import { DisplayProps } from './types';

const Display = ({ query = '', searchTypes, totalResults }: DisplayProps): ReactElement => {
  const { colorMode } = useColorMode();

  const handleAllTotal = (): number => {
    return (
      (totalResults?.movie || 0) +
      (totalResults?.tv || 0) +
      (totalResults?.person || 0) +
      (totalResults?.collection || 0) +
      (totalResults?.company || 0)
    );
  };

  const handleReturnMediaTypeTotal = (): number => {
    const total = 0;

    searchTypes.forEach((type) => total + (totalResults && totalResults[type] ? totalResults[type] : 0));

    return total;
  };

  const handleReturnMediaTypeLabel = (): string => {
    // if (searchTypes.length === 1) {
    //   const total = handleReturnMediaTypeTotal();

    //   switch (searchTypes) {
    //     case 'person':
    //       return `${total > 1 ? 'People' : 'Person'}`;
    //     case 'tv':
    //       return `TV Show${total > 1 ? 's' : ''}`;
    //     case 'movie':
    //       return `Movie${total > 1 ? 's' : ''}`;
    //     default:
    //       return '';
    //   }
    // } else {
    const total = handleAllTotal();

    return `result${total > 1 ? 's' : ''}`;
    // }
  };

  return (
    <HStack width='100%' justifyContent='space-between'>
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='sm'
      >{`Your search results for "${query}"`}</Text>
      <Text align='right' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>{`${
        // mediaType ? handleReturnMediaTypeTotal() :
        handleAllTotal()
      } ${handleReturnMediaTypeLabel()} found`}</Text>
    </HStack>
  );
};

export default Display;
