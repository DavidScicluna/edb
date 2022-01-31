import React, { ReactElement, useState } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import Department from './components/Department';
import MediaItems from './components/MediaItems';
import QuickToggles from './components/QuickToggles';
import { CreditsProps } from './types';

const Credits = (props: CreditsProps): ReactElement => {
  const [openedPanels, setOpenedPanels] = useState<number[]>([]);

  const { departments = [], name, isLoading = true, isError = false, isSuccess = false } = props;

  const handleTogglePanel = (index: number): void => {
    if (openedPanels.includes(index)) {
      setOpenedPanels(openedPanels.filter((number) => number !== index));
    } else {
      setOpenedPanels([...openedPanels, index]);
    }
  };

  const handleToggleAllPanels = (): void => {
    if (departments.length === openedPanels.length - 1) {
      setOpenedPanels([]);
    } else {
      setOpenedPanels([...departments.map((_department, index) => index)]);
    }
  };

  return (
    <VStack width='100%' spacing={2}>
      <QuickToggles
        departments={departments.map((department) => department.label)}
        openedPanels={openedPanels.length}
        isLoading={isLoading}
        onTogglePanel={(index: number) => setOpenedPanels([...openedPanels, index])}
        onToggleAllPanels={handleToggleAllPanels}
      />

      {!isLoading && isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} credits list!`}
          variant='outlined'
        />
      ) : !isLoading && isSuccess && departments.length === 0 ? (
        <Empty label={`${name ? `"${name}" credits` : 'Credits'} list is currently empty!`} variant='outlined' />
      ) : !isLoading && isSuccess && departments.length > 0 ? (
        departments.map((department, index: number) => (
          <Department
            key={index}
            id={department.label}
            title={department.label}
            total={
              (department.credits.cast?.movie?.length || 0) +
              (department.credits.cast?.tv?.length || 0) +
              (department.credits.crew?.movie?.length || 0) +
              (department.credits.crew?.tv?.length || 0)
            }
            isOpen={openedPanels.some((panel) => panel === index)}
            isLoading={false}
            onToggle={() => handleTogglePanel(index)}
          >
            <MediaItems
              movies={[...(department.credits.cast?.movie || []), ...(department.credits.crew?.movie || [])]}
              shows={[...(department.credits.cast?.tv || []), ...(department.credits.crew?.tv || [])]}
              label={department.label}
              job={
                (department.credits.cast?.movie?.length || 0) + (department.credits.cast?.tv?.length || 0) >
                (department.credits.crew?.movie?.length || 0) + (department.credits.crew?.tv?.length || 0)
                  ? 'cast'
                  : 'crew'
              }
            />
          </Department>
        ))
      ) : (
        _.range(0, 10).map((_dummy, index: number) => <Department key={index} title='Department Label' isLoading />)
      )}
    </VStack>
  );
};

export default Credits;
