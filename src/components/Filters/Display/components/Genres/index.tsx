import { ReactElement } from 'react';

import { isNil, isEmpty } from 'lodash';

import { GenresProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import Tag from '../../../../Clickable/Tag';

const Genres = ({ genres, mediaType, onClick, onDelete }: GenresProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);
	const allGenres = useSelector((state) =>
		mediaType === 'movie' ? state.options.data.genres.movie : state.options.data.genres.tv
	);

	return (
		<Tag
			color={color}
			isClickable={!(isNil(onClick) || isEmpty(onClick))}
			onClick={onClick ? () => onClick() : undefined}
			onDelete={onDelete ? () => onDelete() : undefined}
			variant='outlined'
			sx={{ maxWidth: '400px' }}
		>
			{`Genre${genres.length > 1 ? 's' : ''}: ${allGenres
				.filter((genre) => genres.some((filterGenre) => genre.id === filterGenre))
				.map((genre) => genre.name)
				.join(', ')}`}
		</Tag>
	);
};

export default Genres;
