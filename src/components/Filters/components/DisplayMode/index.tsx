import React, { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import {
  GridOnOutlined as GridOnOutlinedIcon,
  GridOnTwoTone as GridOnTwoToneIcon,
  ListAltOutlined as ListAltOutlinedIcon,
  ListAltTwoTone as ListAltTwoToneIcon
} from '@material-ui/icons';
import { Controller, UseFormReturn } from 'react-hook-form';

import Card from '../../../Card';
import { Form } from '../../types';
import DisplayModeItem from './components/DisplayModeItem';
import { DisplayMode as DisplayModeType } from './types';

const displayModes: DisplayModeType[] = [
  {
    label: 'Grid',
    value: 'grid',
    iconActive: GridOnTwoToneIcon,
    icon: GridOnOutlinedIcon
  },
  {
    label: 'List',
    value: 'list',
    iconActive: ListAltTwoToneIcon,
    icon: ListAltOutlinedIcon
  }
];

const DisplayMode = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
  return (
    <Controller
      control={form.control}
      name='displayMode'
      render={({ field: { value } }) => (
        <Card box={{ header: { pb: 2 }, body: { pt: 2 } }} isFullWidth p={2}>
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
        </Card>
      )}
    />
  );
};

export default DisplayMode;
