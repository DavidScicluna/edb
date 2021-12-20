import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import { Grid as GridIcon, List as ListIcon } from 'react-feather';
import { Controller, UseFormReturn } from 'react-hook-form';

import Panel from '../../../Panel';
import { Form } from '../../types';
import DisplayModeItem from './components/DisplayModeItem';
import { DisplayMode as DisplayModeType } from './types';

const displayModes: DisplayModeType[] = [
  {
    label: 'Grid',
    value: 'grid',
    icon: GridIcon
  },
  {
    label: 'List',
    value: 'list',
    icon: ListIcon
  }
];

const DisplayMode = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
  return (
    <Controller
      control={form.control}
      name='displayMode'
      render={({ field: { value } }) => (
        <Panel isFullWidth size='sm'>
          {{
            header: { title: 'Display Mode' },
            body: (
              <HStack width='100%' spacing={2}>
                {displayModes.map((displayMode) => (
                  <DisplayModeItem
                    key={displayMode.value}
                    {...displayMode}
                    isActive={value === displayMode.value}
                    onClick={() => form.setValue('displayMode', displayMode.value, { shouldDirty: true })}
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

export default DisplayMode;
