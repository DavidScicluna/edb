import { ReactElement, useState } from 'react';

import { VStack } from '@chakra-ui/react';

import { handleReturnCrew } from './common/utils';
import Cast from './components/Cast';
import Crew from './components/Crew';
import QuickToggles from './components/QuickToggles';
import { Department, CastCrewProps } from './types';

const CastCrew = (props: CastCrewProps): ReactElement => {
  const [openedPanels, setOpenedPanels] = useState<number[]>([0]);

  const { credits, isError = false, isSuccess = false, isLoading = true } = props;

  const [departments] = useState<Department[]>(handleReturnCrew(credits));

  const handleTogglePanel = (index: number): void => {
    if (openedPanels.includes(index)) {
      setOpenedPanels(openedPanels.filter((number) => number !== index));
    } else {
      setOpenedPanels([...openedPanels, index]);
    }
  };

  const handleToggleAllPanels = (): void => {
    if (departments.length === openedPanels.length) {
      setOpenedPanels([]);
    } else {
      setOpenedPanels(departments.map((_department, index) => index));
    }
  };

  return (
    <VStack width='100%' spacing={2}>
      <QuickToggles
        departments={departments}
        openedPanels={openedPanels.length}
        isLoading={isLoading}
        onTogglePanel={(index: number) => setOpenedPanels([...openedPanels, index])}
        onToggleAllPanels={handleToggleAllPanels}
      />

      <VStack width='100%' spacing={2}>
        {departments.map((department, index) =>
          department.id === 'cast' ? (
            <Cast
              {...department}
              key={index}
              cast={department.people}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
              isOpen={openedPanels.includes(index)}
              onToggle={() => handleTogglePanel(index)}
            />
          ) : (
            <Crew
              {...department}
              key={index}
              crew={department.people}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
              isOpen={openedPanels.includes(index)}
              onToggle={() => handleTogglePanel(index)}
            />
          )
        )}
      </VStack>
    </VStack>
  );
};

export default CastCrew;
