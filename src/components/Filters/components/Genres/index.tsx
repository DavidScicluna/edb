import React, { ReactElement } from 'react';

import { Wrap, WrapItem } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { useSelector } from '../../../../common/hooks';
import { Genre as GenreType } from '../../../../common/types/types';
import Button from '../../../../components/Clickable/Button';
import Container from '../Container';
import Genre from './components/Genre';
import { GenresProps } from './types';

const Genres = ({ mediaType, form }: GenresProps): ReactElement => {
  const movieGenres = useSelector((state) => state.options.data.data.genres.movie);
  const tvGenres = useSelector((state) => state.options.data.data.genres.tv);

  const handleGenreClick = (genre: GenreType): void => {
    const genres = form.getValues().genres;

    if (form.getValues().genres.some((activeGenre) => activeGenre.id === genre.id)) {
      form.setValue(
        'genres',
        genres.filter((activeGenre) => activeGenre.id !== genre.id),
        { shouldDirty: true }
      );
    } else {
      form.setValue('genres', [...genres, genre], { shouldDirty: true });
    }
  };

  const handleAllClick = (): void => {
    const genres = mediaType === 'movie' ? [...movieGenres] : [...tvGenres];

    if (form.getValues().genres.length === genres.length) {
      form.setValue('genres', [], { shouldDirty: true });
    } else {
      form.setValue('genres', [...genres], { shouldDirty: true });
    }
  };

  const handleAllLabel = (): string => {
    const genres = mediaType === 'movie' ? [...movieGenres] : [...tvGenres];

    return `${form.getValues().genres.length === genres.length ? 'Remove' : 'Select'} All`;
  };

  return (
    <Controller
      control={form.control}
      name='genres'
      render={({ field: { value } }) => (
        <Container
          title='Genres'
          actions={
            <Button onClick={() => handleAllClick()} size='sm' variant='text'>
              {handleAllLabel()}
            </Button>
          }>
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
