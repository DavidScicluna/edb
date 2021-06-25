import React, { ReactElement } from 'react';

import { Wrap, WrapItem } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import { Genre as GenreType } from '../../../../common/types/types';
import Container from '../Container';
import Genre from './components/Genre';
import { GenresProps } from './types';

const Genres = ({ mediaType, form }: GenresProps): ReactElement => {
  const movieGenres = useSelector((state) => state.options.data.data.genres.movie);
  const tvGenres = useSelector((state) => state.options.data.data.genres.tv);

  const handleGenreClick = (genre: GenreType, isActive: boolean): void => {
    const genres = form.getValues().genres;

    if (isActive) {
      form.setValue(
        'genres',
        genres.filter((activeGenre) => activeGenre.id !== genre.id),
        { shouldDirty: true }
      );
    } else {
      form.setValue('genres', [...genres, genre], { shouldDirty: true });
    }
  };

  return (
    <Controller
      control={form.control}
      name='genres'
      render={({ field: { value } }) => (
        <Container title='Genres'>
          <Wrap width='100%' spacing={1}>
            {mediaType === 'movie'
              ? movieGenres.map((genre) => (
                  <WrapItem key={genre.id}>
                    <Genre
                      {...genre}
                      isActive={value.some((activeGenre) => activeGenre.id === genre.id)}
                      onClick={handleGenreClick}
                    />
                  </WrapItem>
                ))
              : mediaType === 'tv'
              ? tvGenres.map((genre) => (
                  <WrapItem key={genre.id}>
                    <Genre
                      key={genre.id}
                      {...genre}
                      isActive={value.some((activeGenre) => activeGenre.id === genre.id)}
                      onClick={handleGenreClick}
                    />
                  </WrapItem>
                ))
              : null}
          </Wrap>
        </Container>
      )}
    />
  );
};

export default Genres;
