import React, { ReactElement } from 'react';

import { useTheme, useMediaQuery, ButtonGroup } from '@chakra-ui/react';
import _ from 'lodash';
import { Controller } from 'react-hook-form';

import { useSelector } from '../../../../common/hooks';
import { Theme } from '../../../../theme/types';
import Button from '../../../Clickable/Button';
import Panel from '../../../Panel';
import { Form } from '../../types';
import { CountProps } from './types';

const Count = ({ form }: CountProps): ReactElement => {
  const theme = useTheme<Theme>();
  const [isMd] = useMediaQuery('(max-width: 760px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const handleOnChange = (count: Form['count'], number: number): void => {
    if (count === number) {
      form.setValue('count', undefined, { shouldDirty: true });
    } else {
      form.setValue('count', number, { shouldDirty: true });
    }
  };

  return (
    <Controller
      control={form.control}
      name='count'
      render={({ field: { value } }) => (
        <Panel isFullWidth>
          {{
            header: {
              title: 'Number of Ratings',
              actions: (
                <Button
                  color={color}
                  isDisabled={!value}
                  onClick={() => form.setValue('count', undefined, { shouldDirty: true })}
                  size='sm'
                  variant='text'
                >
                  Clear
                </Button>
              )
            },
            body: (
              <ButtonGroup width='100%' isAttached>
                {_.range(0, 550, 50).map((number) => (
                  <Button
                    key={number}
                    color={value === number ? color : 'gray'}
                    isFullWidth
                    onClick={() => handleOnChange(value, number)}
                    size={isMd ? 'sm' : 'md'}
                    variant='outlined'
                    sx={{
                      back: {
                        borderRadius:
                          number === 0
                            ? `${theme.radii.base} 0 0 ${theme.radii.base}`
                            : number === 500
                            ? `0 ${theme.radii.base} ${theme.radii.base} 0`
                            : 0
                      },
                      front: {
                        borderRadius:
                          number === 0
                            ? `${theme.radii.base} 0 0 ${theme.radii.base}`
                            : number === 500
                            ? `0 ${theme.radii.base} ${theme.radii.base} 0`
                            : 0
                      }
                    }}
                  >
                    {String(number)}
                  </Button>
                ))}
              </ButtonGroup>
            )
          }}
        </Panel>
      )}
    />
  );
};

export default Count;
