import { sort } from 'fast-sort';
import { lowerCase, memoize } from 'lodash';

import { ViewCrewMediaType, ViewCrewDepartments, ViewCrewGetDepartmentType } from '../../types';

type GetCrewDepartmentsProps<MT extends ViewCrewMediaType> = {
	crew: ViewCrewGetDepartmentType<MT>[];
};

export const getCrewDepartments = memoize(
	<MT extends ViewCrewMediaType>({ crew = [] }: GetCrewDepartmentsProps<MT>): ViewCrewDepartments<MT> => {
		let departments: ViewCrewDepartments<MT> = [];

		crew.forEach((person) => {
			const id = lowerCase(person.job || '');

			if (departments.some(({ id: departmentID }) => departmentID === id)) {
				departments = departments.map((department) => {
					if (department.id === id) {
						return {
							...department,
							data: [...department.data, person]
						};
					} else {
						return { ...department };
					}
				});
			} else {
				departments.push({
					id,
					title: person.job || '',
					data: [person]
				});
			}
		});

		return sort([...departments]).asc(({ id }) => id);
	}
);
