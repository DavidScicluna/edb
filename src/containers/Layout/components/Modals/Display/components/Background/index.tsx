import React, { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import { EmojiObjects as EmojiObjectsIcon, EmojiObjectsOutlined as EmojiObjectsOutlinedIcon } from '@material-ui/icons';
import { UseFormReturn, Controller } from 'react-hook-form';

import { Form } from '../../types';
import Container from '../Container';
import BackgroundItem from './components/BackgroundItem';
import { Background as BackgroundType } from './types';

const backgrounds: BackgroundType[] = [
  {
    label: 'Light',
    value: 'light',
    icon: EmojiObjectsIcon
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: EmojiObjectsOutlinedIcon
  }
];

const Background = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
  const color = form.watch('color');

  return (
    <Controller
      control={form.control}
      name='background'
      render={({ field: { value } }) => (
        <Container title='Background'>
          <HStack width='100%' spacing={2}>
            {backgrounds.map((background) => (
              <BackgroundItem
                key={background.value}
                {...background}
                color={color}
                isActive={value === background.value}
                onClick={() => form.setValue('background', background.value, { shouldDirty: true })}
              />
            ))}
          </HStack>
        </Container>
      )}
    />
  );
};

export default Background;
