import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useTheme, useMediaQuery, ButtonGroup, ScaleFade } from '@chakra-ui/react';

import _ from 'lodash';


import { RatingRangeProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { Theme } from '../../../../theme/types';
import Button from '../../../Clickable/Button';
import Panel from '../../../Panel';
import Rating from '../../../Rating';
import { Form } from '../../types';
import Header from '../Header';

const RatingRange = ({ form }: RatingRangeProps): ReactElement => {
  const theme = useTheme<Theme>();
  const [isMd] = useMediaQuery('(max-width: 760px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const handleOnChange = (rating: Form['rating'], number: number): void => {
    if (rating.some((num) => num === number)) {
      form.setValue(
        'rating',
        [...rating].filter((num) => num !== number).sort((a, b) => a - b),
        { shouldDirty: true }
      );
    } else {
      form.setValue(
        'rating',
        rating.length > 1
          ? [...rating, number].filter((_num, index) => index !== 0).sort((a, b) => a - b)
          : [...rating, number].sort((a, b) => a - b),
        {
          shouldDirty: true
        }
      );
    }
  };

  return (
    <Controller
      control={form.control}
      name='rating'
      render={({ field: { value } }) => (
        <Panel isFullWidth>
          {{
            header: (
              <Header
                label='Rating Range'
                renderMessage={() => (
                  <ScaleFade in={value.length > 0} unmountOnExit>
                    <Rating>{value.join(' -> ')}</Rating>
                  </ScaleFade>
                )}
                renderButton={({ color, size, variant }) => (
                  <Button
                    color={color}
                    isDisabled={value.length === 0}
                    onClick={() => form.setValue('rating', [], { shouldDirty: true })}
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
                {_.range(0, 11).map((number) => (
                  <Button
                    key={number}
                    color={value.some((rating) => rating === number) ? color : 'gray'}
                    isFullWidth
                    onClick={() => handleOnChange(value, number)}
                    size={isMd ? 'sm' : 'md'}
                    variant='outlined'
                    sx={{
                      back: {
                        borderRadius:
                          number === 0
                            ? `${theme.radii.base} 0 0 ${theme.radii.base}`
                            : number === 10
                            ? `0 ${theme.radii.base} ${theme.radii.base} 0`
                            : 0
                      },
                      front: {
                        borderRadius:
                          number === 0
                            ? `${theme.radii.base} 0 0 ${theme.radii.base}`
                            : number === 10
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

export default RatingRange;
