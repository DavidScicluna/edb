import { ReactElement, useState, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import { MediaType } from '../../../../../../common/types';
import Divider from '../../../../../../components/Divider';
import Tabs from '../../../../../../components/Tabs';
import TabPanels from '../../../../../../components/Tabs/components/TabPanels';
import MediaTypesHeader from '../../../../components/MediaTypesHeader';
import MediaTypesPicker from '../../../../components/MediaTypesPicker';
import Movies from '../../../../components/Movies';
import TV from '../../../../components/TV';
import { MediaTypesSectionProps } from './types';

const MediaTypesSection = ({ movies, tv, renderActions }: MediaTypesSectionProps): ReactElement => {
  const [activeTab, setActiveTab] = useState<number>();

  const handleReturnMediaTypes = (): MediaType[] => {
    const mediaTypes: MediaType[] = [];

    if (movies.length > 0) {
      mediaTypes.push('movie');
    }

    if (tv.length > 0) {
      mediaTypes.push('tv');
    }

    return mediaTypes;
  };

  const handleSetMediaType = (mediaType: MediaType): void => {
    switch (mediaType) {
      case 'movie':
        setActiveTab(0);
        return;
      case 'tv':
        setActiveTab(1);
        return;
    }
  };

  const handleCheckHasMediaTypes = (): void => {
    let mediaTypes = 0;

    if (movies && movies.length > 0) {
      mediaTypes = mediaTypes + 1;
    }

    if (tv && tv.length > 0) {
      mediaTypes = mediaTypes + 1;
    }

    if (mediaTypes === 1) {
      if (movies && movies.length > 0) {
        handleSetMediaType('movie');
      } else if (tv && tv.length > 0) {
        handleSetMediaType('tv');
      }
    } else {
      setActiveTab(undefined);
    }
  };

  useEffect(() => {
    handleCheckHasMediaTypes();

    return () => {
      setActiveTab(undefined);
    };
  }, []);

  return (
    <Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
      <VStack width='100%' divider={<Divider orientation='horizontal' />} spacing={2}>
        <MediaTypesHeader
          activeTab={activeTab}
          mediaTypes={['movie', 'tv']}
          isDisabled={{ movie: movies.length === 0, tv: tv.length === 0 }}
          renderActions={renderActions}
        />

        {_.isNil(activeTab) ? (
          <MediaTypesPicker
            mediaTypes={handleReturnMediaTypes()}
            label='Oh no! The list is empty.'
            description='Unfortunately, you have not added any items to the list. Please add an item to view it in the list.'
            onSetMediaType={handleSetMediaType}
          />
        ) : (
          <TabPanels>
            <Movies movies={movies} />
            <TV shows={tv} />
          </TabPanels>
        )}
      </VStack>
    </Tabs>
  );
};

export default MediaTypesSection;
