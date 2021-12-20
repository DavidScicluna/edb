import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import { Sun as SunIcon, Moon as MoonIcon } from 'react-feather';
import { UseFormReturn, Controller } from 'react-hook-form';

import Panel from '../../../../../../../components/Panel';
import { Form } from '../../types';
import BackgroundItem from './components/BackgroundItem';
import { Background as BackgroundType } from './types';

const backgrounds: BackgroundType[] = [
  {
    label: 'Light',
    value: 'light',
    icon: SunIcon
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: MoonIcon
  }
];

const Background = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
  const color = form.watch('color');

  return (
    <Controller
      control={form.control}
      name='background'
      render={({ field: { value } }) => (
        <Panel colorMode={value} isFullWidth size='sm'>
          {{
            header: {
              title: 'Background'
            },

            body: (
              <HStack width='100%' spacing={2}>
                {backgrounds.map((background) => (
                  <BackgroundItem
                    key={background.value}
                    {...background}
                    color={color}
                    background={value}
                    isActive={value === background.value}
                    onClick={() => form.setValue('background', background.value, { shouldDirty: true })}
                  />
                ))}
              </HStack>
            )
          }}
        </Panel>
      )}
    />
  );
};

export default Background;
