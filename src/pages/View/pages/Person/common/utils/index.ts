import sort from 'array-sort';

import { MovieCredits, TVCredits } from '../../../../../../common/types/person';
import { Department } from '../../types';

/**
 * This method will take all the credits and place them in their respective object
 *
 * @returns Array of Objects - Of Departments containing all credits
 */
export const handleGetDepartments = (movies: MovieCredits, tv: TVCredits): Department[] => {
	let departments: Department[] = [];

	if ((movies.cast?.length || 0) > 0 || (tv.cast?.length || 0) > 0) {
		departments.push({
			id: 'actor',
			label: 'Actor',
			credits: {
				cast: {
					movie: movies.cast || [],
					tv: tv.cast || []
				}
			}
		});
	}

	(movies.crew || []).forEach((mediaItem) => {
		if (departments.some((department) => department.label === mediaItem.job)) {
			departments = departments.map((department) =>
				department.label === mediaItem.job
					? {
							...department,
							credits: {
								...department.credits,
								crew: {
									...department.credits.crew,
									movie: [...(department.credits.crew?.movie || []), { ...mediaItem }]
								}
							}
					  }
					: department
			);
		} else {
			departments.push({
				id: (mediaItem.job || '').toLowerCase() || '',
				label: mediaItem.job || '',
				credits: {
					crew: {
						movie: [{ ...mediaItem }],
						tv: []
					}
				}
			});
		}
	});

	(tv.crew || []).forEach((mediaItem) => {
		if (departments.some((department) => department.label === mediaItem.job)) {
			departments = departments.map((department) =>
				department.label === mediaItem.job
					? {
							...department,
							credits: {
								...department.credits,
								crew: {
									...department.credits.crew,
									tv: [...(department.credits.crew?.tv || []), { ...mediaItem }]
								}
							}
					  }
					: department
			);
		} else {
			departments.push({
				id: (mediaItem.job || '').toLowerCase() || '',
				label: mediaItem.job || '',
				credits: {
					crew: {
						movie: [],
						tv: [{ ...mediaItem }]
					}
				}
			});
		}
	});

	return sort([...departments], 'label');
};
