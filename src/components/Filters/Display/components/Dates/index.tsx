import { ReactElement } from 'react';

import _ from 'lodash';
import moment from 'moment';

import { DatesProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import Tag from '../../../../Clickable/Tag';

const visibleFormat = 'ddd, MMMM DD YYYY';

const Dates = ({ dates, mediaType, onClick, onDelete }: DatesProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	console.log(dates.lte);

	return (
		<Tag
			color={color}
			isClickable={!(_.isNil(onClick) || _.isEmpty(onClick))}
			onClick={onClick ? () => onClick() : undefined}
			onDelete={onDelete ? () => onDelete() : undefined}
			variant='outlined'
		>
			{`${mediaType === 'movie' ? 'Release Date' : 'First Air Date'}: ${
				moment(dates.gte).isSame(moment(dates.lte), 'date')
					? moment(dates.gte).format(visibleFormat)
					: _.compact([
							dates.gte ? `From: ${moment(dates.gte).format(visibleFormat)}` : null,
							dates.lte ? `To: ${moment(dates.lte).format(visibleFormat)}` : null
					  ]).join(' -> ')
			}`}
		</Tag>
	);
};

export default Dates;
