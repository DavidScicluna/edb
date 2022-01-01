import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Stack, HStack, Text, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';
import { Controller } from 'react-hook-form';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../Clickable/Button';
import DatePicker from '../../../Forms/DatePicker';
import Panel from '../../../Panel';
import { DatesProps } from './types';

const minDate = new Date(1900, 1);
const maxDate = new Date(2100, 1);

const dataFormat = 'YYYY-MM-DD';
const visibleFormat = 'ddd, MMMM DD YYYY';

const Dates = ({ form, mediaType }: DatesProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <Controller
      control={form.control}
      name='date'
      render={({ field: { value } }) => (
        <Panel isFullWidth>
          {{
            header: {
              title: mediaType === 'movie' ? 'Release Date' : 'First Air Date',
              actions: (
                <HStack spacing={2}>
                  <ScaleFade in={value.every((date) => !_.isNil(date))} unmountOnExit>
                    <Text color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' fontWeight='medium'>
                      {moment(value[0]).isSame(moment(value[1]), 'date')
                        ? moment(value[0]).format(visibleFormat)
                        : value.map((date) => moment(date).format(visibleFormat)).join(' - ')}
                    </Text>
                  </ScaleFade>
                  <Button
                    color={color}
                    isDisabled={value.every((date) => _.isNil(date))}
                    onClick={() => form.setValue('date', [undefined, undefined], { shouldDirty: true })}
                    size='sm'
                    variant='text'
                  >
                    Clear
                  </Button>
                </HStack>
              )
            },
            body: (
              <Stack
                width='100%'
                direction={isSm ? 'column' : 'row'}
                alignItems='center'
                justifyContent='center'
                spacing={2}
              >
                <DatePicker
                  renderToggleModal={
                    ({ color, icon, onClick }) => (
                      // isSm ? (
                      <Button
                        color={color}
                        // renderLeftIcon={({ fontSize }) => <Icon style={{ fontSize }} />}
                        isFullWidth
                        onClick={onClick}
                        variant='outlined'
                      >
                        {value[0] ? moment(value[0]).format(visibleFormat) : 'Select Start Date'}
                      </Button>
                      // )
                      //  : (
                      // <IconButton
                      //   aria-label='Open Filters'
                      //   color={color}
                      //   isDisabled={moviesQuery.isFetching || moviesQuery.isLoading || moviesQuery.isError}
                      //   onClick={onClick}
                      //   variant='outlined'
                      // >
                      //   {icon}
                      // </IconButton>
                    )
                    // )
                  }
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
                        moment(moment(value[1]).format(dataFormat) || moment(date).add(1, 'days')).format(dataFormat)
                      ],
                      {
                        shouldDirty: true
                      }
                    )
                  }
                />
                <Text
                  align='center'
                  color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
                  fontSize='md'
                  fontWeight='semibold'
                >
                  TO
                </Text>
                <DatePicker
                  renderToggleModal={
                    ({ color, icon, onClick }) => (
                      // isSm ? (
                      <Button
                        color={color}
                        // renderLeftIcon={({ fontSize }) => <Icon style={{ fontSize }} />}
                        isFullWidth
                        onClick={onClick}
                        variant='outlined'
                      >
                        {value[1] ? moment(value[1]).format(visibleFormat) : 'Select To Date'}
                      </Button>
                      // )
                      //  : (
                      // <IconButton
                      //   aria-label='Open Filters'
                      //   color={color}
                      //   isDisabled={moviesQuery.isFetching || moviesQuery.isLoading || moviesQuery.isError}
                      //   onClick={onClick}
                      //   variant='outlined'
                      // >
                      //   {icon}
                      // </IconButton>
                    )
                    // )
                  }
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
              </Stack>
            )
          }}
        </Panel>
      )}
    />
  );
};

export default Dates;
