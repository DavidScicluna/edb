import React, { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import LoadMore from '../../../../../../components/Clickable/LoadMore';
import VerticalPeople from '../../../../../People/components/Orientation/Vertical';
import { PeopleProps } from './types';

const incrementBy = 20;

const People = ({ people }: PeopleProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <VStack width='100%' spacing={4}>
      <VerticalPeople
        isError={people.length === 0}
        isSuccess={people.length > 0}
        isLoading={false}
        people={people.filter((_person, index) => index < totalVisible)}
      />

      <ScaleFade
        in={people.length > 0 && people.length > incrementBy}
        unmountOnExit
        style={{ width: isSm ? '100%' : 'auto' }}
      >
        <LoadMore
          amount={totalVisible}
          total={people.length}
          label='People'
          onClick={() => setTotalVisible(totalVisible + incrementBy)}
        />
      </ScaleFade>
    </VStack>
  );
};

export default People;
