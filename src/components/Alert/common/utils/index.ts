import { IconType } from '@davidscicluna/component-library';

import { memoize } from 'lodash';

import { AlertColor, AlertDuration, AlertStatus } from '../../types';
import { duration as defaultDuration } from '../data/defaultPropValues';

type GetStatusProps = { status: AlertStatus };

export const getStatusColor = memoize(({ status }: GetStatusProps): AlertColor => {
	switch (status) {
		case 'error':
			return 'red';
		case 'info':
			return 'blue';
		case 'success':
			return 'green';
		case 'warning':
			return 'yellow';
	}
});

export const getStatusIcon = memoize(({ status }: GetStatusProps): IconType => {
	switch (status) {
		case 'success':
			return 'check_circle';
		case 'info':
			return 'info';
		case 'error':
			return 'error';
		case 'warning':
			return 'warning';
	}
});

type ConvertDurationToMSProps = { duration?: AlertDuration };

export const convertDurationToMS = memoize(({ duration = defaultDuration }: ConvertDurationToMSProps = {}) => {
	switch (duration) {
		case 5.5:
			return 5500;
		case 6:
			return 6000;
		case 6.5:
			return 6500;
		case 7:
			return 7000;
		case 7.5:
			return 7500;
		case 8:
			return 8000;
		case 8.5:
			return 8500;
		case 9:
			return 9000;
		case 9.5:
			return 9500;
		case 10:
			return 10000;
		case 10.5:
			return 10500;
		case 11:
			return 11000;
		case 11.5:
			return 11500;
		case 12:
			return 12000;
		case 12.5:
			return 12500;
		case 13:
			return 13000;
		case 13.5:
			return 13500;
		case 14:
			return 14000;
		case 14.5:
			return 14500;
		case 15:
			return 15000;
		case 15.5:
			return 15500;
		case 16:
			return 16000;
		case 16.5:
			return 16500;
		case 17:
			return 17000;
		case 17.5:
			return 17500;
		case 18:
			return 18000;
		case 18.5:
			return 18500;
		case 19:
			return 19000;
		case 19.5:
			return 19500;
		case 20:
			return 20000;
		default:
			return 5000;
	}
});
