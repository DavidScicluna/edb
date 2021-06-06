import React, { ReactElement } from 'react';

import { HStack, Heading } from '@chakra-ui/react';

import { SortBy } from '../../../../../common/types/types';
import Options from './components/Options';

type HeaderProps = {
  title: string;
  sortBy?: SortBy[];
  onSortChange?: (sortBy: SortBy) => void;
};

const Header = ({ title, sortBy = [], onSortChange }: HeaderProps): ReactElement => {
  return (
    <>
      <HStack width='100%' justify='space-between' p={[2]}>
        <Heading size='xl'>{title}</Heading>

        <Options sortBy={sortBy} onSortChange={onSortChange} />
      </HStack>
    </>
  );
};

export default Header;
