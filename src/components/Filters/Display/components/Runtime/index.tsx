import { ReactElement } from 'react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';


import { useSelector } from '../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import Tag from '../../../../Clickable/Tag';

import { RuntimeProps } from './types';

const Runtime = ({ runtimes, onClick, onDelete }: RuntimeProps): ReactElement => {
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
			{`Runtime${runtimes.length > 1 ? 's' : ''}: ${runtimes
				.map((runtime) => `${runtime} minutes`)
				.join(' -> ')}`}
		</Tag>
	);
};

export default Runtime;
