import { sort } from 'fast-sort';
import { capitalize, lowerCase, memoize } from 'lodash';

import { ViewCrewMediaType, ViewCrewDepartments, ViewCrewGetDepartmentType } from '../../types';

type GetCrewDepartmentsProps<MT extends ViewCrewMediaType> = {
	crew: ViewCrewGetDepartmentType<MT>[];
};

export const getMovieCrewDepartments = memoize(
	({ crew = [] }: GetCrewDepartmentsProps<'movie'>): ViewCrewDepartments<'movie'> => {
		let departments: ViewCrewDepartments<'movie'> = [];

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
					title: capitalize(id),
					data: [person]
				});
			}
		});

		return sort([...departments]).asc(({ id }) => id);
	}
);

export const getTVShowCrewDepartments = memoize(
	({ crew = [] }: GetCrewDepartmentsProps<'tv'>): ViewCrewDepartments<'tv'> => {
		let departments: ViewCrewDepartments<'tv'> = [];

		crew.forEach((person) => {
			const { jobs = [] } = person;

			jobs.forEach(({ job }) => {
				const id = lowerCase(job || '');

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
						title: capitalize(id),
						data: [person]
					});
				}
			});
		});

		return sort([...departments]).asc(({ id }) => id);
	}
);
