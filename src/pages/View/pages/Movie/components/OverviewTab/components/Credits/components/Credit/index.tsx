import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';
import _ from 'lodash';

import HorizontalScroll from '../../../../../../../../../../components/HorizontalScroll';
import Person from './components/Person';
import { PeopleProps } from './types';

const Credit = ({ people = [], isLoading = true }: PeopleProps): ReactElement => {
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
      {!isLoading
        ? people.map((person) => <Person key={person.id} person={person} isLoading={false} />)
        : _.range(0, 2).map((_dummy, index: number) => <Person key={index} isLoading />)}
    </HorizontalScroll>
  );
};

export default Credit;
