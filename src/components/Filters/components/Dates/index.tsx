import React, { ReactElement } from 'react';

import { useMediaQuery, Stack, Text, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';
import { Controller } from 'react-hook-form';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../Clickable/Button';
import DatePicker from '../../../Forms/DatePicker';
import Panel from '../../../Panel';
import Header from '../Header';
import { DatesProps } from './types';

const minDate = new Date(1900, 1);
const maxDate = new Date(2100, 1);

const dataFormat = 'YYYY-MM-DD';
const visibleFormat = 'ddd, MMMM DD YYYY';

const Dates = ({ form, mediaType }: DatesProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <Controller
      control={form.control}
      name='date'
      render={({ field: { value } }) => (
        <Panel isFullWidth>
          {{
            header: (
              <Header
                label={mediaType === 'movie' ? 'Release Date' : 'First Air Date'}
                renderMessage={({ color, fontSize, fontWeight }) => (
                  <ScaleFade in={value.every((date) => !_.isNil(date))} unmountOnExit>
                    <Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
                      {moment(value[0]).isSame(moment(value[1]), 'date')
                        ? moment(value[0]).format(visibleFormat)
                        : value.map((date) => moment(date).format(visibleFormat)).join(' - ')}
                    </Text>
                  </ScaleFade>
                )}
                renderButton={({ color, size, variant }) => (
                  <Button
                    color={color}
                    isDisabled={value.every((date) => _.isNil(date))}
                    onClick={() => form.setValue('date', [undefined, undefined], { shouldDirty: true })}
                    size={size}
                    variant={variant}
                  >
                    Clear
                  </Button>
                )}
              />
            ),
            body: (
              <Stack
                width='100%'
                direction={isSm ? 'column' : 'row'}
                alignItems='center'
                justifyContent='center'
                spacing={2}
              >
                <span style={{ width: '100%' }}>
                  <DatePicker
                    renderToggleModal={({ color, onClick }) => (
                      <Button color={color} isFullWidth onClick={onClick} variant='outlined'>
                        {value[0] ? moment(value[0]).format(visibleFormat) : 'Select Start Date'}
                      </Button>
                    )}
                    color={color}
                    minDate={minDate}
                    maxDate={maxDate}
                    firstDayOfWeek={1}
                    value={value[0] ? moment(value[0], dataFormat).toDate() : undefined}
                    onSetDate={(date) =>
                      form.setValue(
                        'date',
                        [
                          moment(date).format(dataFormat),
                          moment(value[1] ? moment(value[1]).format(dataFormat) : moment(date).add(1, 'days')).format(
                            dataFormat
                          )
                        ],
                        {
                          shouldDirty: true
                        }
                      )
                    }
                  />
                </span>

                <span style={{ width: '100%' }}>
                  <DatePicker
                    renderToggleModal={({ color, onClick }) => (
                      <Button color={color} isFullWidth onClick={onClick} variant='outlined'>
                        {value[1] ? moment(value[1]).format(visibleFormat) : 'Select To Date'}
                      </Button>
                    )}
                    color={color}
                    minDate={moment(value[0], dataFormat).toDate() || minDate}
                    maxDate={maxDate}
                    firstDayOfWeek={1}
                    value={value[1] ? moment(value[1], dataFormat).toDate() : undefined}
                    onSetDate={(date) =>
                      form.setValue('date', [moment(value[0]).format(dataFormat), moment(date).format(dataFormat)], {
                        shouldDirty: true
                      })
                    }
                  />
                </span>
              </Stack>
            )
          }}
        </Panel>
      )}
    />
  );
};

export default Dates;
