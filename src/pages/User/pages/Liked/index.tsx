import { ReactElement, useState, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../common/hooks';
import { MediaType } from '../../../../common/types';
import Tabs from '../../../../components/Tabs';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import Page from '../../../../containers/Page';
import Divider from '../../components/Divider';
import Header from '../../components/Header';
import Movies from '../../components/Movies';
import People from '../../components/People';
import TV from '../../components/TV';
import Inactive from './components/Inactive';

const Liked = (): ReactElement => {
  const movies = useSelector((state) => state.user.data.liked.movies);
  const tv = useSelector((state) => state.user.data.liked.tv);
  const people = useSelector((state) => state.user.data.liked.people);

  const [activeTab, setActiveTab] = useState<number>();

  const handleReturnMediaTypes = (): MediaType[] => {
    const mediaTypes: MediaType[] = [];

    if (movies.length > 0) {
      mediaTypes.push('movie');
    }

    if (tv.length > 0) {
      mediaTypes.push('tv');
    }

    if (people.length > 0) {
      mediaTypes.push('person');
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
      case 'person':
        setActiveTab(2);
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

    if (people && people.length > 0) {
      mediaTypes = mediaTypes + 1;
    }

    if (mediaTypes > 0 && mediaTypes === 1) {
      if (movies && movies.length > 0) {
        handleSetMediaType('movie');
      } else if (tv && tv.length > 0) {
        handleSetMediaType('tv');
      } else if (people && people.length > 0) {
        handleSetMediaType('person');
      }
    }
  };

  useEffect(() => {
    handleCheckHasMediaTypes();

    return () => {
      setActiveTab(undefined);
    };
  }, []);

  return (
    <Page title='Liked'>
      {{
        body: (
          <Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
            <VStack width='100%' divider={<Divider orientation='horizontal' />} spacing={2} p={2}>
              <Header
                activeTab={activeTab}
                isDisabled={{ movie: movies.length === 0, tv: tv.length === 0, person: people.length === 0 }}
              />

              {_.isNil(activeTab) ? (
                <Inactive mediaTypes={handleReturnMediaTypes()} onSetMediaType={handleSetMediaType} />
              ) : (
                <TabPanels>
                  <Movies movies={movies} />
                  <TV shows={tv} />
                  <People people={people} />
                </TabPanels>
              )}
            </VStack>
          </Tabs>
        )
      }}
    </Page>
  );
};

export default Liked;
