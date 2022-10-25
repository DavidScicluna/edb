import { FC } from 'react';

import MovieGenres from './components/MovieGenres';
import TVShowGenres from './components/TVShowGenres';
import { GenresProps } from './types';

const Genres: FC<GenresProps> = ({ form, mediaType }) => {
	switch (mediaType) {
		case 'movie':
			return <MovieGenres form={form} />;
		case 'tv':
			return <TVShowGenres form={form} />;
	}
};

export default Genres;
