import { ReactElement } from 'react';

import { isNil, isEmpty } from 'lodash';

import { RatingProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import Tag from '../../../../Clickable/Tag';

const Rating = ({ ratings, onClick, onDelete }: RatingProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<Tag
			color={color}
			isClickable={!(isNil(onClick) || isEmpty(onClick))}
			onClick={onClick ? () => onClick() : undefined}
			onDelete={onDelete ? () => onDelete() : undefined}
			variant='outlined'
		>
			{`Rating${ratings.length > 1 ? 's' : ''}: ${ratings.join(' -> ')}`}
		</Tag>
	);
};

export default Rating;
