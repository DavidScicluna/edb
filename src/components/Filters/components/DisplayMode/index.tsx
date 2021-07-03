import React, { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import {
  GridOnOutlined as GridOnOutlinedIcon,
  GridOnTwoTone as GridOnTwoToneIcon,
  ListAltOutlined as ListAltOutlinedIcon,
  ListAltTwoTone as ListAltTwoToneIcon
} from '@material-ui/icons';
import { Controller, UseFormReturn } from 'react-hook-form';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import utils from '../../../../common/utils/utils';
import Button from '../../../Inputs/Button';
import { Form } from '../../types';
import Container from '../Container';

const DisplayMode = ({ form }: { form: UseFormReturn<Form> }): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <Controller
      control={form.control}
      name='displayMode'
      render={({ field: { value } }) => (
        <Container title='Display Mode'>
          <HStack width='100%' spacing={2}>
            <Button
              color={value === 'grid' ? utils.handleReturnColor(color) : 'gray'}
              leftIcon={value === 'grid' ? GridOnTwoToneIcon : GridOnOutlinedIcon}
              isFullWidth
              onClick={value !== 'grid' ? () => form.setValue('displayMode', 'grid', { shouldDirty: true }) : undefined}
              variant='outlined'>
              Grid
            </Button>
            <Button
              color={value === 'list' ? utils.handleReturnColor(color) : 'gray'}
              leftIcon={value === 'list' ? ListAltTwoToneIcon : ListAltOutlinedIcon}
              isFullWidth
              onClick={value !== 'list' ? () => form.setValue('displayMode', 'list', { shouldDirty: true }) : undefined}
              variant='outlined'>
              List
            </Button>
          </HStack>
        </Container>
      )}
    />
  );
};

export default DisplayMode;
