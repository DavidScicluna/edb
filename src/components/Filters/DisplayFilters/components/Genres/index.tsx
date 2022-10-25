import { FC } from 'react';

import { Tag, TagLabel, TagDeleteIconButton } from '@davidscicluna/component-library';

import { useSelector, useUserTheme } from '../../../../../common/hooks';

import { GenresProps } from './types';

const Genres: FC<GenresProps> = ({ mediaType, genres, onClick, onDelete }) => {
	const { color, colorMode } = useUserTheme();

	const allGenres = useSelector((state) => state.options.data.genres[mediaType] || []);

	return (
		<Tag
			color={color}
			colorMode={colorMode}
			isClickable={!!onClick}
			onClick={onClick ? () => onClick() : undefined}
			variant='outlined'
		>
			<TagLabel>
				{`Genre${genres.length === 1 ? '' : 's'}: ${allGenres
					.filter(({ id }) => genres.some((genre) => genre === id))
					.map(({ name }) => name)
					.join(', ')}`}
			</TagLabel>
			{!!onDelete && <TagDeleteIconButton onDelete={() => onDelete()} />}
		</Tag>
	);
};

export default Genres;
