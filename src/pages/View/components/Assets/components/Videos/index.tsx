import React, { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import CountUp from 'react-countup';

import Badge from '../../../../../../components/Badge';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import Panel from '../../../../../../components/Panel';
import Video from '../Video';
import { VideosProps } from './types';

const incrementBy = 10;

const Videos = (props: VideosProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const {
    alt,
    videos = [],
    isLoading = true,
    isError = false,
    isSuccess = false,
    isOnlyAsset = false,
    onClickVideo
  } = props;

  const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

  return (
    <Panel isFullWidth variant={isOnlyAsset ? 'transparent' : 'outlined'}>
      {{
        header: !isOnlyAsset
          ? {
              title: 'Videos',
              actions: (
                <Badge size='lg'>
                  <CountUp duration={1} end={videos?.length || 0} />
                </Badge>
              )
            }
          : undefined,
        body: (
          <VStack width='100%' spacing={4}>
            {!isLoading && isError ? (
              <Error
                label='Oh no! Something went wrong'
                description={`Failed to fetch ${alt ? `"${alt}"` : ''} videos list!`}
                variant='outlined'
              />
            ) : !isLoading && isSuccess && videos && videos.length === 0 ? (
              <Empty label={`${alt ? `"${alt}" videos` : 'Videos'} list is currently empty!`} variant='outlined' />
            ) : !isLoading && isSuccess && videos && videos.length > 0 ? (
              <VerticalGrid displayMode='grid'>
                {() =>
                  videos
                    .filter((_video, index) => index < totalVisible)
                    .map((video, index: number) => (
                      <Video key={index} alt={alt} videoId={video.key} isLoading={false} onClickVideo={onClickVideo} />
                    ))
                }
              </VerticalGrid>
            ) : (
              <VerticalGrid displayMode='grid'>
                {() =>
                  _.range(0, isSuccess && videos && videos.length > 0 ? videos.length : 20).map(
                    (_dummy, index: number) => <Video key={index} alt={alt} isLoading />
                  )
                }
              </VerticalGrid>
            )}

            <ScaleFade
              in={videos.length > 0 && videos.length > incrementBy}
              unmountOnExit
              style={{ width: isSm ? '100%' : 'auto' }}
            >
              <LoadMore
                amount={totalVisible}
                total={videos.length}
                label={alt ? `"${alt}" videos` : 'Videos'}
                onClick={() => setTotalVisible(totalVisible + incrementBy)}
              />
            </ScaleFade>
          </VStack>
        )
      }}
    </Panel>
  );
};

export default Videos;
