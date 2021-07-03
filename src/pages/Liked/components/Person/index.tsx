import React, { ReactElement, useEffect } from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import axiosInstance from '../../../../common/scripts/axios';
import { PartialPerson } from '../../../../common/types/person';
import HorizontalPersonPoster from '../../../../components/People/Poster/Horizontal';
import VerticalPersonPoster from '../../../../components/People/Poster/Vertical';

const Person = ({ id }: { id: PartialPerson['id'] }): ReactElement => {
  const source = axios.CancelToken.source();

  const location = useLocation();

  const displayMode = useSelector((state) => state.app.ui.displayMode);

  // Fetching person
  const person = useQuery(`person-${id}`, async () => {
    const { data } = await axiosInstance.get<PartialPerson>(`/person/${id}`, {
      cancelToken: source.token
    });
    return data;
  });

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return displayMode === 'list' ? (
    <HorizontalPersonPoster isLoading={person.isFetching || person.isLoading} person={person.data} />
  ) : (
    <VerticalPersonPoster
      width={location.search.length > 0 ? '100%' : ''}
      isLoading={person.isFetching || person.isLoading}
      person={person.data}
    />
  );
};

export default Person;
