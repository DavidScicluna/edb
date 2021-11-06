import React, { ReactElement, useState } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import Empty from '../../../../../components/Empty';
import Error from '../../../../../components/Error';
import DummySeason from './components/DummySeason';
import QuickToggles from './components/QuickToggles';
import Season from './components/Season';
import { SeasonsTabProps } from './types';

const SeasonsTab = (props: SeasonsTabProps): ReactElement => {
  const [openedSeasons, setOpenedSeasons] = useState<number[]>([]);

  const { seasons, tvId, name, isError = false, isSuccess = false, isLoading = true } = props;

  const handleToggleSeason = (index: number): void => {
    if (openedSeasons.includes(index)) {
      setOpenedSeasons(openedSeasons.filter((number) => number !== index));
    } else {
      setOpenedSeasons([...openedSeasons, index]);
    }
  };

  const handleToggleAllSeasons = (): void => {
    if (seasons?.length === openedSeasons.length) {
      setOpenedSeasons([]);
    } else {
      setOpenedSeasons([...(seasons || [])?.map((_season, index) => index)]);
    }
  };

  return (
    <VStack width='100%' spacing={2}>
      <QuickToggles
        seasons={seasons?.map((season) => season.name)}
        openedSeasons={openedSeasons.length}
        isError={isError}
        isLoading={isLoading}
        onToggleSeason={(index: number) => setOpenedSeasons([...openedSeasons, index])}
        onToggleAllSeasons={handleToggleAllSeasons}
      />

      {!isLoading && isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} tv show seasons list!`}
          variant='outlined'
        />
      ) : !isLoading && isSuccess && seasons && seasons.length === 0 ? (
        <Empty label={`${name ? `"${name}"` : ''} tv show seasons list is currently empty!`} variant='outlined' />
      ) : !isLoading && isSuccess && seasons && seasons.length > 0 ? (
        seasons.map((season, index) => (
          <Season
            key={season.id}
            tvId={tvId}
            index={index}
            season={season}
            isOpen={openedSeasons.includes(index)}
            onToggle={() => handleToggleSeason(index)}
          />
        ))
      ) : (
        _.range(0, 20).map((_dummy, index: number) => <DummySeason key={index} />)
      )}
    </VStack>
  );
};

export default SeasonsTab;
