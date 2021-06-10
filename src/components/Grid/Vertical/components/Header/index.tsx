import React, { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import { SortBy } from '../../../../../common/types/types';
import Options from './components/Options';

type HeaderProps = {
  title: string;
  sortBy?: SortBy[];
  onSortChange?: (sortBy: SortBy) => void;
};

const Header = ({ title, sortBy = [], onSortChange }: HeaderProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <>
      <HStack width='100%' justify='space-between' p={[2]}>
        <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='2xl' fontWeight='semibold'>
          {title}
        </Text>

        <Options sortBy={sortBy} onSortChange={onSortChange} />
      </HStack>
    </>
  );
};

export default Header;
