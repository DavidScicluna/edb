import { ReactElement, useState, useEffect } from 'react';

import { Fade } from '@chakra-ui/react';
import _ from 'lodash';
import CountUp from 'react-countup';

import { useSelector } from '../../../../common/hooks';
import { Image as ImageType, Video as VideoType } from '../../../../common/types';
import { handleReturnBoringTypeByMediaType } from '../../../../common/utils';
import Badge from '../../../../components/Badge';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalTabbedGrid from '../../../../components/Grid/Horizontal/Tabbed';
import Footer from './components/Footer';
import Image from './components/Image';
import Video from './components/Video';
import { MediaProps } from './types';

const Media = (props: MediaProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  const {
    alt = '',
    posters = [],
    backdrops = [],
    videos = [],
    mediaType,
    isError,
    isSuccess,
    isLoading,
    onAssetClick,
    onFooterClick
  } = props;

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleIsDisabled = (): boolean => {
    switch (activeTab) {
      case 0:
      case 1:
        return isLoading.images || isError.images || false;
      case 2:
        return isLoading.videos || isError.videos || false;
      default:
        return true;
    }
  };

  useEffect(() => {
    if (posters.length > 0) {
      setActiveTab(0);
    } else if (backdrops.length > 0) {
      setActiveTab(1);
    } else if (videos.length > 0) {
      setActiveTab(2);
    }
  }, [isSuccess]);

  return (
    <HorizontalTabbedGrid
      activeTab={activeTab}
      onChange={(index: number) => setActiveTab(index)}
      footer={
        <Footer
          label={activeTab === 0 ? 'Posters' : activeTab === 1 ? 'Backdrops' : activeTab === 2 ? 'Videos' : undefined}
          total={
            activeTab === 0
              ? posters.length
              : activeTab === 1
              ? backdrops.length
              : activeTab === 2
              ? videos.length
              : undefined
          }
          isDisabled={handleIsDisabled()}
          onClick={onFooterClick}
        />
      }
      isDisabled={handleIsDisabled()}
      renderTabListProps={{
        renderTabs: [
          {
            label: 'Posters',
            isDisabled: isLoading.images || (posters?.length || 0) === 0,
            renderRightIcon:
              (posters?.length || 0) > 0
                ? ({ isSelected, fontSize }) => (
                    <Fade in unmountOnExit>
                      <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={fontSize}>
                        <CountUp duration={1} end={posters?.length || 0} />
                      </Badge>
                    </Fade>
                  )
                : undefined
          },
          {
            label: 'Backdrops',
            isDisabled: isLoading.images || (backdrops?.length || 0) === 0,
            renderRightIcon:
              (backdrops?.length || 0) > 0
                ? ({ isSelected, fontSize }) => (
                    <Fade in unmountOnExit>
                      <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={fontSize}>
                        <CountUp duration={1} end={backdrops?.length || 0} />
                      </Badge>
                    </Fade>
                  )
                : undefined
          },
          {
            label: 'Videos',
            isDisabled: isLoading.videos || (videos?.length || 0) === 0,
            renderRightIcon:
              (videos?.length || 0) > 0
                ? ({ isSelected, fontSize }) => (
                    <Fade in unmountOnExit>
                      <Badge color={isSelected ? color : 'gray'} isLight={!isSelected} size={fontSize}>
                        <CountUp duration={1} end={videos?.length || 0} />
                      </Badge>
                    </Fade>
                  )
                : undefined
          }
        ]
      }}
    >
      {/* Posters */}
      <>
        {!isLoading && isError ? (
          <Error
            label='Oh no! Something went wrong'
            description={`Failed to fetch ${alt ? `"${alt}"` : ''} posters!`}
            variant='transparent'
          />
        ) : !isLoading && isSuccess && posters && posters.length === 0 ? (
          <Empty label={`${alt ? `"${alt}" has no posters` : "Couldn't find any posters"} `} variant='transparent' />
        ) : !isLoading && isSuccess && posters && posters.length > 0 ? (
          posters
            .filter((_poster, index) => index < 10)
            .map((poster: ImageType, index: number) => (
              <Image
                key={index}
                alt={alt}
                path={poster.file_path}
                boringType={handleReturnBoringTypeByMediaType(
                  mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv' : 'person'
                )}
                srcSize={['w92', 'original']}
                isLoading={false}
                onClick={() => onAssetClick(poster.file_path || '', 'image')}
              />
            ))
        ) : (
          _.range(0, 10).map((_dummy, index: number) => (
            <Image
              key={index}
              alt={alt}
              boringType={handleReturnBoringTypeByMediaType(
                mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv' : 'person'
              )}
              srcSize={['w92', 'original']}
              isLoading
            />
          ))
        )}
      </>

      {/* Backdrops */}
      <>
        {!isLoading && isError ? (
          <Error
            label='Oh no! Something went wrong'
            description={`Failed to fetch ${alt ? `"${alt}"` : ''} backdrops!`}
            variant='transparent'
          />
        ) : !isLoading && isSuccess && backdrops && backdrops.length === 0 ? (
          <Empty
            label={`${alt ? `"${alt}" has no backdrops` : "Couldn't find any backdrops"} `}
            variant='transparent'
          />
        ) : !isLoading && isSuccess && backdrops && backdrops.length > 0 ? (
          backdrops
            .filter((_backdrop, index) => index < 10)
            .map((backdrop: ImageType, index: number) => (
              <Image
                key={index}
                alt={alt}
                path={backdrop.file_path}
                boringType={handleReturnBoringTypeByMediaType(
                  mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv' : 'person'
                )}
                srcSize={['w300', 'original']}
                isLoading={false}
                onClick={() => onAssetClick(backdrop.file_path || '', 'image')}
              />
            ))
        ) : (
          _.range(0, 10).map((_dummy, index: number) => (
            <Image
              key={index}
              alt={alt}
              boringType={handleReturnBoringTypeByMediaType(
                mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv' : 'person'
              )}
              srcSize={['w300', 'original']}
              isLoading
            />
          ))
        )}
      </>

      {/* Videos */}
      <>
        {!isLoading && isError ? (
          <Error
            label='Oh no! Something went wrong'
            description={`Failed to fetch ${alt ? `"${alt}"` : ''} videos!`}
            variant='transparent'
          />
        ) : !isLoading && isSuccess && videos && videos.length === 0 ? (
          <Empty label={`${alt ? `"${alt}" has no videos` : "Couldn't find any videos"} `} variant='transparent' />
        ) : !isLoading && isSuccess && videos && videos.length > 0 ? (
          videos
            .filter((_video, index) => index < 10)
            .map((video: VideoType, index: number) => (
              <Video
                key={index}
                alt={alt}
                videoId={video.key}
                isLoading={false}
                onClick={() => onAssetClick(video.key || '', 'video')}
              />
            ))
        ) : (
          _.range(0, 10).map((_dummy, index: number) => <Video key={index} alt={alt} isLoading />)
        )}
      </>
    </HorizontalTabbedGrid>
  );
};

export default Media;
