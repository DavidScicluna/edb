import { ReactElement, useState, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';

import HorizontalGrid from '../../../../components/Grid/Horizontal';
import Tabs from '../../../../components/Tabs';
import TabsList from '../../../../components/Tabs/components/TabList';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import Backdrops from './components/Backdrops';
import Footer from './components/Footer';
import Photos from './components/Photos';
import Videos from './components/Videos';
import { MediaProps } from './types';

const Media = (props: MediaProps): ReactElement => {
  const { title, photos, backdrops, videos, isError, isSuccess, isLoading, onClick } = props;

  const [activeTab, setActiveTab] = useState<number>(0);
  const [resetScroll, setResetScroll] = useBoolean();

  const handleTabChange = (index: number): void => {
    setResetScroll.on();

    setActiveTab(index);

    setTimeout(() => setResetScroll.off(), 250);
  };

  const handleFooterOnClick = (): void => {
    switch (activeTab) {
      case 0: {
        if (photos && photos.length > 0) {
          onClick(photos[0].file_path, 'photo');
        }
        break;
      }
      case 1: {
        if (backdrops && backdrops.length > 0) {
          onClick(backdrops[0].file_path, 'backdrop');
        }
        break;
      }
      case 2: {
        if (videos && videos.length > 0) {
          onClick(videos[0].key, 'video');
        }
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if ((photos?.length || 0) > 0) {
        setActiveTab(0);
      } else if ((backdrops?.length || 0) > 0) {
        setActiveTab(1);
      } else if ((videos?.length || 0) > 0) {
        setActiveTab(2);
      }
    }
  }, [isSuccess]);

  return (
    <Tabs activeTab={activeTab} onChange={handleTabChange}>
      <HorizontalGrid
        title={
          <TabsList
            renderTabs={[
              {
                label: 'photos',
                badge: String(photos?.length || 0),
                isDisabled: isLoading.images || (photos?.length || 0) === 0
              },
              {
                label: 'backdrops',
                badge: String(backdrops?.length || 0),
                isDisabled: isLoading.images || (backdrops?.length || 0) === 0
              },
              {
                label: 'videos',
                badge: String(videos?.length || 0),
                isDisabled: isLoading.videos || (videos?.length || 0) === 0
              }
            ]}
            activeTab={activeTab}
            size='sm'
          />
        }
        footer={
          (activeTab === 0 && (photos?.length || 0) > 7) ||
          (activeTab === 1 && (backdrops?.length || 0) > 7) ||
          (activeTab === 2 && (videos?.length || 0) > 7) ? (
            <Footer
              activeIndex={activeTab}
              title={title}
              isDisabled={
                activeTab === 2
                  ? isLoading.videos || isError.videos || false
                  : isLoading.images || isError.images || false
              }
              onClick={handleFooterOnClick}
            />
          ) : undefined
        }
        isLoading={activeTab === 2 ? isLoading.videos || false : isLoading.images || false}
        hasDivider
        resetScroll={resetScroll}
        variant='outlined'>
        <TabPanels activeTab={activeTab}>
          <Photos
            title={title}
            photos={photos}
            isError={isError.images}
            isSuccess={isSuccess.images}
            isLoading={isLoading.images}
            onClick={onClick}
          />
          <Backdrops
            title={title}
            backdrops={backdrops}
            isError={isError.images}
            isSuccess={isSuccess.images}
            isLoading={isLoading.images}
            onClick={onClick}
          />
          <Videos
            title={title}
            videos={videos}
            isError={isError.images}
            isSuccess={isSuccess.images}
            isLoading={isLoading.images}
            onClick={onClick}
          />
        </TabPanels>
      </HorizontalGrid>
    </Tabs>
  );
};

export default Media;
