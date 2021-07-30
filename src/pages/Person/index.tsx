import React, { ReactElement } from 'react';

import { useParams } from 'react-router-dom';

import { FullPerson } from '../../common/types/person';

const Person = (): ReactElement => {
  const { id } = useParams<{ id: string }>();

  return <h1>{id}</h1>;
};

export default Person;
