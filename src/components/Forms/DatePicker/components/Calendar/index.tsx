import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Header from './components/Header';
import Week from './components/Week';
import Weekdays from './components/Weekdays';
import { CalendarProps } from './types';

const Calendar = (props: CalendarProps): ReactElement => {
  const { dayzed, color, month, year, weeks, onToggleYears, onToggleMonths } = props;

  return (
    <VStack width='100%' p={2}>
      <Header dayzed={dayzed} month={month} year={year} onToggleYears={onToggleYears} onToggleMonths={onToggleMonths} />
      <Weekdays />
      {weeks.map((week, index) => (
        <Week key={index} color={color} dayzed={dayzed} weekdays={week} />
      ))}
    </VStack>
  );
};

export default Calendar;
