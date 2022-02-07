import React, { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery, Stack } from '@chakra-ui/react';
import _ from 'lodash';

import { Crew } from '../../../../../../../../common/types/movie';
import Label from '../../../../../../components/Hero/components/Label';
import Credit from './components/Credit';
import { CreditsProps, ListItem } from './types';

const Credits = (props: CreditsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { crew = [], isLoading = true } = props;

  const [directors, setDirectors] = useState<Crew[]>([]);
  const [executiveProducers, setExecutiveProducers] = useState<Crew[]>([]);
  const [producers, setProducers] = useState<Crew[]>([]);
  const [writers, setWriters] = useState<Crew[]>([]);

  const renderCredits: ListItem[] = _.compact([
    (!_.isNil(directors) && !_.isEmpty(directors)) || isLoading
      ? {
          label: `Director${(directors || []).length > 1 ? 's' : ''}`,
          children: <Credit key='movie-directors' people={directors} isLoading={isLoading} />
        }
      : undefined,
    (!_.isNil(executiveProducers) && !_.isEmpty(executiveProducers)) || isLoading
      ? {
          label: `Executive Producer${(executiveProducers || []).length > 1 ? 's' : ''}`,
          children: <Credit key='movie-executive-producers' people={executiveProducers} isLoading={isLoading} />
        }
      : undefined,
    (!_.isNil(producers) && !_.isEmpty(producers)) || isLoading
      ? {
          label: `Producer${(producers || []).length > 1 ? 's' : ''}`,
          children: <Credit key='movie-producers' people={producers} isLoading={isLoading} />
        }
      : undefined,
    (!_.isNil(writers) && !_.isEmpty(writers)) || isLoading
      ? {
          label: `Writer${(writers || []).length > 1 ? 's' : ''}`,
          children: <Credit key='movie-producers' people={writers} isLoading={isLoading} />
        }
      : undefined
  ]);

  useEffect(() => {
    if (!_.isNil(writers) && !_.isEmpty(writers) && !isLoading) {
      crew.filter((person) => {
        switch (person.job) {
          case 'Director': {
            setDirectors([...directors, person]);
            break;
          }
          case 'Executive Producer': {
            setExecutiveProducers([...executiveProducers, person]);
            break;
          }
          case 'Producer': {
            setProducers([...producers, person]);
            break;
          }
          case 'Writer': {
            setWriters([...writers, person]);
            break;
          }
          default:
            break;
        }
      });
    }
  }, [crew]);

  return (
    <Stack
      width='100%'
      maxWidth='100%'
      alignItems='stretch'
      justifyContent='stretch'
      direction={isSm ? 'column' : 'row'}
      spacing={isSm ? 2 : 4}
    >
      {renderCredits.map((credit, index: number) =>
        credit.children ? (
          <Label
            key={index}
            width={isSm ? '100%' : 'auto'}
            maxWidth={isSm ? '100%' : `${100 / renderCredits.length}%`}
            flex={1}
            label={credit.label}
          >
            {credit.children}
          </Label>
        ) : null
      )}
    </Stack>
  );
};

export default Credits;
