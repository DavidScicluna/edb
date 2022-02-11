import sort from 'array-sort';
import _ from 'lodash';

import { Credits, Department, Crew } from '../../types';

export const handleReturnCrew = (credits?: Credits): Department[] => {
  let departments: Department[] = [];

  credits?.crew?.forEach((person) => {
    if (departments.some((department) => department.title === person.department)) {
      departments = departments.map((department) =>
        department.title === person.department
          ? {
              ...department,
              people: department.people.some((crewPerson: Crew) => crewPerson.id === person.id)
                ? department.people.map((crewPerson: Crew) =>
                    crewPerson.id === person.id
                      ? {
                          ...crewPerson,
                          job: [crewPerson.job, person.job].filter((job) => job).join(', ')
                        }
                      : crewPerson
                  )
                : [...department.people, person]
            }
          : department
      );
    } else {
      departments.push({
        id: _.lowerCase(`${person.department}-crew`),
        title: person.department || '',
        people: [person]
      });
    }
  });

  return [
    {
      id: 'cast',
      title: 'Cast',
      people: credits?.cast || []
    },
    ...sort([...departments], 'title')
  ];
};
