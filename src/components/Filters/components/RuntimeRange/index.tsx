import React, { ReactElement } from 'react';

import { useTheme, useMediaQuery, ButtonGroup, Text, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { Controller } from 'react-hook-form';

import { useSelector } from '../../../../common/hooks';
import { Theme } from '../../../../theme/types';
import Button from '../../../Clickable/Button';
import Panel from '../../../Panel';
import { Form } from '../../types';
import Header from '../Header';
import { RuntimeRangeProps } from './types';

const RuntimeRange = ({ form }: RuntimeRangeProps): ReactElement => {
  const theme = useTheme<Theme>();
  const [isMd] = useMediaQuery('(max-width: 760px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const handleOnChange = (runtime: Form['runtime'], number: number): void => {
    if (runtime.some((num) => num === number)) {
      form.setValue(
        'runtime',
        [...runtime].filter((num) => num !== number).sort((a, b) => a - b),
        { shouldDirty: true }
      );
    } else {
      form.setValue(
        'runtime',
        runtime.length > 1
          ? [...runtime, number].filter((_num, index) => index !== 0).sort((a, b) => a - b)
          : [...runtime, number].sort((a, b) => a - b),
        {
          shouldDirty: true
        }
      );
    }
  };

  return (
    <Controller
      control={form.control}
      name='runtime'
      render={({ field: { value } }) => (
        <Panel isFullWidth>
          {{
            header: (
              <Header
                label='Runtime Range'
                renderMessage={({ color, fontSize, fontWeight }) => (
                  <ScaleFade in={value.length > 0} unmountOnExit>
                    <Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
                      {value.map((runtime) => `${runtime} minutes`).join(' -> ')}
                    </Text>
                  </ScaleFade>
                )}
                renderButton={({ color, size, variant }) => (
                  <Button
                    color={color}
                    isDisabled={value.length === 0}
                    onClick={() => form.setValue('runtime', [], { shouldDirty: true })}
                    size={size}
                    variant={variant}
                  >
                    Clear
                  </Button>
                )}
              />
            ),
            body: (
              <ButtonGroup width='100%' isAttached>
                {_.range(0, 475, 45).map((number) => (
                  <Button
                    key={number}
                    color={value.some((runtime) => runtime === number) ? color : 'gray'}
                    isFullWidth
                    onClick={() => handleOnChange(value, number)}
                    size={isMd ? 'sm' : 'md'}
                    variant='outlined'
                    sx={{
                      back: {
                        borderRadius:
                          number === 0
                            ? `${theme.radii.base} 0 0 ${theme.radii.base}`
                            : number === 450
                            ? `0 ${theme.radii.base} ${theme.radii.base} 0`
                            : 0
                      },
                      front: {
                        borderRadius:
                          number === 0
                            ? `${theme.radii.base} 0 0 ${theme.radii.base}`
                            : number === 450
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

export default RuntimeRange;
