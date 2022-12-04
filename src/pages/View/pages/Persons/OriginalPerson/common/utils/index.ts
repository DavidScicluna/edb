import dayjs from 'dayjs';
import { sort } from 'fast-sort';
import { compact, keys, lowerCase, memoize, toString, uniq, uniqBy } from 'lodash';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { Credits, FullPerson } from '../../../../../../../common/types/person';
import { PersonCredit, PersonCredits, PersonDepartment, PersonDepartments, PersonKnownForCredits } from '../../types';

dayjs.extend(localizedFormat);

type SplitCreditsByYearProps = { credits: PersonCredit[] };

const splitCreditsByYear = memoize(
	<C extends PersonCredit>({ credits = [] }: SplitCreditsByYearProps): PersonCredits<C> => {
		const formattedCredits: PersonCredits<C> = {};

		credits.forEach((credit) => {
			const year = String(dayjs(credit.release_date || credit.first_air_date).year() || 'Announced');

			if (formattedCredits && formattedCredits[year]) {
				formattedCredits[year] = uniq(
					sort([...formattedCredits[year], credit]).desc(({ release_date, first_air_date }) =>
						dayjs(release_date || first_air_date).unix()
					)
				) as C[];
			} else {
				Object.assign(formattedCredits, { [year]: [credit] });
			}
		});

		return sort(keys({ ...formattedCredits }))
			.desc((year) => year)
			.reduce<PersonCredits<C>>((r, k) => ((r[k] = formattedCredits[k]), r), {});
	}
);

type GetDepartmentsProps = { credits: Credits };

export const getDepartments = memoize(
	<Cast extends PersonCredit, Crew extends PersonCredit>({
		credits
	}: GetDepartmentsProps): PersonDepartments<Cast, Crew> => {
		let departments: PersonDepartments<Cast, Crew> = [];

		const { cast = [], crew = [] } = credits;

		if (cast.length > 0) {
			departments.push({
				id: 'actor',
				label: 'Actor',
				credits: { cast: splitCreditsByYear<Cast>({ credits: cast }), crew: {} }
			});
		}

		crew.forEach((mediaItem) => {
			const id = lowerCase(mediaItem.job || '');

			if (departments.some(({ id: departmentID }) => departmentID === id)) {
				departments = departments.map((department) => {
					if (department.id === id) {
						const year = String(
							dayjs(mediaItem.release_date || mediaItem.first_air_date).year() || 'Announced'
						);
						return {
							...department,
							credits: {
								...department.credits,
								crew: {
									...department.credits.crew,
									...splitCreditsByYear<Crew>({
										credits: [...(department.credits.crew[year] || []), mediaItem]
									})
								}
							}
						};
					} else {
						return { ...department };
					}
				});
			} else {
				departments.push({
					id,
					label: mediaItem.job || '',
					credits: { cast: {}, crew: splitCreditsByYear<Crew>({ credits: [mediaItem] }) }
				});
			}
		});

		return sort([...departments]).asc(({ id }) => id);
	}
);

type GetDepartmentTotalProps<Cast extends PersonCredit, Crew extends PersonCredit> = {
	credits: PersonDepartment<Cast, Crew>['credits'];
};

export const getDepartmentTotal = memoize(
	<Cast extends PersonCredit, Crew extends PersonCredit>({
		credits
	}: GetDepartmentTotalProps<Cast, Crew>): number => {
		let total = 0;

		const { cast, crew } = credits;

		for (const key in cast) {
			total = total + cast[key].length;
		}

		for (const key in crew) {
			total = total + crew[key].length;
		}

		return total;
	}
);

type GetDatesProps = Pick<FullPerson, 'birthday' | 'deathday' | 'place_of_birth'>;

export const getDates = memoize(({ birthday, deathday, place_of_birth }: GetDatesProps): string => {
	return compact([
		birthday ? `Born on ${dayjs(birthday || '', 'YYYY-MM-DD').format('LL')}` : null,
		place_of_birth ? `in ${place_of_birth}` : null,
		deathday ? `and died on ${dayjs(deathday || '', 'YYYY-MM-DD').format('LL')}` : null,
		birthday || deathday
			? `(${toString(dayjs(birthday || new Date()).diff(deathday || new Date(), 'years')).replaceAll(
					'-',
					''
			  )} years old)`
			: null
	]).join(' ');
});

type GetKnownForProps = { credits: Credits };

export const getKnownFor = memoize(({ credits }: GetKnownForProps): PersonKnownForCredits => {
	const { cast = [], crew = [] } = credits;

	return uniqBy(
		sort([...cast, ...crew]).by([
			{ desc: ({ vote_count }) => vote_count },
			{ desc: ({ vote_average }) => vote_average },
			{ desc: ({ popularity }) => popularity }
		]),
		'id'
	).filter((_mediaItem, index) => index < 20);
});
