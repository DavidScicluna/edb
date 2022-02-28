import { ReactElement } from 'react';

import _ from 'lodash';
import moment from 'moment';

import { DatesProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import Tag from '../../../../Clickable/Tag';

const visibleFormat = 'ddd, MMMM DD YYYY';

const Dates = ({ dates, onClick, onDelete }: DatesProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<Tag
			color={color}
			isClickable={!_.isNil(onClick) && !_.isEmpty(onClick)}
			onClick={onClick ? () => onClick() : undefined}
			onDelete={onDelete ? () => onDelete() : undefined}
			variant='outlined'
		>
			{`Dates: ${
				moment(dates.gte).isSame(moment(dates.lte), 'dates')
					? moment(dates.gte).format(visibleFormat)
					: [dates.gte, dates.lte].map((dates) => moment(dates).format(visibleFormat)).join(' -> ')
			}`}
		</Tag>
	);
};

export default Dates;
