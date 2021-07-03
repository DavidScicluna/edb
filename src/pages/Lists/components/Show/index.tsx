import React, { ReactElement, useEffect } from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import axiosInstance from '../../../../common/scripts/axios';
import { PartialTV } from '../../../../common/types/tv';
import HorizontalTVPoster from '../../../../components/TV/Poster/Horizontal';
import VerticalTVPoster from '../../../../components/TV/Poster/Vertical';

const Show = ({ id }: { id: PartialTV['id'] }): ReactElement => {
  const source = axios.CancelToken.source();

  const location = useLocation();

  const displayMode = useSelector((state) => state.app.ui.displayMode);

  // Fetching tv-show
  const show = useQuery(`show-${id}`, async () => {
    const { data } = await axiosInstance.get<PartialTV>(`/tv/${id}`, {
      cancelToken: source.token
    });
    return data;
  });

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return displayMode === 'list' ? (
    <HorizontalTVPoster isLoading={show.isFetching || show.isLoading} show={show.data} />
  ) : (
    <VerticalTVPoster
      width={location.search.length > 0 ? '100%' : ''}
      isLoading={show.isFetching || show.isLoading}
      show={show.data}
    />
  );
};

export default Show;
