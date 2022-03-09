import { ReactElement } from 'react';

import { isNil, isEmpty } from 'lodash';

import { RuntimeProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import Tag from '../../../../Clickable/Tag';

const Runtime = ({ runtimes, onClick, onDelete }: RuntimeProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

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
