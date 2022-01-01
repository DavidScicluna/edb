import React, { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { Controller } from 'react-hook-form';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../Clickable/Button';
import Panel from '../../../Panel';
import { SortBy } from '../../types';
import { SortProps } from './types';

const Sort = ({ form, sortBy }: SortProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  const handleOnChange = (sort: SortBy) => {
    form.setValue('sortBy', sort, { shouldDirty: true });
  };

  return (
    <Controller
      control={form.control}
      name='sortBy'
      render={({ field: { value } }) => (
        <Panel isFullWidth>
          {{
            header: {
              title: 'Sort by'
            },
            body: (
              <VStack width='100%' spacing={2}>
                {sortBy.map((sort) => (
                  <span key={sort.value} style={{ width: '100%' }}>
                    <Button
                      color={sort.value === value.value ? color : 'gray'}
                      renderRightIcon={
                        sort.value === value.value
                          ? ({ fontSize }) => <CheckOutlinedIcon style={{ fontSize }} />
                          : undefined
                      }
                      isFullWidth
                      onClick={sort.value !== value.value ? () => handleOnChange(sort) : undefined}
                      size='lg'
                      variant='outlined'
                    >
                      {sort.label}
                    </Button>
                  </span>
                ))}
              </VStack>
            )
          }}
        </Panel>
      )}
    />
  );
};

export default Sort;
