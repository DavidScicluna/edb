import { ReactElement } from 'react';

import _ from 'lodash';

import { CountProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import Tag from '../../../../Clickable/Tag';

const Count = ({ counts, onClick, onDelete }: CountProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<Tag
			color={color}
			isClickable={!_.isNil(onClick) && !_.isEmpty(onClick)}
			onClick={onClick ? () => onClick() : undefined}
			onDelete={onDelete ? () => onDelete() : undefined}
			variant='outlined'
		>
			{`Count${counts.length > 1 ? 's' : ''}: ${counts.map((count) => `${count} ratings`).join(' -> ')}`}
		</Tag>
	);
};

export default Count;
