import React, { ReactElement, useState } from 'react';

import { useDisclosure, useBoolean, HStack, Fade } from '@chakra-ui/react';
import {
  DateRangeOutlined as DateRangeOutlinedIcon,
  DateRangeTwoTone as DateRangeTwoToneIcon
} from '@material-ui/icons';
import { useDayzed } from 'dayzed';
import _ from 'lodash';
import moment from 'moment';
import { useElementSize } from 'usehooks-ts';

import Button from '../../Clickable/Button';
import Modal from '../../Modal';
import Calendar from './components/Calendar';
import Divider from './components/Divider';
import { DatePickerProps } from './types';

const DatePicker = (props: DatePickerProps): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { selected, renderToggleModal, color, ...rest } = props;

  const [ref, { height }] = useElementSize();

  const [isShowingYears, setIsShowingYears] = useBoolean();
  const [isShowingMonths, setIsShowingMonths] = useBoolean();

  const dayzed = useDayzed({ ...rest, selected });

  // const handleSubmit = (): void => {
  //   form.reset({ ...defaultValues });
  //   onClose();
  // };

  const handleClose = (): void => {
    // form.reset({ ...defaultValues });
    onClose();
  };

  // console.log(dayzed.getDateProps());
  // console.log(dayzed.getDateProps({ dateObj: dayzed.calendars[0].weeks[0][0] }));
  // console.log(getForwardProps());

  return (
    <>
      {renderToggleModal({
        color: isOpen ? color : 'gray',
        icon: isOpen ? <DateRangeTwoToneIcon /> : <DateRangeOutlinedIcon />,
        onClick: () => onOpen()
      })}

      <Modal
        title='Date Picker'
        renderActions={({ color, colorMode, size }) => (
          <HStack spacing={2}>
            <Fade
              in={selected && !Array.isArray(selected) ? moment(selected).isSame(new Date(), 'day') : false}
              unmountOnExit
            >
              <Button
                color={color}
                colorMode={colorMode}
                // onClick={() => form.reset({ ...defaultValues })}
                size={size}
                variant='text'
              >
                Today
              </Button>
            </Fade>
            <Button
              color={color}
              colorMode={colorMode}
              isDisabled={_.isNil(selected)}
              // onClick={form.handleSubmit((values) => handleSubmit(values))}
              size={size}
            >
              Set Date
            </Button>
          </HStack>
        )}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
        size='xl'
      >
        <HStack ref={ref} width='100%' divider={<Divider height={height} />}>
          {dayzed.calendars.map((calendar, index) => (
            <Calendar
              {...calendar}
              key={index}
              color={color}
              dayzed={dayzed}
              onToggleYears={() => setIsShowingYears.on()}
              onToggleMonths={() => setIsShowingMonths.on()}
            />
          ))}
        </HStack>
      </Modal>
    </>
  );
};

export default DatePicker;
