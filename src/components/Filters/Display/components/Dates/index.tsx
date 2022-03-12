import { ReactElement } from 'react';

import dayjs from 'dayjs';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { DatesProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import Tag from '../../../../Clickable/Tag';

const visibleFormat = 'ddd, MMMM DD YYYY';

const Dates = ({ dates, mediaType, onClick, onDelete }: DatesProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	console.log(dates.lte);

	return (
		<Tag
			color={color}
			isClickable={!(isNil(onClick) || isEmpty(onClick))}
			onClick={onClick ? () => onClick() : undefined}
			onDelete={onDelete ? () => onDelete() : undefined}
			variant='outlined'
		>
			{`${mediaType === 'movie' ? 'Release Date' : 'First Air Date'}: ${
				dayjs(dates.gte).isSame(dayjs(dates.lte), 'date')
					? dayjs(dates.gte).format(visibleFormat)
					: compact([
							dates.gte ? `From: ${dayjs(dates.gte).format(visibleFormat)}` : null,
							dates.lte ? `To: ${dayjs(dates.lte).format(visibleFormat)}` : null
					  ]).join(' -> ')
			}`}
		</Tag>
	);
};

export default Dates;
