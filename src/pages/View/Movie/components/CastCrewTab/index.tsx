import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';
import sort from 'array-sort';

import VerticalGrid from '../../../../../components/Grid/Vertical';
import Cast from './components/Cast';
import Crew from './components/Crew';
import QuickToggles from './components/QuickToggles';
import { CastCrewTabProps, Department } from './types';

const CastCrewTab = (props: CastCrewTabProps): ReactElement => {
  const { cast, crew, isError = false, isSuccess = false, isLoading = true } = props;

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
          title: person.department,
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
        />

        <VStack width='100%' spacing={4}>
          <Cast cast={cast} isLoading={isLoading} isError={isError} isSuccess={isSuccess} />

          {departments.map((department, index) => (
            <Crew
              key={index}
              title={department.title}
              crew={department.crew}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
            />
          ))}
        </VStack>
      </VStack>
    </VerticalGrid>
  );
};

export default CastCrewTab;
