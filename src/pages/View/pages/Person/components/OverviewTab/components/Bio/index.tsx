import { ReactElement } from 'react';

import _ from 'lodash';
import moment from 'moment';


import { BioProps } from './types';

import { FullPerson } from '../../../../../../../../common/types/person';
import Paragraph from '../../../../../../../../components/Paragraph';

export const handleReturnDates = (
  birthday: FullPerson['birthday'],
  deathday: FullPerson['deathday'],
  place_of_birth: FullPerson['place_of_birth']
): string => {
  const birthDate = moment(birthday || '', 'YYYY-MM-DD').format('LL');
  const birthPlace = place_of_birth ? `in ${place_of_birth}` : undefined;
  const deathDate = deathday ? `and died on ${moment(deathday || '', 'YYYY-MM-DD').format('LL')}` : undefined;
  const yearsOld = `(${moment(new Date()).diff(moment(birthday || '', 'YYYY-MM-DD'), 'years')} years old)`;

  return `${['Born', 'on', birthDate, birthPlace, deathDate, yearsOld].filter((string) => string).join(' ')}. `;
};

const Bio = (props: BioProps): ReactElement => {
  const { birthday, place_of_birth, deathday, biography, isLoading = true } = props;

  return (
    <Paragraph
      title='Biography'
      paragraphs={_.compact([
        birthday ? handleReturnDates(birthday, deathday, place_of_birth) : undefined,
        biography
      ]).join('')}
      isLoading={isLoading}
    />
  );
};

export default Bio;
