import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import {
  WbSunnyOutlined as WbSunnyOutlinedIcon,
  Brightness2Outlined as Brightness2OutlinedIcon
} from '@material-ui/icons';
import { UseFormReturn, Controller } from 'react-hook-form';

import Panel from '../../../../../../../components/Panel';
import { Form } from '../../types';
import BackgroundItem from './components/BackgroundItem';
import { Background as BackgroundType } from './types';

const backgrounds: BackgroundType[] = [
  {
    label: 'Light',
    value: 'light',
    renderIcon: ({ fontSize }) => <WbSunnyOutlinedIcon style={{ fontSize }} />
  },
  {
    label: 'Dark',
    value: 'dark',
    renderIcon: ({ fontSize }) => <Brightness2OutlinedIcon style={{ fontSize }} />
  }
];

const Background = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
  const color = form.watch('color');

  return (
    <Controller
      control={form.control}
      name='background'
      render={({ field: { value } }) => (
        <Panel colorMode={value} isFullWidth>
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
