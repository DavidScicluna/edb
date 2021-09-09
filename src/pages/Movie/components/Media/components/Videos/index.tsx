import React, { ReactElement } from 'react';

import _ from 'lodash';

import { VideoResponse as VideoType } from '../../../../../../common/types/types';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import Video from './components/Video';
import { VideosProps } from './types';

const Videos = (props: VideosProps): ReactElement => {
  const { name, videos, isError = false, isSuccess = false, isLoading = false, onClick } = props;

  return isError ? (
    <Error
      label='Oh no! Something went wrong'
      description={`Failed to fetch ${name ? `"${name}"` : ''} videos!`}
      variant='transparent'
    />
  ) : isSuccess && videos && videos.length === 0 ? (
    <Empty label={`${name ? `"${name}"` : ''} has no videos`} variant='transparent' />
  ) : (
    <>
      {[...(videos && videos.length > 0 ? videos : _.range(8))]
        .filter((_video, index) => index < 8)
        .map((video: VideoType | number, index) => (
          <Video key={index} video={video} isLoading={isLoading} onClick={onClick} />
        ))}
    </>
  );
};

export default Videos;
