import { ReactElement, useState } from 'react';

import { VStack } from '@chakra-ui/react';
import sort from 'array-sort';

import VerticalGrid from '../../../../components/Grid/Vertical';
import Cast from './components/Cast';
import Crew from './components/Crew';
import QuickToggles from './components/QuickToggles';
import { CastCrewTabProps, Department } from './types';

const CastCrewTab = (props: CastCrewTabProps): ReactElement => {
  const [openedPanels, setOpenedPanels] = useState<number[]>([]);

  const { mediaType, mediaItemTitle, cast, crew, isError = false, isSuccess = false, isLoading = true } = props;

  const handleTogglePanel = (index: number): void => {
    if (openedPanels.includes(index)) {
      setOpenedPanels(openedPanels.filter((number) => number !== index));
    } else {
      setOpenedPanels([...openedPanels, index]);
    }
  };

  const handleReturnCrew = (): Department[] => {
    let departments: Department[] = [];

    crew?.forEach((person) => {
      if (departments.some((department) => department.title === person.department)) {
        departments = departments.map((department) =>
          department.title === person.department
            ? {
                ...department,
                crew: department.crew.some((crewPerson) => crewPerson.id === person.id)
                  ? department.crew.map((crewPerson) =>
                      crewPerson.id === person.id
                        ? {
                            ...crewPerson,
                            job: [crewPerson.job, person.job].filter((job) => job).join(', ')
                          }
                        : crewPerson
                    )
                  : [...department.crew, person]
              }
            : department
        );
      } else {
        departments.push({
          title: person.department || '',
          crew: [person]
        });
      }
    });

    return sort([...departments], 'title');
  };

  const departments = handleReturnCrew();

  return (
    <VerticalGrid>
      <VStack width='100%' spacing={2}>
        <QuickToggles
          departments={['cast', ...departments.map((department) => department.title)]}
          isLoading={isLoading}
          onTogglePanel={(index: number) => setOpenedPanels([...openedPanels, index])}
        />

        <VStack width='100%' spacing={2}>
          <Cast
            mediaType={mediaType}
            mediaItemTitle={mediaItemTitle}
            cast={cast}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            isOpen={openedPanels.includes(0)}
            onToggle={() => handleTogglePanel(0)}
          />

          {departments.map((department, index) => (
            <Crew
              key={index}
              mediaType={mediaType}
              mediaItemTitle={mediaItemTitle}
              title={department.title}
              crew={department.crew}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
              isOpen={openedPanels.includes(index + 1)}
              onToggle={() => handleTogglePanel(index + 1)}
            />
          ))}
        </VStack>
      </VStack>
    </VerticalGrid>
  );
};

export default CastCrewTab;
