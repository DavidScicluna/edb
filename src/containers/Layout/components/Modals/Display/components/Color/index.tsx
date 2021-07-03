import React, { ReactElement } from 'react';

import { SimpleGrid } from '@chakra-ui/react';
import { UseFormReturn, Controller } from 'react-hook-form';

import { Form } from '../../types';
import Container from '../Container';
import ColorItem from './components/ColorItem';
import { Color as ColorType } from './types';

const colors: ColorType[] = [
  {
    label: 'Orange',
    value: 'orange'
  },
  {
    label: 'Yellow',
    value: 'yellow'
  },
  {
    label: 'Green',
    value: 'green'
  },
  {
    label: 'Teal',
    value: 'teal'
  },
  {
    label: 'Blue',
    value: 'blue'
  },
  {
    label: 'Cyan',
    value: 'cyan'
  },
  {
    label: 'Purple',
    value: 'purple'
  },
  {
    label: 'Pink',
    value: 'pink'
  }
];

const Color = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
  return (
    <Controller
      control={form.control}
      name='color'
      render={({ field: { value } }) => (
        <Container title='Color'>
          <SimpleGrid width='100%' minChildWidth='20%' spacing={2}>
            {colors.map((color, index) => (
              <ColorItem
                key={index}
                {...color}
                isActive={color.value === value}
                onClick={() => form.setValue('color', color.value, { shouldDirty: true })}
              />
            ))}
          </SimpleGrid>
        </Container>
      )}
    />
  );
};

export default Color;
