import React, { ReactElement } from 'react';

import { Fade } from '@chakra-ui/react';
import _ from 'lodash';

import { handleReturnDate } from '../../../../../../common/utils';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import Accordions from '../../../../components/Accordions';
import Season from './components/Season';
import { SeasonsTabProps } from './types';

const SeasonsTab = (props: SeasonsTabProps): ReactElement => {
  const { show, isError = false, isSuccess = false, isLoading = true } = props;

  return !isLoading && isError ? (
    <Fade in unmountOnExit style={{ width: '100%' }}>
      <Error
        label='Oh no! Something went wrong'
        description={`Failed to fetch ${show?.name ? `"${show.name}"` : 'TV Show'} seasons list!`}
        variant='outlined'
      />
    </Fade>
  ) : !isLoading && isSuccess && show?.seasons && show.seasons.length === 0 ? (
    <Fade in unmountOnExit style={{ width: '100%' }}>
      <Empty
        label={`${show?.name ? `"${show.name}"` : 'TV Show'} seasons list is currently empty!`}
        variant='outlined'
      />
    </Fade>
  ) : (
    <Accordions
      accordions={
        !isLoading && isSuccess && show?.seasons && show.seasons.length > 0
          ? show.seasons.map((season, index) => {
              return {
                id: `${season.id || index}`,
                title: season.name || `Season ${season.season_number}`,
                subtitle: season?.air_date ? handleReturnDate(season.air_date, 'full') : undefined,
                total: {
                  number: season.episode_count || undefined,
                  suffix: season.episode_count ? ' episodes' : 'Confirmed'
                },
                isDisabled: season.episode_count === 0,
                data: { ...season }
              };
            })
          : _.range(0, 5).map((_dummy, index: number) => {
              return {
                id: `${index}`,
                title: `Season ${index + 1}`,
                subtitle: 'Season Date',
                isDisabled: true
              };
            })
      }
      renderAccordion={({ id, title, isOpen, data }) => (
        <Season key={id} id={id} title={title} showId={show?.id} season={data} isOpen={isOpen} />
      )}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default SeasonsTab;

// : .map((_dummy, index: number) => <DummySeason key={index} />)}