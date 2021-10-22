import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import _ from 'lodash';

import { Video as VideoType } from '../../../../../../common/types/types';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import Video from './components/Video';
import { VideosProps } from './types';

const Videos = (props: VideosProps): ReactElement => {
  const { title, videos, isError = false, isSuccess = false, isLoading = false, onClick } = props;

  return (
    <HStack spacing={2}>
      {isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${title ? `"${title}"` : ''} videos!`}
          variant='transparent'
        />
      ) : isSuccess && videos && videos.length === 0 ? (
        <Empty label={`${title ? `"${title}"` : ''} has no videos`} variant='transparent' />
      ) : (
        <>
          {[...(videos && videos.length > 0 ? videos : _.range(0, 8))]
            .filter((_video, index) => index < 8)
            .map((video: VideoType | number, index) => (
              <Video key={index} video={video} isLoading={isLoading} onClick={onClick} />
            ))}
        </>
      )}
    </HStack>
  );
};

export default Videos;
