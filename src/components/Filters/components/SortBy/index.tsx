import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import { Controller, UseFormReturn } from 'react-hook-form';

import { SortBy as SortByType } from '../../../../common/types/types';
import { SortDirection } from '../../../../store/slices/App/types';
import { Form } from '../../types';
import Container from '../Container';
import SortByItem from './components/SortByItem';

const SortBy = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
  const handleSortChange = (paramSort: SortByType): void => {
    const sortBy = form.getValues().sort.sortBy;
    const current: number = sortBy.findIndex((sort) => sort.isActive);
    const next: number = sortBy.findIndex((sort) => sort.value === paramSort.value);

    form.setValue(
      'sort',
      {
        ...form.getValues().sort,
        sortBy: sortBy.map((sort, index) => {
          switch (index) {
            case current:
              return {
                ...sort,
                isActive: false
              };
            case next:
              return {
                ...sort,
                isActive: true
              };
            default:
              return sort;
          }
        })
      },
      { shouldDirty: true }
    );
  };

  const handleDirectionChange = (direction: SortDirection) => {
    form.setValue('sort', { ...form.getValues().sort, direction }, { shouldDirty: true });
  };

  return (
    <Controller
      control={form.control}
      name='sort'
      render={({ field: { value } }) => (
        <Container title='Sort by'>
          <VStack width='100%' alignItems='stretch' justifyContent='flex-start' spacing={1}>
            {value.sortBy.map((sort) => (
              <SortByItem
                key={sort.value}
                {...sort}
                direction={value.direction}
                onSortChange={handleSortChange}
                onDirectionChange={handleDirectionChange}
              />
            ))}
          </VStack>
        </Container>
      )}
    />
  );
};

export default SortBy;
