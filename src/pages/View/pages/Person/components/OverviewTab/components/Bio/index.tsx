import React, { ReactElement } from 'react';

import moment from 'moment';

import Paragraphs from '../../../../../../../../components/Paragraphs';
import { BioProps } from './types';

const Bio = (props: BioProps): ReactElement => {
  const { birthday, place_of_birth, deathday, biography = '', isLoading = true } = props;

  const handleReturnDates = (): string => {
    const birthDate = moment(birthday || '', 'YYYY-MM-DD').format('LL');
    const birthPlace = place_of_birth ? `in ${place_of_birth}` : undefined;
    const deathDate = deathday ? `- ${moment(deathday || '', 'YYYY-MM-DD').format('LL')}` : undefined;
    const yearsOld = deathday
      ? `(${moment(deathday || new Date()).diff(moment(birthday || '', 'YYYY-MM-DD'), 'years')} years old)`
      : undefined;

    return `${['Born', 'on', birthDate, birthPlace, deathDate, yearsOld].filter((string) => string).join(' ')}. `;
  };

  return <Paragraphs paragraphs={`${handleReturnDates()} ${biography}` || ''} isLoading={isLoading} />;
};

export default Bio;
