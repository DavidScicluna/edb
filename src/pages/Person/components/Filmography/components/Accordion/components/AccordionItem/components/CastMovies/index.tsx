import React, { ReactElement } from 'react';

import arraySort from 'array-sort';

import { CastMovieCredit } from '../../../../../../../../../../common/types/person';
import MediaItem from '../MediaItem';

const CastMovies = ({ movies }: { movies: CastMovieCredit[] }): ReactElement => {
  /**
   * This method will split the list into 2:
   * 1: A list with movies that contain a date
   * 2: A list with movies that don't contain a date
   *
   * It will sort the 1st list in desc by 'release_date' and sort the second by 'title',
   * then it will combine both the lists together with the 2nd list being the first
   *
   * @returns - Array of movies
   */
  const handleSort = (): CastMovieCredit[] => {
    const withDate: CastMovieCredit[] = arraySort(
      movies.filter((movie) => movie.release_date),
      'release_date',
      { reverse: true }
    );
    const withoutDate: CastMovieCredit[] = arraySort(
      movies.filter((movie) => !movie.release_date),
      'title',
      { reverse: true }
    );

    return [...withoutDate, ...withDate];
  };

  return (
    <>
      {handleSort().map((movie) => (
        <MediaItem
          key={movie.id}
          id={movie.id}
          mediaType='movie'
          title={movie.title}
          subtitle={movie.character ? `As ${movie.character}` : 'Unknown'}
          date={movie.release_date}
        />
      ))}
    </>
  );
};

export default CastMovies;
