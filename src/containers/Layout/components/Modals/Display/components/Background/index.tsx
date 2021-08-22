import React, { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import {
  WbSunnyOutlined as WbSunnyOutlinedIcon,
  Brightness2Outlined as Brightness2OutlinedIcon
} from '@material-ui/icons';
import { UseFormReturn, Controller } from 'react-hook-form';

import Card from '../../../../../../../components/Card';
import { Form } from '../../types';
import BackgroundItem from './components/BackgroundItem';
import { Background as BackgroundType } from './types';

const backgrounds: BackgroundType[] = [
  {
    label: 'Light',
    value: 'light',
    icon: WbSunnyOutlinedIcon
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: Brightness2OutlinedIcon
  }
];

const Background = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
  const color = form.watch('color');

  return (
    <Controller
      control={form.control}
      name='background'
      render={({ field: { value } }) => (
        <Card box={{ header: { pb: 2 }, body: { pt: 2 } }} colorMode={value} isFullWidth p={2}>
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
        </Card>
      )}
    />
  );
};

export default Background;
