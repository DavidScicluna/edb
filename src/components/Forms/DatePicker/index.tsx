import { ReactElement, useState, useEffect } from 'react';

import { useDisclosure, useBoolean, HStack, Fade } from '@chakra-ui/react';

import { DateObj, useDayzed } from 'dayzed';
import _ from 'lodash';
import moment from 'moment';

import Calendar from './components/Calendar';
import Months from './components/Months';
import Years from './components/Years';
import { DatePickerProps } from './types';

import Button from '../../Clickable/Button';
import Icon from '../../Icon';
import Modal from '../../Modal';

const DatePicker = (props: DatePickerProps): ReactElement => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { renderToggleModal, color, onSetDate, value, minDate, maxDate, ...rest } = props;

	const [date, setDate] = useState<DateObj['date']>();

	const [isShowingYears, setIsShowingYears] = useBoolean();
	const [isShowingMonths, setIsShowingMonths] = useBoolean();

	const handleSetDate = (): void => {
		if (date && !Array.isArray(date)) {
			onSetDate(date);
		}

		onClose();
	};

	const handleSetYear = (year: number): void => {
		setDate(new Date(year, (date || new Date()).getMonth(), 1));

		setIsShowingYears.off();
	};

	const handleSetMonth = (month: number): void => {
		setDate(new Date((date || new Date()).getFullYear(), month, 1));

		setIsShowingMonths.off();
	};

	const handleClose = (): void => {
		setDate(undefined);

		setIsShowingYears.off();
		setIsShowingMonths.off();

		onClose();
	};

	const dayzed = useDayzed({
		...rest,
		date,
		minDate,
		maxDate,
		monthsToDisplay: 1,
		selected: date,
		onDateSelected: (dateObj) => setDate(dateObj.date)
	});

	useEffect(() => {
		setIsShowingYears.off();
		setIsShowingMonths.off();

		if (value) {
			setDate(value);
		}
	}, [isOpen]);

	return (
		<>
			{renderToggleModal({
				color: isOpen ? color : 'gray',
				icon: isOpen ? <Icon icon='date_range' type='filled' /> : <Icon icon='date_range' type='outlined' />,
				onClick: () => onOpen()
			})}

			<Modal
				title='Date Picker'
				renderActions={({ color, colorMode, size }) => (
					<HStack>
						<Fade
							in={date && !Array.isArray(date) ? !moment(date).isSame(new Date(), 'day') : false}
							unmountOnExit
						>
							<Button
								color={color}
								colorMode={colorMode}
								isDisabled={isShowingYears || isShowingMonths}
								onClick={() => setDate(new Date())}
								size={size}
								variant='text'
							>
								Today
							</Button>
						</Fade>
						<Button
							color={color}
							colorMode={colorMode}
							isDisabled={_.isNil(date) || isShowingYears || isShowingMonths}
							onClick={() => handleSetDate()}
							size={size}
						>
							Set Date
						</Button>
					</HStack>
				)}
				isOpen={isOpen}
				onClose={() => handleClose()}
				isCentered
				isConfirm
				size='md'
			>
				{isShowingMonths ? (
					<Months
						color={color}
						month={(date || new Date()).getMonth()}
						year={(date || new Date()).getFullYear()}
						minDate={minDate}
						maxDate={maxDate}
						onMonthClick={handleSetMonth}
					/>
				) : isShowingYears ? (
					<Years
						color={color}
						year={(date || new Date()).getFullYear()}
						minDate={minDate}
						maxDate={maxDate}
						onYearsClick={handleSetYear}
					/>
				) : (
					dayzed.calendars.map((calendar, index) => (
						<Calendar
							{...calendar}
							key={index}
							color={color}
							dayzed={dayzed}
							onToggleYears={() => setIsShowingYears.on()}
							onToggleMonths={() => setIsShowingMonths.on()}
						/>
					))
				)}
			</Modal>
		</>
	);
};

export default DatePicker;
