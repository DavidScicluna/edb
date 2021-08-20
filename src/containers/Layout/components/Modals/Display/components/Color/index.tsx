import React, { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';
import { UseFormReturn, Controller } from 'react-hook-form';

import Card from '../../../../../../../components/Card';
import { Form } from '../../types';
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
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const background = form.watch('background');

  return (
    <Controller
      control={form.control}
      name='color'
      render={({ field: { value } }) => (
        <Card
          box={{
            header: { pb: 2 },
            body: { pt: 2 }
          }}
          colorMode={background}
          isFullWidth
          p={2}>
          {{
            header: {
              title: 'Color'
            },
            body: (
              <SimpleGrid width='100%' columns={isSm ? 2 : 4} spacing={2}>
                {colors.map((color, index) => (
                  <ColorItem
                    key={index}
                    {...color}
                    background={background}
                    isActive={color.value === value}
                    onClick={() => form.setValue('color', color.value, { shouldDirty: true })}
                  />
                ))}
              </SimpleGrid>
            )
          }}
        </Card>
      )}
    />
  );
};

export default Color;
