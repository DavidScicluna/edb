import React, { ReactElement } from 'react';

import { useColorMode, useBoolean, HStack, Text } from '@chakra-ui/react';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

import IconButton from '../../../../../../components/Clickable/IconButton';
import Tooltip from '../../../../../../components/Tooltip';
import { searchTypes as allSearchTypes } from '../../../SearchTypes';
import { SearchTypesProps } from './types';

const SearchTypes = ({ searchTypes, onClear }: SearchTypesProps): ReactElement => {
  const { colorMode } = useColorMode();

  const [isHoveringClear, setIsHoveringClear] = useBoolean();

  return (
    <HStack
      backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      borderRadius='sm'
      px={1}
      py={0.25}
      spacing={1}
    >
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='sm'
        fontWeight='semibold'
        textTransform='uppercase'
        whiteSpace='nowrap'
      >
        {searchTypes.length === allSearchTypes.length
          ? 'All'
          : allSearchTypes
              .filter((searchType) => searchTypes.includes(searchType.value))
              .map((searchType) => searchType.label)
              .join(' • ')}
      </Text>
      <Tooltip aria-label='Clear Search Types' label='Clear Search Types' isOpen={isHoveringClear} placement='top'>
        <IconButton
          aria-label='Clear Search Types'
          onClick={() => onClear()}
          onMouseEnter={() => setIsHoveringClear.on()}
          onMouseLeave={() => setIsHoveringClear.off()}
          size='sm'
          variant='icon'
        >
          <ClearOutlinedIcon />
        </IconButton>
      </Tooltip>
    </HStack>
  );
};

export default SearchTypes;
