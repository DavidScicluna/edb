import React, { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import {
  ChevronLeftOutlined as ChevronLeftOutlinedIcon,
  ChevronRightOutlined as ChevronRightOutlinedIcon
} from '@material-ui/icons';

import Button from '../../../../../../Clickable/Button';
import IconButton from '../../../../../../Clickable/IconButton';
import { full } from '../../../../common/data/months';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const { dayzed, month, year, onToggleYears, onToggleMonths } = props;

  return (
    <HStack width='100%' justifyContent='space-between' spacing={2}>
      {/* Back Button */}
      <IconButton
        {...dayzed.getBackProps({ calendars: dayzed.calendars })}
        aria-label={`Go to ${full[month - 1] || ''} month`}
        size='lg'
        variant='icon'
      >
        <ChevronLeftOutlinedIcon />
      </IconButton>

      {/* Month & Year */}
      <HStack spacing={0}>
        <Button color='gray' onClick={() => onToggleMonths()} size='lg' variant='text'>
          {full[month] || 'Month'}
        </Button>
        <Button color='gray' onClick={() => onToggleYears()} size='lg' variant='text'>
          {year}
        </Button>
      </HStack>

      {/* Forward Button */}
      <IconButton
        {...dayzed.getForwardProps({ calendars: dayzed.calendars })}
        aria-label={`Go to ${full[month + 1] || ''} month`}
        size='lg'
        variant='icon'
      >
        <ChevronRightOutlinedIcon />
      </IconButton>
    </HStack>
  );
};

export default Header;
