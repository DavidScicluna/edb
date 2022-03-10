import sort from 'array-sort';
import { lowerCase, compact } from 'lodash';

import { Role as TVRole, Job as TVJob } from '../../../../../../common/types/tv';
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
				id: lowerCase(`${person.department}-crew`),
				title: person.department || '',
				people: [person]
			});
		}
	});

	return compact([
		{
			id: 'cast',
			title: 'Cast',
			people: credits?.cast || []
		},
		credits?.guest_stars
			? {
					id: 'guest_stars',
					title: 'Guest Stars',
					people: credits?.guest_stars || []
			  }
			: undefined,
		...sort([...departments], 'title')
	]);
};

/**
 * This method will create a proper label for tv show cast person
 *
 * @param roles - All roles associated with the person
 * @returns String - A proper label highlighting the episode count and the character name
 */
export const handleReturnPersonRoleLabel = (roles: TVRole[]): string => {
	const role = roles.reduce((prev, current) =>
		(prev?.episode_count || 0) > (current?.episode_count || 0) ? prev : current
	);

	return `${role.episode_count} episode${
		(role?.episode_count || 0) === 0 || (role?.episode_count || 0) > 1 ? 's' : ''
	} as ${role.character}`;
};

/**
 * This method will create a proper label for tv show crew person
 *
 * @param jobs - All jobs associated with the person
 * @returns String - A proper label highlighting the episode count and the job name
 */
export const handleReturnPersonJobLabel = (jobs: TVJob[]): string => {
	const job = jobs.reduce((prev, current) =>
		(current?.episode_count || 0) > (current?.episode_count || 0) ? prev : current
	);

	return `${job.episode_count} episode${
		(job?.episode_count || 0) === 0 || (job?.episode_count || 0) > 1 ? 's' : ''
	} as ${job.job}`;
};
