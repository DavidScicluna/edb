import React, { ReactElement } from 'react';

import arraySort from 'array-sort';

import { CrewTVCredit } from '../../../../../../../../../../common/types/person';
import MediaItem from '../MediaItem';

const CrewTV = ({ tv }: { tv: CrewTVCredit[] }): ReactElement => {
  /**
   * This method will split the list into 2:
   * 1: A list with tv shows that contain a date
   * 2: A list with tv shows that don't contain a date
   *
   * It will sort the 1st list in desc by 'first_air_date' and sort the second by 'name',
   * then it will combine both the lists together with the 2nd list being the first
   *
   * @returns - Array of tv shows
   */
  const handleSort = (): CrewTVCredit[] => {
    const withoutDate: CrewTVCredit[] = arraySort(
      tv.filter((show) => !show.first_air_date),
      'name',
      { reverse: true }
    );
    const withDate: CrewTVCredit[] = arraySort(
      tv.filter((show) => show.first_air_date),
      'first_air_date',
      { reverse: true }
    );

    return [...withoutDate, ...withDate];
  };

  return (
    <>
      {handleSort().map((show) => (
        <MediaItem
          key={show.id}
          id={show.id}
          mediaType='tv'
          title={show.name}
          subtitle={`${show?.episode_count ? `${show.episode_count} episodes as` : 'As'} ${show.job}`}
          date={show.first_air_date}
        />
      ))}
    </>
  );
};

export default CrewTV;
