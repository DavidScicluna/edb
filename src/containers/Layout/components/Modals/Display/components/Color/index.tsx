import { ReactElement } from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';

import { ColorMode, useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import ColorItem from './components/ColorItem';
import { Color as ColorType } from './types';

import { handleCheckSystemColorMode } from '../../../../../../../common/utils';
import Panel from '../../../../../../../components/Panel';
import { Form } from '../../types';

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
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const background = form.watch('background');
  const colorMode: ColorMode = background === 'system' ? handleCheckSystemColorMode() : background;

  return (
    <Controller
      control={form.control}
      name='color'
      render={({ field: { value } }) => (
        <Panel colorMode={colorMode} isFullWidth>
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
                    background={colorMode}
                    isActive={color.value === value}
                    onClick={() => form.setValue('color', color.value, { shouldDirty: true })}
                  />
                ))}
              </SimpleGrid>
            )
          }}
        </Panel>
      )}
    />
  );
};

export default Color;
