import { ReactElement, useState } from 'react';

import { Tabs, TabPanels, TabPanel, Fade } from '@chakra-ui/react';

import HorizontalGrid from '../../../../../../components/Grid/Horizontal';
import Backdrops from './components/Backdrops';
import Footer from './components/Footer';
import Photos from './components/Photos';
import TabList from './components/TabList';
import Videos from './components/Videos';
import { MediaProps } from './types';

const Media = (props: MediaProps): ReactElement => {
  const { name, photos, backdrops, videos, isError, isSuccess, isLoading, onClick } = props;

  const [activeTab, setActiveTab] = useState<number>(0);

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

  return (
    <Tabs width='100%' index={activeTab} onChange={(index) => setActiveTab(index)} isLazy variant='unstyled'>
      <HorizontalGrid
        title={<TabList activeIndex={activeTab} isLoading={isLoading} />}
        footer={
          (activeTab === 0 && (photos?.length || 0) > 7) ||
          (activeTab === 1 && (backdrops?.length || 0) > 7) ||
          (activeTab === 2 && (videos?.length || 0) > 7) ? (
            <Footer
              activeIndex={activeTab}
              name={name}
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
        variant='outlined'>
        <TabPanels>
          <TabPanel as={Fade} in={activeTab === 0} unmountOnExit p={0}>
            <Photos
              name={name}
              photos={photos}
              isError={isError.images}
              isSuccess={isSuccess.images}
              isLoading={isLoading.images}
              onClick={onClick}
            />
          </TabPanel>
          <TabPanel as={Fade} in={activeTab === 1} unmountOnExit p={0}>
            <Backdrops
              name={name}
              backdrops={backdrops}
              isError={isError.images}
              isSuccess={isSuccess.images}
              isLoading={isLoading.images}
              onClick={onClick}
            />
          </TabPanel>
          <TabPanel as={Fade} in={activeTab === 2} unmountOnExit p={0}>
            <Videos
              name={name}
              videos={videos}
              isError={isError.images}
              isSuccess={isSuccess.images}
              isLoading={isLoading.images}
              onClick={onClick}
            />
          </TabPanel>
        </TabPanels>
      </HorizontalGrid>
    </Tabs>
  );
};

export default Media;
