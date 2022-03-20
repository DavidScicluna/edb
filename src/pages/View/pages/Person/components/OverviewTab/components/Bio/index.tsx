import { ReactElement } from 'react';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import compact from 'lodash/compact';
import toString from 'lodash/toString';

import { BioProps } from './types';

import { FullPerson } from '../../../../../../../../common/types/person';
import Paragraph from '../../../../../../../../components/Paragraph';

dayjs.extend(localizedFormat);

export const handleReturnDates = (
	birthday: FullPerson['birthday'],
	deathday: FullPerson['deathday'],
	place_of_birth: FullPerson['place_of_birth']
): string => {
	const birthDate = dayjs(birthday || '', 'YYYY-MM-DD').format('LL');
	const birthPlace = place_of_birth ? `in ${place_of_birth}` : undefined;
	const deathDate = deathday ? `and died on ${dayjs(deathday || '', 'YYYY-MM-DD').format('LL')}` : undefined;
	const yearsOld = `(${toString(dayjs(birthday || new Date()).diff(deathday || new Date(), 'years')).replaceAll(
		'-',
		''
	)} years old)`;

	return `${['Born', 'on', birthDate, birthPlace, deathDate, yearsOld].filter((string) => string).join(' ')}. `;
};

const Bio = (props: BioProps): ReactElement => {
	const { birthday, place_of_birth, deathday, biography, isLoading = true } = props;

	return (
		<Paragraph
			title='Biography'
			paragraphs={compact([
				birthday ? handleReturnDates(birthday, deathday, place_of_birth) : undefined,
				biography
			]).join('')}
			isLoading={isLoading}
		/>
	);
};

export default Bio;
