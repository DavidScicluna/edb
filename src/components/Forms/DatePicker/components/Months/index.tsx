import React, { ReactElement } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import Button from '../../../../Clickable/Button';
import { full } from '../../common/data/months';
import { MonthsProps } from './types';

const Months = (props: MonthsProps): ReactElement => {
  const { color, month, year, minDate, maxDate, onMonthClick } = props;

  const handleIsDisabled = (month: number): boolean => {
    if (minDate && maxDate) {
      const minMonth = minDate.getMonth();
      const minYear = minDate.getFullYear();
      const maxMonth = maxDate.getMonth();
      const maxYear = maxDate.getFullYear();

      if (year === minYear) {
        return month < minMonth;
      } else if (year === maxYear) {
        return month > maxMonth;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <SimpleGrid width='100%' columns={3} spacing={0} p={2}>
      {full.map((paramMonth, index) => (
        <Button
          key={index}
          color={index === month ? color : 'gray'}
          isDisabled={handleIsDisabled(index)}
          isFullWidth
          onClick={() => onMonthClick(index)}
          size='lg'
          variant='text'
        >
          {paramMonth}
        </Button>
      ))}
    </SimpleGrid>
  );
};

export default Months;
