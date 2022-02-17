import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useTheme, useMediaQuery, ButtonGroup, Text, ScaleFade } from '@chakra-ui/react';

import _ from 'lodash';


import { CountRangeProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { Theme } from '../../../../theme/types';
import Button from '../../../Clickable/Button';
import Panel from '../../../Panel';
import { Form } from '../../types';
import Header from '../Header';

const CountRange = ({ form }: CountRangeProps): ReactElement => {
  const theme = useTheme<Theme>();
  const [isMd] = useMediaQuery('(max-width: 760px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const handleOnChange = (count: Form['count'], number: number): void => {
    if (count.some((num) => num === number)) {
      form.setValue(
        'count',
        [...count].filter((num) => num !== number).sort((a, b) => a - b),
        { shouldDirty: true }
      );
    } else {
      form.setValue(
        'count',
        count.length > 1
          ? [...count, number].filter((_num, index) => index !== 0).sort((a, b) => a - b)
          : [...count, number].sort((a, b) => a - b),
        {
          shouldDirty: true
        }
      );
    }
  };

  return (
    <Controller
      control={form.control}
      name='count'
      render={({ field: { value } }) => (
        <Panel isFullWidth>
          {{
            header: (
              <Header
                label='Number of Ratings Range'
                renderMessage={({ color, fontSize, fontWeight }) => (
                  <ScaleFade in={value.length > 0} unmountOnExit>
                    <Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
                      {value.map((count) => `${count} ratings`).join(' -> ')}
                    </Text>
                  </ScaleFade>
                )}
                renderButton={({ color, size, variant }) => (
                  <Button
                    color={color}
                    isDisabled={value.length === 0}
                    onClick={() => form.setValue('count', [], { shouldDirty: true })}
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
                {_.range(0, 550, 50).map((number) => (
                  <Button
                    key={number}
                    color={value.some((count) => count === number) ? color : 'gray'}
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

export default CountRange;
