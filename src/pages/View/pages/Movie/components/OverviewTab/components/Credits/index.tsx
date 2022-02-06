import React, { ReactElement } from 'react';

import { useMediaQuery, Stack } from '@chakra-ui/react';
import _ from 'lodash';

import Label from '../../../../../../components/Hero/components/Label';
import Credit from './components/Credit';
import { CreditsProps, ListItem } from './types';

const Credits = (props: CreditsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { directors, executiveProducers, producers, writers, isLoading = true } = props;

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
