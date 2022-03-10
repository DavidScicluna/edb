import { ReactElement } from 'react';

import { isNil, isEmpty } from 'lodash';

import { CountProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import Tag from '../../../../Clickable/Tag';

const Count = ({ counts, onClick, onDelete }: CountProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<Tag
			color={color}
			isClickable={!(isNil(onClick) || isEmpty(onClick))}
			onClick={onClick ? () => onClick() : undefined}
			onDelete={onDelete ? () => onDelete() : undefined}
			variant='outlined'
		>
			{`Count${counts.length > 1 ? 's' : ''}: ${counts.map((count) => `${count} ratings`).join(' -> ')}`}
		</Tag>
	);
};

export default Count;
